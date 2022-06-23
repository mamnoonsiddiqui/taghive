import { useEffect, useState } from "react";
import './loginsign.style.css';
import { db, auth, app, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./../../config/firebase";

function LoginSignUp() {
  const [showRegister, setShowRegister] = useState(false)
  const [formError, setFormError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  // For create a user in fire auth also in this function we are checking that user wants to login or SignUp
  const registerOrLogin = () => {
    setFormError("")
    if (showRegister) { // For Sing UP
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(userCredential.user)
          localStorage.userDetails = JSON.stringify(userCredential.user) // Store Data In LocalStorage
          window.location.href = "/dashboard"
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setFormError(error.message)
          console.log(error)
        });
    } else { // For Login
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(userCredential.user)
          localStorage.userDetails = JSON.stringify(userCredential.user) // Store Data In LocalStorage
          window.location.href = "/dashboard"
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setFormError(error.message)
          console.log(error)
        });
    }
  }

  const loginRegisterButton = (name) => {
    return (
      <>
        <span onClick={() => setShowRegister(!showRegister)} className="secondary-btn">{name} ?</span>
      </>
    )
  }
  return (
    <>
      <div className='login-main-div'>
        <div className='login-div'>
          <span className='login-header'>{showRegister ? "Register" : "Login"}</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='login-input-field' placeholder='Enter Email' />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='login-input-field' placeholder='Enter Password' />
          <span className="form-error">{formError}</span>
          <div className='register-or-login-div'>
            {loginRegisterButton(showRegister ? "Login" : "Register")}
            <button onClick={(e) => registerOrLogin()} className='primary-btn'>{showRegister ? "Register" : "Login"}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginSignUp;
