import React, { useState, useEffect } from "react";
import { Button } from "../../Button";
import "./Counselor.css";
import { IconContext } from "react-icons/lib";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { MdMessage, MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { useHistory, withRouter } from "react-router-dom";

function Counselor(props) {
  const [arrayData, setArrayData] = useState([]);
  const history = useHistory();

  async function fetchData() {
    const response = await fetch(
      "http://localhost:3001/getCounselorData/confirmed"
    );
    const data = await response.json();
    setArrayData(data);
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <IconContext.Provider value={{ color: "#fff", size: 64 }}>
      <div className="counselor__section">
        <div className="counselor__wrapper">
          <h1 className="counselor__heading">Counselors</h1>
          <div className="counselor__container">
            {arrayData.map((counselor, index) => (
              <div
                key={index}
                onClick={() =>
                  props.history.push({ pathname: "./pricing", data: counselor })
                }
                className="counselor__container-card"
              >
                <div className="counselor__container-cardInfo">
                  <img
                    src={`data:image/jpeg;base64,${counselor.imageData}`}
                    alt={counselor.imageData}
                    height="256"
                    width="280"
                  />
                  <div
                    style={{
                      paddingTop: 20,
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <h3 style={{ fontSize: 18, marginRight: 20 }}>
                      {counselor.name}
                    </h3>
                    <div style={{ flexDirection: "row", display: "flex" }}>
                      <div
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 5,
                          backgroundColor: "#888",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <MdMessage size="1.3rem" />
                      </div>
                      <div
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 5,
                          backgroundColor: "#888",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 6,
                        }}
                      >
                        <FaVideo size="1.3rem" />
                      </div>
                      <div
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 5,
                          backgroundColor: "#888",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 6,
                        }}
                      >
                        <MdCall size="1.3rem" />
                      </div>
                    </div>
                  </div>
                  <div style={{ flexDirection: "row", marginRight: 140 }}>
                    <AiFillStar size="1.3rem" />
                    <AiFillStar size="1.3rem" />
                    <AiOutlineStar size="1.3rem" />
                    <AiOutlineStar size="1.3rem" />
                    <AiOutlineStar size="1.3rem" />
                  </div>
                  <p style={{ padding: 20, paddingBottom: 0 }}>
                    {counselor.about}
                  </p>
                  <Button buttonSize="btn--wide" buttonColor="primary">
                    Book Apointment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
export default withRouter(Counselor);
