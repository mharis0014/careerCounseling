import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";

const CounselorMng = () => {
  const [arrayData, setArrData] = useState([]);

  useEffect(() => {
    loadCounselors();
  }, []);

  async function loadCounselors() {
    try {
      const response = await fetch(
        "http://localhost:3001/getCounselorData/confirmed"
      );
      const data = await response.json();
      setArrData(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
  async function deleteCounselor(id) {
    try {
      const response = await fetch(
        "http://localhost:3001/deleteCounselor" + id,
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
    deleteCounselor(id);
    window.location.reload();
  };

  return (
    <main>
      <div className="main__container">
        <h1 style={{ paddingBottom: 15, color: "#343a40" }}>
          Counselor Management
        </h1>
        <h3 style={{ paddingBottom: 40 }}>
          Dashboard <span style={{ paddingLeft: 10, paddingRight: 10 }}>/</span>
          <span style={{ color: "#888" }}>Counselors</span>
        </h3>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th style={{ paddingRight: 100 }} scope="col">
                Avatar
              </th>
              <th style={{ paddingRight: 130 }} scope="col">
                Name
              </th>
              <th style={{ paddingRight: 170 }} scope="col">
                Email
              </th>
              <th style={{ paddingRight: 100 }} scope="col">
                Education
              </th>
              <th style={{ paddingRight: 200 }} scope="col">
                Ratings
              </th>
              <th style={{ paddingRight: 230 }}>Action</th>
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
                  {(() => {
                    var rawRatingIndex = 0;
                    for (
                      var i = 0;
                      i < counselor.ratingAndFeedback.length;
                      i++
                    ) {
                      rawRatingIndex =
                        rawRatingIndex +
                        counselor.ratingAndFeedback[i].ratingIndex;
                    }
                    var avgRatingIndex = Math.round(
                      rawRatingIndex / counselor.ratingAndFeedback.length
                    );
                    switch (avgRatingIndex) {
                      case 1:
                        return "⭐";
                      case 2:
                        return "⭐⭐";
                      case 3:
                        return "⭐⭐⭐";
                      case 4:
                        return "⭐⭐⭐⭐";
                      case 5:
                        return "⭐⭐⭐⭐⭐";
                      default:
                        return "Not Rated Yet";
                    }
                  })()}
                </td>
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
                      value={counselor.id}
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

export default CounselorMng;
