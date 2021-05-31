import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";

const Clients = () => {
  const [arrayData, setArrData] = useState([]);
  const [uniqueClients, setUniqueClients] = useState([]);
  const [bgColor, setBgColor] = useState([
    "#3fc495",
    "#3664d4",
    "#f6c90e",
    "red",
  ]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const cData = localStorage.getItem("citem");
    const afterParse = JSON.parse(cData);
    const counselorId = afterParse.counselorId;
    try {
      const response = await fetch(
        "http://localhost:3001/getSpecificCounselorPayment/" + counselorId
      );
      const data = await response.json();
      setArrData(data);
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
              Total Clients
            </h1>
            <h3 style={{ paddingBottom: 40 }}>
              Dashboard{" "}
              <span style={{ paddingLeft: 10, paddingRight: 10 }}>/</span>
              <span style={{ color: "#888" }}>Clients</span>
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
              {uniqueClients.length}
            </p>
          </div>
        </div>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Client_No</th>
              <th style={{ paddingRight: 220 }} scope="col">
                Client_Name
              </th>
              <th style={{ paddingRight: 240 }} scope="col">
                Client_Email
              </th>
              <th style={{ paddingRight: 200 }} scope="col">
                Packages
              </th>
              <th style={{ paddingRight: 220 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((client, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{client.userName}</td>
                <td>{client.userEmail}</td>
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
                    <p style={{ color: "#fff" }}>{client.pakage}</p>
                  </div>
                </td>
                <td>
                  <Link
                    style={{ textDecoration: "none" }}
                    class="btn btn-primary mr-2"
                  >
                    <i className="fa fa-eye"></i>
                  </Link>
                  <Link
                    style={{
                      textDecoration: "none",
                      backgroundColor: "#bababa",
                      borderColor: "#bababa",
                    }}
                    class="btn btn-primary mr-2"
                  >
                    <i className="fa fa-envelope"></i>
                  </Link>
                  <Link
                    style={{
                      textDecoration: "none",
                      backgroundColor: "#b4c41c",
                      borderColor: "#b4c41c",
                    }}
                    class="btn btn-primary mr-2"
                  >
                    <i className="fa fa-phone"></i>
                  </Link>
                  <Link
                    style={{ textDecoration: "none" }}
                    class="btn btn-danger mr-2"
                  >
                    <i className="fa fa-exclamation-triangle"></i>
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

export default Clients;
