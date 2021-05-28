import React from "react";
import "./Navbar.css";
import avatar from "../../assets/avatar.svg";

const Navbar = ({ openSidebar }) => {

  const path = window.location.pathname;
  const splitLocation = path.split("/");

  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <a
          className={splitLocation[1] === "appointment" ? "active_link" : ""}
          href="/appointment"
        >
          Appointments
        </a>
        <a
          className={splitLocation[1] === "clients" ? "active_link" : ""}
          href="/clients"
        >
          Clients
        </a>
        <a
          className={splitLocation[1] === "dashboard" ? "active_link" : ""}
          href="/dashboard"
        >
          Dashboard
        </a>
      </div>
      <div className="navbar__right">
        <a href="!#">
          <i className="fa fa-search" aria-hidden="true"></i>
        </a>
        <a href="!#">
          <img width="30" src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
