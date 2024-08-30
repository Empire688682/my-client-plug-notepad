'use client';
import React, { useState, useEffect } from 'react';
import styles from './SignUp.module.css'; // Use CSS Module for styling
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Use Next.js router
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import { useGlobalContext } from '../Context';

const SignUp = () => {
  const [loginStage, setLogInStage] = useState("Login");
  const [errorMessage, setErrorMessage] = useState(null);
  const { url, token } = useGlobalContext(); // Adjust to match your context
  const router = useRouter(); // Use Next.js router
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    pwdRepeat: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

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

  const handleFormSubmision = (e) => {
    e.preventDefault();
    signUpLogIn();
  };

  const signUpLogIn = async () => {
    let newUrl = url;
    if (loginStage === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      setLoading(true);
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        clearInputField();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.User);
        router.push('/'); // Navigate using Next.js router
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      router.replace("/"); // Use Next.js router for redirection
    }
  }, [token, router]);

  return (
    <div className={styles.signUp}>
      <div className={styles.container}>
        <h1>{loginStage === "Signup" ? "Signup" : "Login"}</h1>
        <h4>{loginStage === "Signup" ? "" : "WELCOME BACK"}</h4>
        <form onSubmit={handleFormSubmision}>
          <div>
            <input required onChange={handleOnchange} value={data.username} type="text" placeholder="Username" name="username" />
          </div>
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
