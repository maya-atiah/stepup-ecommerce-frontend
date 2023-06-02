import React, { useEffect, useState } from "react";
import "../Navhead/NavIcons.css";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import {  Link } from "react-router-dom";

function NavIcons(props) {
  const [cartItemsCount, setCartItemsCount] = useState(0);


  const handleLogout = () => {
    window.localStorage.clear();
window.location.reload();
    props.setIsLoggedIn();
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem("cart");
    const cartItems = localStorageData ? JSON.parse(localStorageData) : [];
    setCartItemsCount(cartItems.length);
  }, [localStorage.getItem("cart")]);


  return (
    <div className="icon-header-div">
      <div className="icon-header">

        {props.isLoggedin == false ? (
          <Link to="/login" style={{ textDecoration: "none" }}>
            
          <FaRegUser id="icon-header" />
        </Link>
        ) : null}
        {props.isLoggedin == true && (
          <BiLogOut id="icon-header" onClick={handleLogout} />
        )}
      </div>



      <div className="flex-icon-header">
        <Link to="/order" style={{ textDecoration: "none" }}>
          <FiShoppingBag id="icon-header" className="bag-icon" />
        </Link>
        <span className="span-cart">{cartItemsCount}</span>
      </div>
    </div>
  );
}

export default NavIcons;
