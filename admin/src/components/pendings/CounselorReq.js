import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";

const CounselorReq = () => {
  const [arrayData, setArrData] = useState([]);
  const [bgColor, setBgColor] = useState([
    "#3fc495",
    "#3664d4",
    "#f6c90e",
    "red",
  ]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const response = await fetch(
        "http://localhost:3001/getCounselorData/requested"
      );
      const data = await response.json();
      setArrData(data);

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  const confirmCounselor = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3001/updateCounselor/" + id,
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

  const handleClick = (e) => {
    const id = e.target.value;
    confirmCounselor(id);
    window.location.reload();
  };

  return (
    <main>
      <div className="main__container">
        <h1 style={{ paddingBottom: 15, color: "#343a40" }}>
          Pending Counselors
        </h1>
        <h3 style={{ paddingBottom: 40 }}>
          Dashboard <span style={{ paddingLeft: 10, paddingRight: 10 }}>/</span>
          <span style={{ color: "#888" }}>Counselors Requests</span>
        </h3>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th style={{ paddingRight: 50 }} scope="col">
                Avatar
              </th>
              <th style={{ paddingRight: 100 }} scope="col">
                Name
              </th>
              <th style={{ paddingRight: 150 }} scope="col">
                Email
              </th>
              <th style={{ paddingRight: 50 }} scope="col">
                Education
              </th>
              <th style={{ paddingRight: 250 }} scope="col">
                About
              </th>
              <th style={{ paddingRight: 100 }} scope="col">
                Experience
              </th>
              <th style={{ paddingRight: 140 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((counselor, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={`data:image/jpeg;base64,${counselor.imageData}`}
                    height="50"
                    style={{ borderRadius: "50%" }}
                    width="50"
                  />
                </td>
                <td>{counselor.name}</td>
                <td>{counselor.email}</td>
                <td>{counselor.education}</td>
                <td>{counselor.about}</td>
                <td>3 Years</td>
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
                        backgroundColor: "transparent",
                        border: 0,
                        color: "#20e354",
                        fontSize: 1,
                      }}
                      value={counselor.id}
                      onClick={handleClick}
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

export default CounselorReq;
