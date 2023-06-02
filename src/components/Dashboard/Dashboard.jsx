import React from "react";

import "./Dashboard.css";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <div className="dashboard">
      <Sidebar />
    <h1>StepUp Dashboard</h1>
    </div>
  );
};

export default Dashboard;
