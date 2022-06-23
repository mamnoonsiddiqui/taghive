import { useEffect, useState } from "react";
import './quiz.style.css';
import { db, auth, app, createUserWithEmailAndPassword, signInWithEmailAndPassword, query, getDocs, collection, where, addDoc,updateDoc, doc } from "./../../config/firebase";
import { async } from "@firebase/util";

function Quiz() {
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.userDetails))
  const [classesList, setClassesList] = useState([])
  const [subjectList, setSubjectList] = useState([])
  const [mcqList, setMcqList] = useState([])
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0)
  const [currentResultId, setCurrentResultId] = useState("")
  const [resultJson, setResultJson] = useState({
    total_questions: 0,
    total_attempt: 0,
    correct: 0,
    incorrect: 0,
    user_id: ""
  })
  const [step, setStep] = useState(1) // 1 = Class selection, 2 = Subject Selection, 3 = Quiz and 4 = result

  useEffect(() => {
    getDataOnLoad()
  }, [])

  // Get Data Of Classes 
  const getDataOnLoad = async () => {
    let q = query(collection(db, "classes"));
    let docs = await getDocs(q);
    setClassesList(docs.docs)
  }

  // Generate View For Classes
  const getClassSelection = () => {
    return (
      <>
        <div className="topic-header">Please Select Your Class</div>
        {classesList.map((item, id) => {
          return (
            <>
              <div onClick={(e) => { getSubjectList(item.id) }} className="selection-div">{item.data().class_name}</div>
            </>
          )
        })}
      </>
    )
  }

  // Get Data Of Subjects by Class ID
  const getSubjectList = async (classId) => {
    let q = query(collection(db, "subjects"), where("class_id", "==", classId));
    let docs = await getDocs(q);
    setSubjectList(docs.docs)
    setStep(2)
  }

  // Generate View For Subjects
  const getSubjectSelection = () => {
    return (
      <>
        <div className="topic-header">Please Select Your Subject</div>
        {subjectList.map((item, id) => {
          return (
            <>
              <div onClick={(e) => { getMcq(item.id) }} className="selection-div">{item.data().name}</div>
            </>
          )
        })}
      </>
    )
  }

  // Get Data Of MCQ by Subject ID
  const getMcq = async (subjectId) => {
    let q = query(collection(db, "mcq"), where("subject_id", "==", subjectId));
    let docs = await getDocs(q);
    setMcqList(docs.docs)
    setStep(3)
  }
  // Submit summary of quiz per USER
  const submitAnsAndPushUserData = async(selectedOption) => {
    console.log(mcqList.length)
    let jsonForPush = {
      total_questions: mcqList.length,
      total_attempt: currentQuestionNo+1,
      correct: selectedOption == mcqList[currentQuestionNo].data().correct_option ? resultJson.correct + 1 : resultJson.correct,
      incorrect: selectedOption != mcqList[currentQuestionNo].data().correct_option ? resultJson.incorrect + 1 : resultJson.incorrect,
      user_id: userDetails.uid
    }
    if (currentQuestionNo == 0) {  // For Insert First Time
      let result = await addDoc(collection(db, "user_result"), jsonForPush);
      setCurrentResultId(result.id)
    }else{  // For Update after First Time
      await updateDoc(doc(db, "user_result",currentResultId), jsonForPush);
    }
    setResultJson(jsonForPush)
    if(currentQuestionNo+1 < mcqList.length){
      setCurrentQuestionNo(currentQuestionNo+1)
    }else{
      setStep(4) // For Show Results
    }
  }

  // For Generate MCQ View
  const getMcqSelection = () => {
    return (
      <>
      <div>Question {currentQuestionNo+1} out of {mcqList.length}</div>
        <div className="topic-header">Please Give Ans of Your MCQ</div>
        <div>{mcqList[currentQuestionNo].data().question}</div>
        <div onClick={(e) => { submitAnsAndPushUserData("a") }} className="selection-div">{mcqList[currentQuestionNo].data().a}</div>
        <div onClick={(e) => { submitAnsAndPushUserData("b") }} className="selection-div">{mcqList[currentQuestionNo].data().b}</div>
        <div onClick={(e) => { submitAnsAndPushUserData("c") }} className="selection-div">{mcqList[currentQuestionNo].data().c}</div>
        <div onClick={(e) => { submitAnsAndPushUserData("d") }} className="selection-div">{mcqList[currentQuestionNo].data().d}</div>
      </>
    )
  }

  // For Generate Result View
  const getResult = () => {
    return (
      <>
        <div className="topic-header">Result</div>
        <div className="selection-div">Total Question: {resultJson.total_questions}</div>
        <div className="selection-div">Total Attempt: {resultJson.total_attempt}</div>
        <div className="selection-div">Total Correct: {resultJson.correct}</div>
        <div className="selection-div">Total Incorrect: {resultJson.incorrect}</div>
      </>
    )
  }
  return (
    <>
      <div className="quiz-main-div">
        <div className="quiz-selection-div">
          {step == 1 ? getClassSelection() : step == 2 ? getSubjectSelection() : step == 3 ? getMcqSelection() : getResult()}
        </div>

      </div>
    </>
  );
}

export default Quiz;
