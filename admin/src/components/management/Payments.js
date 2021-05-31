import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";

const Payments = () => {
  const [arrayData, setArrData] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const response = await fetch(
        "http://localhost:3001/getPayments/confirmed"
      );
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
        <h1 style={{ paddingBottom: 15, color: "#343a40" }}>Total Payments</h1>
        <h3 style={{ paddingBottom: 40 }}>
          Dashboard <span style={{ paddingLeft: 10, paddingRight: 10 }}>/</span>
          <span style={{ color: "#888" }}>Payments</span>
        </h3>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Invoice_No</th>
              <th style={{ paddingRight: 240 }} scope="col">
                User
              </th>
              <th style={{ paddingRight: 250 }} scope="col">
                Counselor
              </th>
              <th style={{ paddingRight: 50 }} scope="col">
                Amount
              </th>
              <th style={{ paddingRight: 80 }} scope="col">
                Paid_On
              </th>
              <th style={{ paddingRight: 80 }} scope="col">
                Status
              </th>
              <th style={{ paddingRight: 150 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((user, index) => (
              <tr>
                <th scope="row">#INV-00{index + 1}</th>
                <td>
                  <div>
                    <p>{user.userName}</p>
                    <p style={{ color: "#888" }}>#{user.userId}</p>
                    <p
                      style={{
                        fontStyle: "italic",
                        textDecorationLine: "underline",
                        color: "blue",
                      }}
                    >
                      {user.userEmail}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="row">
                    <img
                      src={`data:image/jpeg;base64,${user.counselorImageData}`}
                      height="60"
                      style={{ borderRadius: "50%", paddingRight: 15 }}
                      width="60"
                    />
                    <div>
                      <p>{user.counselorName}</p>
                      <p style={{ color: "#888" }}>#{user.counselorId}</p>
                      <p
                        style={{
                          fontStyle: "italic",
                          textDecorationLine: "underline",
                          color: "blue",
                        }}
                      >
                        {user.counselorEmail}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{user.price}</td>
                <td>{user.date}</td>
                <td>{user.status}</td>
                <td>
                  <Link
                    style={{ textDecoration: "none" }}
                    class="btn btn-primary mr-2"
                  >
                    <i className="fa fa-eye"></i> View
                  </Link>
                  <Link
                    style={{ textDecoration: "none" }}
                    class="btn btn-danger"
                  >
                    <i className="fa fa-print"></i> Print
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

export default Payments;
