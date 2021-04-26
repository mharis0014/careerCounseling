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
      const response = await fetch("http://localhost:3001/getData");
      const data = await response.json();
      setArrData(data);

      console.log(data);
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
                Patient_Name
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
              <th style={{ paddingRight: 100 }} scope="col">
                Date
              </th>
              <th style={{ paddingRight: 100 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <div className="row">
                    <img
                      src={`data:image/jpeg;base64,${user.imageData}`}
                      height="60"
                      style={{ borderRadius: "50%", paddingRight: 15 }}
                      width="60"
                    />
                    <div>
                      <p>{user.name}</p>
                      <p
                        style={{
                          fontStyle: "italic",
                          textDecorationLine: "underline",
                          color: "blue",
                        }}
                      >
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="row">
                    <img
                      src={`data:image/jpeg;base64,${user.imageData}`}
                      height="60"
                      style={{ borderRadius: "50%", paddingRight: 15 }}
                      width="60"
                    />
                    <div>
                      <p>{user.name}</p>
                      <p
                        style={{
                          fontStyle: "italic",
                          textDecorationLine: "underline",
                          color: "blue",
                        }}
                      >
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td>⭐⭐⭐⭐⭐</td>
                <td>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </td>
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
                    onClick={() => {}}
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
