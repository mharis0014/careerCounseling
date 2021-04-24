import { useState } from "react";
import "./App.css";
import Main from "./components/main/Main";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import UserMng from "./components/management/UserMng";
import Appointments from "./components/management/Appointments";
import CounselorMng from "./components/management/CounselorMng";
import CounselorReq from "./components/management/CounselorReq";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  return (
    <div className="container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/appointment" component={Appointments} />
          <Route exact path="/userMng" component={UserMng} />
          <Route exact path="/counselorMng" component={CounselorMng} />
          <Route exact path="/counselorReq" component={CounselorReq} />
        </Switch>
      </Router>
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default App;