import React, { useState, useEffect } from "react";
import "./Main.css";
import "../adminStyles/AdminStyles.css";
import Circle from "react-circle";
import { Link } from "react-router-dom";

const Main = () => {
  const [arrayData, setArrData] = useState([]);
  const [clientsData, setClientsData] = useState([]);
  const [uniqueClients, setUniqueClients] = useState([]);
  const [visible, setVisible] = useState(false);
  const [bgColor, setBgColor] = useState([
    "#3fc495",
    "#3664d4",
    "#f6c90e",
    "red",
  ]);

  useEffect(() => {
    loadAppointments();
    loadClients();
  }, []);

  async function loadAppointments() {
    const cData = localStorage.getItem("citem");
    const afterParse = JSON.parse(cData);
    const counselorId = afterParse.counselorId;
    try {
      const response = await fetch(
        "http://localhost:3001/getCounselorAppointments/" + counselorId
      );
      const data = await response.json();
      setArrData(data);
      console.log(data);
      let userNames = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i].userName;
        userNames.push(element);
      }
      let unique = [...new Set(userNames)];
      console.log("Length: " + unique.length);
      setUniqueClients(unique);
    } catch (e) {
      console.log(e);
    }
  }

  async function loadClients() {
    const cData = localStorage.getItem("citem");
    const afterParse = JSON.parse(cData);
    const counselorId = afterParse.counselorId;
    try {
      const response = await fetch(
        "http://localhost:3001/getSpecificCounselorPayment/" + counselorId
      );
      const data = await response.json();
      setClientsData(data);
      console.log("Clients Data Length: " + clientsData.length);
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteAppointment(id) {
    try {
      const response = await fetch(
        "http://localhost:3001/deleteAppointment" + id,
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
        <div className="main__cards">
          <div className="card row">
            <Circle
              animate={true}
              animationDuration="1s"
              size={130}
              lineWidth={30}
              progress={Math.floor(uniqueClients.length * 7)}
              progressColor="#009999"
              bgColor="whitesmoke"
              textColor="hotpink"
              textStyle={{
                font: "bold 5rem Helvetica, Arial, sans-serif",
              }}
              percentSpacing={10}
              showPercentage={true}
              showPercentageSymbol={true}
            />
            <div>
              <p style={{ fontSize: 23, padding: 5 }}>Total Clients</p>
              <p
                style={{
                  fontSize: 35,
                  fontWeight: "bold",
                  padding: 3,
                }}
              >
                {uniqueClients.length}
              </p>
              <p style={{ color: "#888", fontSize: 18, padding: 5 }}>
                Till Today
              </p>
            </div>
          </div>
          <div className="card row">
            <Circle
              animate={true}
              animationDuration="1s"
              size={130}
              lineWidth={30}
              progress={Math.floor(uniqueClients.length * 10)}
              progressColor="#8cd9ad"
              bgColor="whitesmoke"
              textColor="hotpink"
              textStyle={{
                font: "bold 5rem Helvetica, Arial, sans-serif",
              }}
              percentSpacing={10}
              showPercentage={true}
              showPercentageSymbol={true}
            />
            <div>
              <p style={{ fontSize: 23, padding: 5 }}>Today Clients</p>
              <p
                style={{
                  fontSize: 35,
                  fontWeight: "bold",
                  padding: 3,
                }}
              >
                {uniqueClients.length}
              </p>
              <p style={{ color: "#888", fontSize: 18, padding: 5 }}>
                19, Nov 2021
              </p>
            </div>
          </div>
          <div className="card row">
            <Circle
              animate={true}
              animationDuration="1s"
              size={130}
              lineWidth={30}
              progress={Math.floor(arrayData.length * 5)}
              progressColor="#006699"
              bgColor="whitesmoke"
              textColor="hotpink"
              textStyle={{
                font: "bold 5rem Helvetica, Arial, sans-serif",
              }}
              percentSpacing={10}
              showPercentage={true}
              showPercentageSymbol={true}
            />
            <div>
              <p style={{ fontSize: 23, padding: 5 }}>Appointments</p>
              <p
                style={{
                  fontSize: 35,
                  fontWeight: "bold",
                  padding: 3,
                }}
              >
                {arrayData.length}
              </p>
              <p style={{ color: "#888", fontSize: 18, padding: 5 }}>
                06, Apr 2019
              </p>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 28, marginBottom: 20 }}>
              Client Appointments
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

export default Main;
