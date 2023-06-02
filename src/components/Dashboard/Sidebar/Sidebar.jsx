import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { FaTh} from "react-icons/fa";
import { Link } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const InfomenuItem = [
    {
      path: "/dashcategories",
      name: "Categories",
      icon: <FaTh />,
    },

    {
      path: "/dashorders",
      name: "Orders",
      icon: <FaTh />,
    },
    {
      path: "/dashpages",
      name: "Pages",
      icon: <FaTh />,
    },
    {
      path: "/dashproducts",
      name: "Products",
      icon: <FaTh />,
    },
    {
      path: "/dashusers",
      name: "Users",
      icon: <FaTh />,
    },
  ];

  return (
    <div className="containerdash">
      <div className="sidebar">
        <div className="top_section">
         
        <Link to="/dashboard">
          <h1 className="logo">Admin</h1>
        </Link>

          <div className="bars"></div>
        </div>

        {InfomenuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link dropdown_item"
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}

        <br></br>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Sidebar;
