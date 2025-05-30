import React from "react";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import { IoSettingsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import purpleLogo from "../../assets/purpleLogo.png";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">
            <img
              src={purpleLogo}
              alt="purple logo"
              style={{ height: "30px", marginRight: "10px" }}
            />
            <span className="logo-ques">Ques</span>
            <span className="logo-ai">.AI</span>
          </div>
        </div>
        <div className="header-right">
          <button className="icon-button">
            <IoSettingsOutline size={20} />
          </button>
          <button className="icon-button">
            <IoNotificationsOutline size={20} />
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
