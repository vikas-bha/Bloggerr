import { useEffect, useState } from "react"
import React from 'react'
import "../styles/SignupLogin.css"
import { useUser } from "../UserContext"
import { useNavigate } from "react-router-dom";


const SignupLogin = () => {
    const [signupData, setSignupData] = useState({ fullName: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isSignup, setIsSignup] = useState(true);
  const { user, setUser } = useUser();
  const navigate  = useNavigate();

  useEffect(()=>{
    console.log(user)

  },[])
  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    console.log(signupData)

  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Signup data:', signupData);
    toggleForm();
    // Add logic to send signup data to backend
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', loginData);
    login(loginData);
    navigate("/bulk");
    // Add logic to send login data to backend
  };

  const login = async (loginData) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      const data = await response.json();
      // Handle the response data, e.g., set user state or save token to local storage
      console.log(data);
      setUser(data.user);
      console.log(user);
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Handle error, e.g., show error message to user
    }
  };
  

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };


  return (
    <div className="App">
      <div className="container">
        <h1>Bloggerr</h1>
        <div className="form-container">
          {isSignup ? (
            <form className="form" onSubmit={handleSignupSubmit}>
              <h2>Sign Up</h2>
              <input type="text" name="fullName" placeholder="Fullname" value={signupData.fullName} onChange={handleSignupChange} />
              <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} />
              <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} />
              <input type="file" name="profileImage" />
              <button className="submitButton" type="submit">Sign Up</button>
            </form>
          ) : (
            <form className="form" onSubmit={handleLoginSubmit}>
              <h2>Login</h2>
              <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} />
              <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} />
              <button className="submitButton" type="submit">Login</button>
            </form>
          )}
        </div>
        <button className="toggleButton" onClick={toggleForm}>
  {isSignup ? (
    <>
      Already have an account? <u>Login</u>
    </>
  ) : (
    <>
      Don't have an account? <u>Sign Up</u>
    </>
  )}
</button>
      </div>
    </div>

  )

}

export default SignupLogin