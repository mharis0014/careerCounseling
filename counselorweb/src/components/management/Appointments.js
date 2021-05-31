import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";

const Appointments = () => {
  const [arrayData, setArrData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [bgColor, setBgColor] = useState([
    "#3fc495",
    "#3664d4",
    "#f6c90e",
    "red",
  ]);

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
      const cData = localStorage.getItem("citem");
      const afterParse = JSON.parse(cData);
      const counselorId = afterParse.counselorId;
    try {
      const response = await fetch(
        "http://localhost:3001/getCounselorAppointments/"+counselorId);
      const data = await response.json();
      setArrData(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteAppointment(id) {
    try {
      const response = await fetch(
        "http://localhost:3001/deleteAppointment"+id,
        {
          method: "DELETE",
        }
      );
      const resp = await response.json();
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  }

  const handleDelete = (e) => {
    const id = e.target.value;
    deleteAppointment(id);
    loadAppointments();
  };

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
              Total Appointments
            </h1>
            <h3 style={{ paddingBottom: 40 }}>
              Dashboard{" "}
              <span style={{ paddingLeft: 10, paddingRight: 10 }}>/</span>
              <span style={{ color: "#888" }}>Appointments</span>
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
              <th scope="col">#</th>
              <th style={{ paddingRight: 250 }} scope="col">
                User
              </th>
              <th style={{ paddingRight: 120 }} scope="col">
                Date/Time
              </th>
              <th style={{ paddingRight: 130 }} scope="col">
                Session/Type
              </th>
              <th style={{ paddingRight: 150 }} scope="col">
                Status
              </th>
              <th style={{ paddingRight: 250 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((appointment, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <div>
                    <p>{appointment.userName}</p>
                    <p
                      style={{
                        fontStyle: "italic",
                        textDecorationLine: "underline",
                        color: "blue",
                      }}
                    >
                      {appointment.userEmail}
                    </p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{appointment.date.slice(0, 10)}</p>
                    <p
                      style={{
                        color: "blue",
                        paddingTop: 5,
                      }}
                    >
                      {appointment.date.slice(11)}
                    </p>
                  </div>
                </td>
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
                      <p>{appointment.counselorName}</p>
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

                <td>
                  <Link
                    style={{ textDecoration: "none" }}
                    class="btn btn-primary mr-2"
                    onClick={() => setVisible(!visible)}
                  >
                    View
                  </Link>
                  <Link
                    style={{ textDecoration: "none" }}
                    class="btn btn-outline-primary mr-2"
                  >
                    Edit
                  </Link>
                  <Link
                    style={{ textDecoration: "none" }}
                    class="btn btn-danger"
                  >
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: 0,
                        color: "#fff",
                        fontSize: 15,
                      }}
                      value={appointment.appointmentId}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
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

export default Appointments;
