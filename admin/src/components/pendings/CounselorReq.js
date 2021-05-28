import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";

const CounselorReq = () => {
  const [arrayData, setArrData] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const response = await fetch("http://localhost:3001/getCounselorData/requested");
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
        "http://localhost:3001/updateCounselor" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileList: {
              contentType: "image/png",
              data: arrayData.imageData,
            },
            name: arrayData.name,
            email: arrayData.email,
            password: arrayData.password,
            education: arrayData.education,
            about: arrayData.about,
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
    loadUsers();
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
              <tr>
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
                <td>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </td>
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
                    }}
                    class="btn btn-primary mr-2"
                  >
                    <button value={counselor.id} onClick={handleClick}>
                      Confirm
                    </button>
                    {/* <i className="fa fa-check" aria-hidden="true"></i> */}
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
