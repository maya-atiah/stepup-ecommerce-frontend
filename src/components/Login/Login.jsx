import React, { useState } from "react";
import "../Login/Login.css";
import CoverImage from "../../assets/images/image00069.jpeg";
import LogoImage from "../../assets/images/logo2-b.png";
import SignUp from "./SignUp";
import SocailMediaIcons from "./SocailMediaIcons";

import SignIn from "./SignIn";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSignupClick = () => {
    setIsLogin(false);
  };

  const handleBackToLoginClick = () => {
    setIsLogin(true);
  };

  return (
    <div className='login-container'>
      <div className='login-subContainer'>
        <div>
          <img src={CoverImage} className='coverImage-login' alt='coverimage' />
        </div>
        <div className='form-container'>
          <img src={LogoImage} alt='logo' className='logoImage-login' />
          {isLogin ? (
            <SignIn onSignupClick={handleSignupClick} />
          ) : (
            <SignUp
              onBackToLoginClick={handleBackToLoginClick}
              setIsLogin={setIsLogin}
            />
          )}
          {isLogin ? <SocailMediaIcons /> : ""}
        </div>
      </div>
    </div>
  );
};


export default Login;


