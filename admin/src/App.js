import React, { useState } from 'react';
import Main from "./components/main/Main";
import UserMng from "./components/management/UserMng";
import Payments from "./components/management/Payments";
import Feedback from "./components/management/Feedback";
import PaymentReq from "./components/pendings/PaymentReq";
import CounselorReq from "./components/pendings/CounselorReq";
import Appointments from "./components/management/Appointments";
import CounselorMng from "./components/management/CounselorMng";
import Navbar from './components/navbar/Navbar';
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./components/profile/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoutes";

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
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/dashboard" component={Main} />
          <ProtectedRoute exact path="/appointment" component={Appointments} />
          <ProtectedRoute exact path="/payments" component={Payments} />
          <ProtectedRoute exact path="/userMng" component={UserMng} />
          <ProtectedRoute exact path="/counselorMng" component={CounselorMng} />
          <ProtectedRoute exact path="/counselorReq" component={CounselorReq} />
          <ProtectedRoute exact path="/payReq" component={PaymentReq} />
          <ProtectedRoute exact path="/feedback" component={Feedback} />
        </Switch>
      </Router>
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default App;
