'use client';
import React, { useState, useEffect } from 'react';
import styles from './SignUp.module.css';
import axios from 'axios';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash, FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../Context';
import { useRouter } from 'next/navigation';

const SignUp = ({ setShowLogin }) => {
  const [loginStage, setLogInStage] = useState("Login");
  const [errorMessage, setErrorMessage] = useState(null);
  const { url, setToken } = useGlobalContext();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    pwdRepeat: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const [endpoint, setEndpoint] = useState(null);

  const clearInputField = () => {
    setData({
      name: "",
      username: "",
      email: "",
      password: "",
      pwdRepeat: ""
    });
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const endpointController = () =>{
    if (loginStage === "Login") {
      setEndpoint("api/users/login");
     } else {
       setEndpoint("api/users/signup");
     }
  }

  const addUser = async () => {
    try {
      setLoading(true);

      const response = await axios.post(endpoint, data);
      console.log("NEWURL:", endpoint)

      if (response && response.data.success) {
        // Reset form data
        setData({
          name: "",
          username: "",
          email: "",
          password: "",
          pwdRepeat: ""
        });

        // Set user to localstorage
        localStorage.setItem("user", response.data.user.username);
        // Save token to localstorage
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token)
        // Redirect to the homepage
        router.push("/");
        setShowLogin(false);
        window.location.reload()
      }
      else {
        setErrorMessage(response.data.message)
      }
    } catch (error) {
      console.log("Error:", error); // Log detailed error for debugging
    } finally {
      setLoading(false);
    }
  };


  const handleFormSubmission = (e) => {
    e.preventDefault();
    endpointController()
    addUser();
  }


  return (
    <div className={styles.signUp}>
      <FaTimes className={styles.timeIcon} onClick={() => setShowLogin(false)} />
      <div className={styles.container}>
        <h1>{loginStage === "Signup" ? "Signup" : "Login"}</h1>
        <h4>{loginStage === "Signup" ? "" : "WELCOME BACK"}</h4>
        <form onSubmit={handleFormSubmission}>
          {
            loginStage === "Login"? null
              :
              <div>
                <input required onChange={handleOnchange} value={data.username} type="text" placeholder="Username" name="username" />
              </div>
          }
          <div>
            <input required onChange={handleOnchange} value={data.email} type="email" placeholder="Your Email" name="email" />
          </div>
          <div>
            <input required onChange={handleOnchange} value={data.password} type={showPass ? "text" : "password"} placeholder="Password" name="password" />
            <small onClick={() => setShowPass(!showPass)} className={styles.eyeIcon}>
              {showPass ? <IoEyeSharp /> : <FaEyeSlash />}
            </small>
          </div>
          {loginStage === "Login" ? null : (
            <div>
              <input required onChange={handleOnchange} value={data.pwdRepeat} type={showPass ? "text" : "password"} placeholder="Repeat Password" name="pwdRepeat" />
              <small onClick={() => setShowPass(!showPass)} className={styles.eyeIcon}>
                {showPass ? <IoEyeSharp /> : <FaEyeSlash />}
              </small>
            </div>
          )}
          {errorMessage ? <p>{errorMessage}</p> : null}
          <button type="submit">
            {loading ? "Processing..." : (loginStage === "Login" ? "Login" : "Signup")}
          </button>
        </form>
        <div className={styles.loginStatus}>
          {loginStage === "Signup" ? (
            <p onClick={clearInputField} className={styles.createAlready}>Already have an account? <span onClick={() => setLogInStage("Login")}>Login</span></p>
          ) : (
            <p onClick={clearInputField} className={styles.createAlready}>Create a new account? <span onClick={() => setLogInStage("Signup")}>Click here</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
