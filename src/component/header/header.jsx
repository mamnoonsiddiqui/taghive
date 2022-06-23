import { useEffect, useState } from "react";
import { db, auth, app, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "./../../config/firebase";

import './header.style.css';

function Header() {
  const [userDetails, setUserDetails] = useState("")
  useEffect(() => {
    if (localStorage.userDetails) {setUserDetails(JSON.parse(localStorage.userDetails))}
  }, [])

  const logout = () => {
    signOut(auth);
    localStorage.clear()
    window.location.href = "/"
  }
  return (
    <>
      <div className='header'>
        <img src='https://tag-hive.com/wp-content/uploads/2022/05/taghive.svg' alt="taghive" className='header-logo' />
        {userDetails &&
          <div className="profile-button">
            <div onClick={(e) => {window.location.href = "/dashboard"}} className='header-other-button'>Dashboard</div>
            <div onClick={(e) => {window.location.href = "/quiz"}} className='header-other-button'>Play Quiz</div>
            <div onClick={(e) => {window.location.href = "/result"}} className='header-other-button'>Results</div>
            <div onClick={logout} className='header-logout'>Logout</div>
          </div>
        }
      </div>
    </>
  );
}

export default Header;
