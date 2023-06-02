import React, { useState } from "react";
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";



function Navbar() {

  const role = secureLocalStorage.getItem("role");
  const isAdmin = role === "admin";

  return (
    <div className='navbar'>
      {" "}
      {isAdmin && (
        <Link to='/dashboard' style={{ textDecoration: "none" }}>
          <div className='navbar-divstyle'>Dashboard</div>
        </Link>
      )}
      <Link to='/' style={{ textDecoration: "none" }}>
        <div className='navbar-divstyle'>Home </div>
      </Link>{" "}
      <div className='nav-dropdown'>
        <div className='navbar-divstyle'>Shop </div>

        <div className='dropdown-menu'>
          <div className='dropdown-button navbar-divstyle'>
            <Link
              to='/single-category/643fe9acc1397ac9890562cd'
              onClick={() =>
                (window.location.href =
                  "/single-category/643fe9acc1397ac9890562cd")
              }
            >
              {" "}
              Hightop sneakers{" "}
            </Link>

            <Link
              to='/single-category/6437ba63a671878f61ce7e40
'
              onClick={() =>
                (window.location.href =
                  "/single-category/6437ba63a671878f61ce7e40")
              }
            >
              Lowtop sneakers{" "}
            </Link>
            <Link
              to='/single-category/6437ba7ba671878f61ce7e42'
              onClick={() =>
                (window.location.href =
                  "/single-category/6437ba7ba671878f61ce7e42")
              }
            >
              Athletic shoes
            </Link>
            <Link
              to='/single-category/643feab292947e7429c6dfc2'
              onClick={() =>
                (window.location.href =
                  "/single-category/643feab292947e7429c6dfc2")
              }
            >
              Retro Shoes{" "}
            </Link>
            {/* <Link to="/single-category/643feb6092947e7429c6dfc4retroretro"
            onClick={() => window.location.href='/single-category/643feb6092947e7429c6dfc4retroretro'}
            >Slides</Link> */}

            <a
              href='#'
              onClick={() =>
                (window.location.href =
                  "/single-category/643feb6092947e7429c6dfc4")
              }
            >
              Slides
            </a>

            <a
              href='#'
              onClick={() =>
                (window.location.href =
                  "/single-category/643feb6d92947e7429c6dfc6")
              }
            >
              Socks
            </a>
          </div>
        </div>
      </div>
      <Link to='about' style={{ textDecoration: "none" }}>
        <div className='navbar-divstyle'>About Us </div>
      </Link>
      <Link to='contact' style={{ textDecoration: "none" }}>
        <div className='navbar-divstyle'>Contact Us </div>
      </Link>
      <div className='nav-dropdown'>
        <div className='dropdown-button navbar-divstyle'> Other Links</div>

        <div className='dropdown-menu'>
          <a href='/terms'>Terms and Conditions</a>
          <a href='/refund'>Refund and Return</a>
          <a href='/privacy'>Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
