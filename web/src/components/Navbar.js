import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Button } from "./Button";
import { Link, useHistory } from "react-router-dom";
import { GiCardPick } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

function Navbar() {
  const history = useHistory();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    localStorage.getItem("item") && setLoggedIn(true);
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return window.removeEventListener("resize", showButton);
  }, [showButton]);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <GiCardPick size="2.2rem" className="navbar-icon" />
              CAREER FINDER
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/services"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Counselors
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/appointments"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Appointments
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/career-test"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Career Test
                </Link>
              </li>
              {loggedIn ? (
                <li className="nav-item">
                  <Link
                    onClick={() => {
                      localStorage.removeItem("item");
                      history.push("/login");
                      setLoggedIn(false);
                    }}
                    className="nav-links"
                  >
                    Logout
                  </Link>
                </li>
              ) : null}
              <li className="nav-btn">
                {button ? (
                  <Link to="/sign-up" className="btn-link">
                    <Button buttonStyle="btn--outline">SIGN UP</Button>
                  </Link>
                ) : (
                  <Link to="/sign-up" className="btn-link">
                    <Button
                      buttonStyle="btn--outline"
                      buttonSize="btn--mobile"
                      onClick={closeMobileMenu}
                    >
                      SIGN UP
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
