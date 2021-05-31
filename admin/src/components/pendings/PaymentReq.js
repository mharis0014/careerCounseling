import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";

const PaymentReq = (props) => {
  const [arrayData, setArrData] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    try {
      const response = await fetch(
        "http://localhost:3001/getAppointments/pending"
      );
      const data = await response.json();
      setArrData(data);
      console.log(data[0]);
    } catch (e) {
      console.log(e);
    }
  }

  const confirmAppointment = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3001/updateAppointment/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "confirmed",
          }),
        }
      );
      const resp = await response.json();
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const handleConfirm = (e) => {
    const id = e.target.value;
    console.log(id);
    confirmAppointment(id);
    window.location.reload();
  };

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
              <th scope="col">Invoice_No</th>
              <th style={{ paddingRight: 230 }} scope="col">
                User
              </th>
              <th style={{ paddingRight: 250 }} scope="col">
                Counselor
              </th>
              <th style={{ paddingRight: 50 }} scope="col">
                Amount
              </th>
              <th style={{ paddingRight: 90 }} scope="col">
                Paid_On
              </th>
              <th style={{ paddingRight: 80 }} scope="col">
                Status
              </th>
              <th style={{ paddingRight: 180 }}>Action</th>
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
                      src={`data:image/jpeg;base64,${user.counselorImage}`}
                      alt="counselor img"
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
                <td>
                  <div>
                    <p>{user.date.slice(0, 10)}</p>
                    <p
                      style={{
                        color: "blue",
                        paddingTop: 5,
                      }}
                    >
                      {user.date.slice(11)}
                    </p>
                  </div>
                </td>
                <td>{user.status}</td>
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
                      borderColor: "#20e354",
                    }}
                    class="btn btn-primary mr-2"
                  >
                    <i className="fa fa-check" aria-hidden="true"></i>
                    <button
                      style={{
                        paddingLeft: 5,
                        border: 0,
                        backgroundColor: '#20e354',
                        color: "#fff",
                        fontSize: 16,
                      }}
                      value={user.appointmentId}
                      onClick={handleConfirm}
                    >
                      Confirm
                    </button>
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
