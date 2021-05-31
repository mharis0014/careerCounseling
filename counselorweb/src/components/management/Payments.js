import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";

const Payments = () => {
  const [arrayData, setArrData] = useState([]);
  const [bgColor, setBgColor] = useState([
    "#3fc495",
    "#3664d4",
    "#f6c90e",
    "red",
  ]);

  useEffect(() => {
    loadSpecificCounselorPayments();
  }, []);

  async function loadSpecificCounselorPayments() {
    const cData = localStorage.getItem("citem");
    const afterParse = JSON.parse(cData);
    const counselorId = afterParse.counselorId;
    try {
      const response = await fetch(
        "http://localhost:3001/getSpecificCounselorPayment/" + counselorId
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1 style={{ paddingBottom: 15, color: "#343a40" }}>
              Total Payments
            </h1>
            <h3 style={{ paddingBottom: 40 }}>
              Dashboard{" "}
              <span style={{ paddingLeft: 10, paddingRight: 10 }}>/</span>
              <span style={{ color: "#888" }}>Payments</span>
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
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Invoice_No</th>
              <th style={{ paddingRight: 200 }} scope="col">
                User
              </th>
              <th style={{ paddingRight: 120 }} scope="col">
                Paid_On
              </th>
              <th style={{ paddingRight: 110 }} scope="col">
                Status
              </th>
              <th style={{ paddingRight: 110 }} scope="col">
                Package
              </th>
              <th style={{ paddingRight: 110 }} scope="col">
                Amount
              </th>
              <th style={{ paddingRight: 200 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((user, index) => (
              <tr>
                <th onClick={() => console.log(arrayData)} scope="row">
                  #INV-00{index + 1}
                </th>
                <td>
                  <div>
                    <p>{user.userName}</p>
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
                  <div>
                    <p>{user.date.slice(0, 10)}</p>
                    <p style={{ color: "blue" }}>{user.date.slice(11)}</p>
                  </div>
                </td>
                <td style={{ color: "grey" }}>{user.status}</td>
                <td>
                  <div
                    style={{
                      backgroundColor: bgColor[Math.floor(Math.random() * 4)],
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      flex: 1,
                      maxWidth: "40%",
                      paddingRight: 6,
                      paddingLeft: 6,
                      paddingTop: 3,
                      paddingBottom: 3,
                      borderRadius: 7,
                    }}
                  >
                    <p style={{ color: "#fff" }}>{user.pakage}</p>
                  </div>
                </td>
                <td>{user.price}</td>
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
