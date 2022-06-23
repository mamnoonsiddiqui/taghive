import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Header from './component/header/header';
import LoginSignUp from './component/loginsing/loginsign';
import Dashboard from './component/dashboard/dashboard';
import Quiz from './component/quiz/quiz';
import Result from './component/result/result';


function App() {
  const [isAuthenticated, setUserAuthenticated] = useState(localStorage.userDetails ? true : false);

  // for Auth Path
  const privateRoute = (path, element) => {
    if (isAuthenticated) {
      return (<Route path={path} element={element} />)
    }else{
      return (<Route path={path} element={<Navigate replace to="/" />} />)
    }
  }

  // for Public Path
  const publicRoute = (path, element) => {
    if (!isAuthenticated) {
      return (<Route path={path} element={element} />)
    }else{
      return (<Route path={path} element={<Navigate replace to="/dashboard" />} />)
    }
  }
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          {publicRoute('/', <LoginSignUp />)}
          {privateRoute('/dashboard', <Dashboard />)}
          {privateRoute('/quiz', <Quiz />)}
          {privateRoute('/result', <Result />)}
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
