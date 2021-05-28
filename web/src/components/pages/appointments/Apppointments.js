import React, { useState, useEffect } from "react";
import Img from "../../../assets/s11.svg";
import Pic from "../../../assets/pics.JPG";
import "./Appointments.css";

function Apppointments() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [bgColor, setBgColor] = useState([
    "#3fc495",
    "#3664d4",
    "#f6c90e",
    "red",
  ]);

  const getUserData = async () => {
    const afterParse = JSON.parse(await localStorage.getItem("item"));
    const userId = afterParse.userId;
    fetchAppointments(userId);
  };

  const fetchAppointments = async (userId) => {
    const response = await fetch(
      "http://localhost:3001/getUserAppointments/" + userId
    );
    const data = await response.json();
    setAppointmentData(data);
    console.log(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div>
        <div style={{ marginBottom: -70, marginTop: 70, marginLeft: 110 }}>
          <h1 style={{ fontSize: 40, color: "grey" }}>Appointments</h1>
        </div>
        <img src={Img} alt={Img} width="500" height="500" />
      </div>
      <div style={{ padding: 50 }}>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th style={{ paddingRight: 150 }} scope="col">
                Counselor
              </th>
              <th style={{ paddingRight: 100 }} scope="col">
                Date/Time
              </th>
              <th style={{ paddingRight: 100 }} scope="col">
                Session/Type
              </th>
              <th style={{ paddingRight: 100 }} scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {appointmentData.map((appointment, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ marginRight: 5 }}>
                      <img
                        src={`data:image/jpeg;base64,${appointment.counselorImage}`}
                        alt="pic"
                        height="50"
                        width="50"
                        style={{ borderRadius: 50 }}
                      />
                    </div>
                    <div style={{ paddingTop: 12 }}>
                      <p>{appointment.counselorName}</p>
                    </div>
                  </div>
                </td>
                <td>{appointment.date}</td>
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
                    <p style={{ color: "#fff" }}>{appointment.pakage}</p>
                  </div>
                </td>
                <td>
                  <div className="row">
                    <div>
                      <p
                        style={{
                          color: "grey",
                        }}
                      >
                        {appointment.status}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Apppointments;
