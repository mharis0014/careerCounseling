import React, { useState, useEffect } from "react";
import "./Main.css";
import hello from "../../assets/hello.svg";
import Chart from "../charts/Chart";

const Main = () => {
  const [userData, setUserData] = useState([]);
  const [counselorData, setCounselorData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [appointmentPrice, setAppointmentPrice] = useState("");
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [requestedCounselors, setRequestedCounselors] = useState([]);

  useEffect(() => {
    loadUsers();
    loadCounselors();
    loadAppointments();
    loadConfirmAppointments();
    loadPendingPayments();
    loadRequestedCounselors();
  }, []);

  async function loadUsers() {
    try {
      const response = await fetch("http://localhost:3001/getUserData");
      const data = await response.json();
      setUserData(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function loadCounselors() {
    try {
      const response = await fetch(
        "http://localhost:3001/getCounselorData/confirmed"
      );
      const data = await response.json();
      setCounselorData(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function loadConfirmAppointments() {
    try {
      const response = await fetch(
        "http://localhost:3001/getAppointments/confirmed"
      );
      const data = await response.json();
      var totalSum = 0;
      for (var i = 0; i < data.length; i++) {
        var sliced = data[i].price.slice(1);
        totalSum = totalSum + parseInt(sliced);
      }
      setAppointmentPrice(totalSum);
    } catch (e) {
      console.log(e);
    }
  }

  async function loadPendingPayments() {
    try {
      const response = await fetch(
        "http://localhost:3001/getAppointments/pending"
      );
      const data = await response.json();
      setPendingAppointments(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function loadAppointments() {
    try {
      const response = await fetch("http://localhost:3001/getAppointments");
      const data = await response.json();
      setAppointmentData(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function loadRequestedCounselors() {
    try {
      const response = await fetch(
        "http://localhost:3001/getCounselorData/requested"
      );
      const data = await response.json();
      setRequestedCounselors(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello Ammar Ahmed</h1>
            <p>Welcome to your admin dashboard</p>
          </div>
        </div>
        <div className="main__cards">
          <div className="card">
            <i
              className="fa fa-user-o fa-2x text-lightblue"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Users</p>
              <span className="font-bold text-title">{userData.length}</span>
            </div>
          </div>
          <div className="card">
            <i className="fa fa-calendar fa-2x text-red" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Total Appoinemts</p>
              <span className="font-bold text-title">
                {appointmentData.length}
              </span>
            </div>
          </div>
          <div className="card">
            <i
              className="fa fa-user-secret fa-2x text-yellow"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Counselors</p>
              <span className="font-bold text-title">
                {counselorData.length}
              </span>
            </div>
          </div>
          <div className="card">
            <i
              className="fa fa-thumbs-up fa-2x text-green"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Likes</p>
              <span className="font-bold text-title">645</span>
            </div>
          </div>
        </div>
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Daily Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>
            <Chart />
          </div>
          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Stats & Pendings</h1>
                <p>
                  Kindly Accept the pending counselor's and payment's Requests
                </p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>
            <div className="charts__right__cards">
              <div className="card1">
                <h1>Income</h1>
                <p>${appointmentPrice}</p>
              </div>
              <div className="card2">
                <h1>Counselors</h1>
                <p>{requestedCounselors.length}</p>
              </div>
              <div className="card3">
                <h1>Free Users</h1>
                <p>290</p>
              </div>
              <div className="card4">
                <h1>Payments</h1>
                <p>{pendingAppointments.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
