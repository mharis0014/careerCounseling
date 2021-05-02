import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";

const Appointments = () => {
  const [arrayData, setArrData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    try {
      const response = await fetch("http://localhost:3001/getAppointments");
      const data = await response.json();
      setArrData(data);
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
        <h1 style={{ paddingBottom: 15, color: "#343a40" }}>Appointments</h1>
        <h3 style={{ paddingBottom: 40 }}>
          Dashboard <span style={{ paddingLeft: 10, paddingRight: 10 }}>/</span>
          <span style={{ color: "#888" }}>Appointments</span>
        </h3>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th style={{ paddingRight: 200 }} scope="col">
                User
              </th>
              <th style={{ paddingRight: 100 }} scope="col">
                Date/Time
              </th>
              <th style={{ paddingRight: 100 }} scope="col">
                Session/Type
              </th>
              <th style={{ paddingRight: 250 }} scope="col">
                Counselor
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
                    <p style={{ color: "#888" }}>#{appointment.userId}</p>
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
                <td>{appointment.pakage}</td>
                <td>
                  <div className="row">
                    <img
                      src={`data:image/jpeg;base64,${appointment.counselorImage}`}
                      alt="Counselor img"
                      height="60"
                      style={{ borderRadius: "50%", paddingRight: 15 }}
                      width="60"
                    />
                    <div>
                      <p>{appointment.counselorName}</p>
                      <p style={{ color: "#888" }}>
                        #{appointment.counselorId}
                      </p>
                      <p
                        style={{
                          fontStyle: "italic",
                          textDecorationLine: "underline",
                          color: "blue",
                        }}
                      >
                        {appointment.counselorEmail}
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
