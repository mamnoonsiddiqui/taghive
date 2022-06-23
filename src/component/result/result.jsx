import { db, auth, app, createUserWithEmailAndPassword, signInWithEmailAndPassword, query, getDocs, collection, where, addDoc,updateDoc, doc } from "./../../config/firebase";
import { useEffect, useState } from "react";
import './result.style.css';

function Result() {
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.userDetails))
  const [resultList, setResultList] = useState([])
  useEffect(() => {
    getDataOnLoad()
  }, [])

  // Get Results Of User
  const getDataOnLoad = async () => {
    let q = query(collection(db, "user_result"), where("user_id", "==", userDetails.uid));
    let docs = await getDocs(q);
    setResultList(docs.docs)
  }

  return (
    <>
    {/* Table CSS Copy From W3 */}
      <table className="result-table">
        <tr>
          <th>Total Question</th>
          <th>Total Attempt</th>
          <th>Correct</th>
          <th>InCorrect</th>
        </tr>
        {resultList.map((item) => {
          return (
            <tr>
              <td>{item.data().total_questions}</td>
              <td>{item.data().total_attempt}</td>
              <td>{item.data().correct}</td>
              <td>{item.data().incorrect}</td>
            </tr>
          )
        })}

      </table>
    </>
  );
}

export default Result;
