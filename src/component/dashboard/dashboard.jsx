import { db, auth, app, createUserWithEmailAndPassword, signInWithEmailAndPassword, query, getDocs, collection, where, addDoc, updateDoc, doc } from "./../../config/firebase";
import { useEffect, useState } from "react";
import './dashboard.style.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



function Dashboard() {
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.userDetails))
  const [finalData, setFinalData] = useState()
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'User Report',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  useEffect(() => {
    getDataOnLoad()
  }, [])

  // Get Results Of User
  const getDataOnLoad = async () => {
    let q = query(collection(db, "user_result"), where("user_id", "==", userDetails.uid));
    let docs = await getDocs(q);
    let tempLables = []
    let tempdataA = []
    let tempdataB = []
    let tempdataC = []
    let tempdataD = []
    docs.docs.map((item, id) => {
      tempLables.push((id+1).toString())
      tempdataA.push(item.data().total_questions)
      tempdataB.push(item.data().total_attempt)
      tempdataC.push(item.data().correct)
      tempdataD.push(item.data().incorrect)
    })
    setFinalData({
      labels: tempLables,
      datasets: [
        {
          label: 'total Q',
          data: tempdataA,
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Total A',
          data: tempdataB,
          backgroundColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'COrrect',
          data: tempdataC,
          backgroundColor: 'rgb(53, 162, 235)',
        },
        {
          label: 'InCorrect',
          data: tempdataD,
          backgroundColor: 'rgb(53, 162, 135)',
        },
      ],
    })
  }
  return (
    <>
    {finalData &&
      <Bar className="first-chart" options={options} data={finalData} />
    }
    </>
  );
}

export default Dashboard;
