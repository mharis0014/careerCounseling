import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";

const Feedback = () => {
  const [arrayData, setArrData] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const response = await fetch(
        "http://localhost:3001/getCounselorData/confirmed"
      );
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        const ratingObj = data[i].ratingAndFeedback;
        setArrData(...arrayData, ratingObj);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main>
      <div className="main__container">
        <h1 style={{ paddingBottom: 15, color: "#343a40" }}>
          Reviews & Feedbacks
        </h1>
        <h3 style={{ paddingBottom: 40 }}>
          Dashboard <span style={{ paddingLeft: 10, paddingRight: 10 }}>/</span>
          <span style={{ color: "#888" }}>Feedback</span>
        </h3>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th style={{ paddingRight: 100 }} scope="col">
                User_Name
              </th>
              <th style={{ paddingRight: 100 }} scope="col">
                Counselor_Name
              </th>
              <th style={{ paddingRight: 100 }} scope="col">
                Reviews
              </th>
              <th style={{ paddingRight: 300 }} scope="col">
                Feedbacks
              </th>
              <th style={{ paddingRight: 100 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((r, i) => (
              <tr onClick={() => console.log(arrayData)}>
                <th scope="row">{i + 1}</th>
                <td>
                  <div className="row">
                    <div>
                      <p>{r.userName}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="row">
                    <div>
                      <p>{r.counselorName}</p>
                      <p
                        style={{
                          fontStyle: "italic",
                          textDecorationLine: "underline",
                          color: "blue",
                        }}
                      ></p>
                    </div>
                  </div>
                </td>
                <td>{r.ratingIndex}</td>
                <td>{r.feedback}</td>
                <td>
                  <Link
                    style={{ textDecoration: "none" }}
                    class="btn btn-primary mr-2"
                  >
                    <i className="fa fa-reply"></i>
                  </Link>
                  <Link
                    style={{ textDecoration: "none" }}
                    class="btn btn-danger"
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
