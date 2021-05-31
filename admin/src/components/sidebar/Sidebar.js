import "./Sidebar.css";
import logo from "../../assets/logo.png";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>Ammar Ahmed</h1>
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
          <i className="fa fa-user-secret" aria-hidden="true"></i>
          <a href="/counselorMng">Counselor Management</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-user-o"></i>
          <a href="/userMng">User Management</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-calendar"></i>
          <a href="/appointment">Appointments</a>
        </div>
        <h2>PENDINGS</h2>
        <div className="sidebar__link">
          <i className="fa fa-handshake-o"></i>
          <a href="/counselorReq">Counselors Requests</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-question"></i>
          <a href="/payReq">Payment Requests</a>
        </div>
        <h2>LISTS</h2>
        <div className="sidebar__link">
          <i className="fa fa-credit-card"></i>
          <a href="/payments">Payments</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-comment"></i>
          <a href="/feedback">Feedback</a>
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
