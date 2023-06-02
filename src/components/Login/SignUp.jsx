import React, { useRef, useState } from "react";

import "../Login/SignUp.css";
import {
  FaRegUserCircle,
  FaLock,
  FaRegEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import axios from "axios";
import SignIn from "./SignIn";

const SignUp = ({ onBackToLoginClick, setIsLogin }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitted, setISSubmitted] = useState(false);

  const errRef = useRef();
  const emailRef = useRef();

  const fetchRegister = async () => {
    try {
      await axios.post("https://e-commerce-back-end-production.up.railway.app/api/users/register", {
        fullName,
        email,
        password,
        location,
        phoneNumber,
      });
      setErrMsg("Successfully registered! You can login now");
      setISSubmitted(true);
      setFullName("");
      setEmail("");
      setPassword("");
      setLocation("");
      setPhone("");
      setTimeout(() => setErrMsg(""), 3000);

      //  navigate("/login");
    } catch (error) {
      setErrMsg(error.response.data.message);
      setTimeout(() => setErrMsg(""), 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    fetchRegister();
  
  };

  return (
    <div>
      {isSubmitted ? (
        <>
          <div className='Submmitted-Successfully'> Submitted Successfully</div>
          <SignIn />
        </>
      ) : (
        <form className='form-subcontainer-signup' onSubmit={handleSubmit}>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live='assertive'
          >
            {errMsg}
          </p>
          <div className='Email-signup'>
            <FaRegUserCircle className='icone-login' />
            <input
              type='text'
              autoComplete='off'
              placeholder='Full Name'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            ></input>
          </div>
          <div className='Email-signup'>
            <FaRegEnvelope className='icone-login' />
            <input
              type='text'
              autoComplete='off'
              placeholder='Email'
              value={email}
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className='Password-signup'>
            <FaLock className='icone-login' />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className='Email-signup'>
            <FaMapMarkerAlt className='icone-login' />
            <input
              type='text'
              autoComplete='off'
              placeholder='Location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </div>
          <div className='Email-signup'>
            <FaPhone className='icone-login' />
            <input
              type='text'
              autoComplete='off'
              placeholder='Phone Number'
              value={phoneNumber}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>

          <div className='signup-button-container'>
            <div onClick={() => onBackToLoginClick()}>Login here!</div>

            <button className='signup-btn'>Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUp;
