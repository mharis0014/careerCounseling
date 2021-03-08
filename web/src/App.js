import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import './index.css'
import Home from "./Home";
import About from "./About";
import Counselors from "./Counselors";
import Contact from "./Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Route, Switch, Redirect } from "react-router";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/counselors" component={Counselors} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
