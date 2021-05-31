import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";

const UserMng = () => {
  const [arrayData, setArrData] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const response = await fetch("http://localhost:3001/getUserData");
      const data = await response.json();
      setArrData(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteUser(id) {
    try {
      const response = await fetch("http://localhost:3001/deleteUser"+id, {
        method: "DELETE",
      });
      const resp = await response.json();
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  }

  const handleDelete = (e) => {
    const id = e.target.value;
    deleteUser(id);
    window.location.reload();
  };

  return (
    <main>
      <div className="main__container">
        <h1 style={{ paddingBottom: 15, color: "#343a40" }}>User Management</h1>
        <h3 style={{ paddingBottom: 40 }}>
          Dashboard <span style={{ paddingLeft: 10, paddingRight: 10 }}>/</span>
          <span style={{ color: "#888" }}>Users</span>
        </h3>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th style={{ paddingRight: 300 }} scope="col">
                Name
              </th>
              <th style={{ paddingRight: 420 }} scope="col">
                Email
              </th>
              <th style={{ paddingRight: 400 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    style={{ textDecoration: "none" }}
                    class="btn btn-primary mr-2"
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
                      value={user.id}
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

export default UserMng;
