import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./index.css";
import Home from "./user/Home";
import About from "./user/About";
import Counselors from "./user/Counselors";
import Contact from "./user/Contact";
import Footer from "./components/main/Footer";
import Chat from "./components/chat/Chat";
import Quiz from "./components/quiz/Quiz";
import Login from "./components/profile/Login";
import SignIn from "./components/profile/SignIn";
import SignUp from "./components/profile/SignUp";
import ImgPicker from "./components/profile/ImgPicker";
import { Route, Switch, Redirect } from "react-router";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/counselors" component={Counselors} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/quiz" component={Quiz} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
