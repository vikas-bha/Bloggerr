import React from 'react'
import "../styles/LoginFirst.css"
import { useNavigate } from "react-router-dom";

const LoginFirst = () => {
 
    const navigate = useNavigate();
  return (
    <div className='loginFirst-container'>
        <div className="loginFirst-inside-container">
        You should&nbsp;<span onClick={()=> navigate("/")} className='loginFirst-span'>Login/SignUp</span>&nbsp;first
        </div>

    </div>
  )
}

export default LoginFirst