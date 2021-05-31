import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";

const Feedback = () => {
  const [arrayData, setArrData] = useState([]);
  const [bgColor, setBgColor] = useState([
    "#3fc495",
    "#3664d4",
    "#f6c90e",
    "red",
  ]);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  async function loadFeedbacks() {
    const cData = localStorage.getItem("citem");
    const afterParse = JSON.parse(cData);
    const counselorId = afterParse.counselorId;
    try {
      const response = await fetch(
        "http://localhost:3001/getSpecificCounselorFeedback/" + counselorId
      );
      const data = await response.json();
      const feedbacksArr = data.ratingAndFeedback;
      setArrData(feedbacksArr);
      console.log(feedbacksArr);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main>
      <div className="main__container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1 style={{ paddingBottom: 15, color: "#343a40" }}>
              Reviews & Feedbacks
            </h1>
            <h3 style={{ paddingBottom: 40 }}>
              Dashboard{" "}
              <span style={{ paddingLeft: 10, paddingRight: 10 }}>/</span>
              <span style={{ color: "#888" }}>Feedback</span>
            </h3>
          </div>
          <div
            style={{
              backgroundColor: bgColor[Math.floor(Math.random() * 4)],
              width: 120,
              height: 80,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              borderRadius: 10,
            }}
          >
            <p style={{ color: "#fff", fontSize: 50, fontWeight: "bolder" }}>
              {arrayData.length}
            </p>
          </div>
        </div>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th style={{ paddingRight: 250 }} scope="col">
                User_Name
              </th>
              <th style={{ paddingRight: 130 }} scope="col">
                Date
              </th>
              <th style={{ paddingRight: 310 }} scope="col">
                Feedbacks
              </th>
              <th style={{ paddingRight: 130 }} scope="col">
                Reviews
              </th>
              <th style={{ paddingRight: 100 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((counselor, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{counselor.userName}</td>
                <td>
                  <div>
                    <p>11 Nov 2019</p>
                    <p
                      style={{
                        color: "blue",
                      }}
                    >
                      10.00 AM
                    </p>
                  </div>
                </td>
                <td>{counselor.feedback}</td>
                <td>
                  {(() => {
                    switch (counselor.ratingIndex) {
                      case 1:
                        return "⭐";
                      case 2:
                        return "⭐⭐";
                      case 3:
                        return "⭐⭐⭐";
                      case 4:
                        return "⭐⭐⭐⭐";
                      case 5:
                        return "⭐⭐⭐⭐⭐";
                      default:
                        return "Not Rated Yet";
                    }
                  })()}
                </td>
                <td>
                  <Link
                    style={{ textDecoration: "none" }}
                    className="btn btn-primary mr-2"
                  >
                    <i className="fa fa-reply"></i>
                  </Link>
                  <Link
                    style={{ textDecoration: "none" }}
                    className="btn btn-danger"
                  >
                    <i className="fa fa-trash"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Feedback;
