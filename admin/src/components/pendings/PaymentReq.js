import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";
import Avatar from "../../assets/avatar.svg";

const PaymentReq = (props) => {
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
          Pending Payments
        </h1>
        <h3 style={{ paddingBottom: 40 }}>
          Dashboard <span style={{ paddingLeft: 10, paddingRight: 10 }}>/</span>
          <span style={{ color: "#888" }}>Payment Requests</span>
        </h3>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th style={{ paddingRight: 80 }} scope="col">
                Invoice_No
              </th>
              <th style={{ paddingRight: 300 }} scope="col">
                Doctor
              </th>
              <th style={{ paddingRight: 140 }} scope="col">
                Amount
              </th>
              <th style={{ paddingRight: 140 }} scope="col">
                Paid_On
              </th>
              <th style={{ paddingRight: 100 }} scope="col">
                Status
              </th>
              <th style={{ paddingRight: 150 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>#INV-00{index + 1}</td>
                <td>
                  <div className="row">
                    <img
                      src={Avatar}
                      height="60"
                      style={{ borderRadius: "50%", paddingRight: 15 }}
                      width="60"
                    />
                    <div>
                      <p>{user.name}</p>
                      <p style={{ color: "#888" }}>#{user.id}</p>
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
                <td>$160</td>
                <td>11 Apr 2019</td>
                <td>Success</td>
                <td>
                  <Link
                    style={{ textDecoration: "none" }}
                    class="btn btn-primary mr-2"
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </Link>
                  <Link
                    style={{
                      textDecoration: "none",
                      backgroundColor: "#20e354",
                    }}
                    class="btn btn-primary mr-2"
                  >
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </Link>
                  <Link
                    style={{ textDecoration: "none" }}
                    class="btn btn-danger"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
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

export default PaymentReq;
