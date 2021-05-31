import React from "react";
import { Button } from "../../Button";
import "./Pricing.css";
import { FaFire } from "react-icons/fa";
import { BsXDiamondFill } from "react-icons/bs";
import { GiCrystalize } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import { Link, useLocation, useHistory, withRouter } from "react-router-dom";

function Pricing(props) {
  const location = useLocation();
  const history = useHistory();
  const data = location.data;

  const selectPkgBtn = (e) => {
    data.pakage = e.pakage;
    data.price = e.price;
    props.history.push({
      pathname: "/book-appointment",
      data: data,
    });
    console.log(e.package);
    console.log(e.price);
  };

  return (
    <IconContext.Provider value={{ color: "#fff", size: 64 }}>
      <div onClick={() => console.log(data)} className="pricing__section">
        <div className="pricing__wrapper">
          <h1 className="pricing__heading">Pricing</h1>
          <div className="pricing__container">
            <div
              onClick={() => selectPkgBtn({ pakage: "Basic", price: "$6.99" })}
              className="pricing__container-card"
            >
              <div className="pricing__container-cardInfo">
                <div className="icon">
                  <FaFire />
                </div>
                <h3>Basic</h3>
                <h4>$6.99</h4>
                <p>Valid for 1 day</p>
                <ul className="pricing__container-features">
                  <li>Unlimited Text Chat</li>
                  <li>Anytime in working hours</li>
                  <li style={{ textDecorationLine: "line-through" }}>
                    Audio Calling
                  </li>
                  <li style={{ textDecorationLine: "line-through" }}>
                    Video Calling
                  </li>
                </ul>
                <Button buttonSize="btn--wide" buttonColor="primary">
                  Choose Plan
                </Button>
              </div>
            </div>
            <div
              onClick={() =>
                selectPkgBtn({ pakage: "Standard", price: "$14.99" })
              }
              className="pricing__container-card"
            >
              <div className="pricing__container-cardInfo">
                <div className="icon">
                  <BsXDiamondFill />
                </div>
                <h3>Standard</h3>
                <h4>$14.99</h4>
                <p>valid for 1 hour</p>
                <ul className="pricing__container-features">
                  <li>Video Calling</li>
                  <li>Audio Calling</li>
                  <li>Text Chat</li>
                  <li>1 session per day</li>
                </ul>
                <Button buttonSize="btn--wide" buttonColor="blue">
                  Choose Plan
                </Button>
              </div>
            </div>
            <div
              onClick={() =>
                selectPkgBtn({ pakage: "Premium", price: "$29.99" })
              }
              className="pricing__container-card"
            >
              <div className="pricing__container-cardInfo">
                <div className="icon">
                  <GiCrystalize />
                </div>
                <h3>Premium</h3>
                <h4>$29.99</h4>
                <p>valid for 1 week</p>
                <ul className="pricing__container-features">
                  <li>Video Call</li>
                  <li>Audio Call</li>
                  <li>Text Chat</li>
                  <li>3 sessions per week</li>
                </ul>
                <Button buttonSize="btn--wide" buttonColor="primary">
                  Choose Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
export default withRouter(Pricing);
