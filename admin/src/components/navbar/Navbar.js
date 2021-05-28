import "./Navbar.css";
import avatar from "../../assets/avatar.svg";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  const path = window.location.pathname;
  console.log(path);
  const splitLocation = path.split("/");
  console.log(splitLocation);

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
          className={splitLocation[1] === "userMng" ? "active_link" : ""}
          href="/userMng"
        >
          User Management
        </a>
        <a
          className={splitLocation[1] === "counselorMng" ? "active_link" : ""}
          href="/counselorMng"
        >
          Counselor Management
        </a>
        <a
          className={splitLocation[1] === "dashboard" ? "active_link" : ""}
          href="/dashboard"
        >
          Dashboard
        </a>
      </div>
      <div className="navbar__right">
        <a href="#">
          <i className="fa fa-search" aria-hidden="true"></i>
        </a>
        <a href="#!">
          <img width="30" src={avatar} alt="avatar" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
