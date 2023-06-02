import React, { useEffect, useRef, useState } from "react";
import "../Login/Login.css";
import { FaRegUserCircle, FaLock } from "react-icons/fa";
import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";

const SignIn = ({ onSignupClick }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState("");

  const errRef = useRef();
 
  useEffect(() => {
  // fetchLogin();
  }, []);

  const fetchLogin = async () => {
    axios
      .post("https://e-commerce-back-end-production.up.railway.app/api/users/login", { email, password })
      .then((res) => {
        secureLocalStorage.setItem("token", res.data.token);
        secureLocalStorage.setItem("role", res.data.role);
        secureLocalStorage.setItem("loggedIn", true);
        setErrMsg("you are loggedin ");

        setTimeout(() => setErrMsg(""), 3000);
        window.location.reload();
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
          setTimeout(() => setErrMsg(""), 3000);
        } else if (err.response?.status === 404) {
          setErrMsg("Email not found");
          setTimeout(() => setErrMsg(""), 3000);
        } else if (err.response?.status === 400) {
          setErrMsg("incorrect password");
          setTimeout(() => setErrMsg(""), 3000);
        }
        // errRef.current.focus();
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchLogin({ email, password });
  };

  return (
    <div>
      <form className="form-subcontainer" onSubmit={handleSubmit}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className="userEmail-title">
          <FaRegUserCircle className="icone-login" />
          <input
            type="text"
            autoComplete="off"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="userPassword-title">
          <FaLock className="icone-login" />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="login-button-container">
          <div onClick={() => onSignupClick()}>Don't hava an account?</div>

          <button className="login-btn">Login</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
