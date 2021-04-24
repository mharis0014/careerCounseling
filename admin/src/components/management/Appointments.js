import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";

const Appointments = () => {
  const [arrayData, setArrData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const response = await fetch("http://localhost:3001/getData");
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
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th style={{ paddingRight: 250 }} scope="col">
                Name
              </th>
              <th style={{ paddingRight: 150 }} scope="col">
                Date/Time
              </th>
              <th style={{ paddingRight: 250 }} scope="col">
                Session/Type
              </th>
              <th style={{ paddingRight: 230 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={`data:image/jpeg;base64,${user.imageData}`}
                    height="60"
                    style={{ borderRadius: "50%" }}
                    width="60"
                  />
                </td>
                <td>
                  <div>
                    <p>{user.name}</p>
                    <p style={{ color: "#888" }}>#{user.id}</p>
                    <p
                      style={{
                        fontStyle: "italic",
                        textDecorationLine: "underline",
                        color: "blue",
                      }}
                    >
                      {user.email}
                    </p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>11 Nov 2019</p>
                    <p
                      style={{
                        color: "blue",
                      }}
                    >
                      10.00 AM
                    </p>
                  </div>
                </td>
                <td>
                  Basic/Normal/Prime
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
                    onClick={() => {}}
                  >
                    Delete
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
