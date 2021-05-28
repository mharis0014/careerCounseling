import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./profile/Login";
import Home from "./components/pages/HomePage/Home";
import SignUp from "./components/pages/SignUp/SignUp";
import Counselor from "./components/pages/Counselor/Counselor";
import Booking from "./components/pages/bookAppointment/Booking";
import Pricing from "./components/pages/bookAppointment/Pricing";
import PaymentOptions from "./components/pages/payment/PaymentOptions";
import PaymentSuccess from "./components/pages/payment/PaymentSuccess";
import Appointments from "./components/pages/appointments/Apppointments";
import Quiz from "./components/pages/AI/Quiz";
import QnACard from "./components/pages/AI/QnACard";
import Footer from "./components/pages/Footer/Footer";
import { ProtectedRoute } from "./ProtectedRoutes";

function App() {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/sign-up" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} />
        <Route path="/career-test" component={Quiz} />
        <Route path="/services" component={Counselor} />
        <ProtectedRoute path="/book-appointment" component={Booking} />
        <ProtectedRoute path="/payment-options" component={PaymentOptions} />
        <ProtectedRoute path="/payment-success" component={PaymentSuccess} />
        <ProtectedRoute path="/appointments" component={Appointments} />
        <ProtectedRoute path="/questions" component={QnACard} />
        <ProtectedRoute path="/pricing" component={Pricing} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
