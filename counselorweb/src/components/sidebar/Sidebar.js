import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const [counselorData, setCounselorData] = useState("");
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.getItem("citem") && loadCounselors();
  }, []);

  async function loadCounselors() {
    console.log("----------1----------");
    const cData = localStorage.getItem("citem");
    const afterParse = JSON.parse(cData);
    const counselorId = afterParse.counselorId;

    try {
      console.log("------------2----------");
      const response = await fetch(
        "http://localhost:3001/getCounselorData/" + counselorId
      );
      const data = await response.json();
      console.log(data);
      console.log("------------3----------");
      setCounselorData(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }
  return isloading ? (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <p style={{ color: "#fff" }}>Loading....Please wait!!!</p>
      </div>
    </div>
  ) : (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img
            style={{
              borderRadius: 50,
              height: 50,
              width: 50,
              marginRight: 20,
            }}
            src={`data:image/jpeg;base64,${counselorData.counselorImage}`}
            alt="logo"
          />
          <h1 style={{ color: "#fff" }}>{counselorData.name}</h1>
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <a href="/dashboard">Dashboard</a>
        </div>
        <h2>MNG</h2>
        <div className="sidebar__link">
          <i className="fa fa-calendar"></i>
          <a href="/appointment">Appointments</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-user-o"></i>
          <a href="/clients">My Clients</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-credit-card"></i>
          <a href="/payments">Payments</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-star"></i>
          <a href="/feedback">Reviews and Feedbacks</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-comment"></i>
          <a href="/chat">Messages</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-wrench"></i>
          <a href="/profile">Profile Settings</a>
        </div>
        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <a onClick={() => localStorage.removeItem("item")} href="/">
            Log out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
