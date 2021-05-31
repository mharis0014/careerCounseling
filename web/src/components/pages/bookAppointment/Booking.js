import React, { useState } from "react";
import "./Booking.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pic from "../../../assets/s11.svg";
import { useHistory, useLocation, withRouter } from "react-router-dom";

function Booking(props) {
  const [dateTime, setDateTime] = useState(new Date());
  const [visible, setVisible] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const data = location.data;

  const selectPkgBtn = () => {
    // const datetime = dateTime.toDateString();
    console.log(dateTime);
    data['date'] = dateTime;
    console.log(data);
    props.history.push({
      pathname: "/payment-options",
      data: data,
    });
  };

  const handleChange = (date) => {
    setDateTime(date);
    setVisible(true);
  };

  return (
    <div
      onClick={() => console.log(location.data)}
      style={{
        backgroundColor: "#1c2237",
        width: "100%",
        display: "flex",
        height: 500,
        justifyContent: "space-around",
        flexDirection: "row",
      }}
    >
      <div>
        <img
          src={Pic}
          height="450"
          width="550"
          alt="aaa"
          className="home__hero-img"
        />
        <div
          style={{
            fontSize: "23px",
            lineHeight: 1.1,
            fontWeight: 600,
            color: "#f7f8fa",
            marginTop: -40,
          }}
        >
          <h1>Select Date and Time</h1>
        </div>
      </div>

      <div
        style={{
          justifyContent: "center",
          margin: 40,
          padding: 30,
          borderRadius: 20,
        }}
      >
        <div
          style={{ marginBottom: 30, display: "flex", flexDirection: "row" }}
        >
          <input
            style={{ width: 250, height: 30, marginRight: 10 }}
            type="text"
            name="dateTime"
            value={dateTime}
          />
          {visible ? (
            <div
              onClick={() => selectPkgBtn()}
              style={{
                backgroundColor: "red",
                color: "#fff",
                paddingLeft: 22,
                paddingRight: 22,
                paddingTop: 5,
                paddingBottom: 3,
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              <p style={{ fontSize: 15 }}>OK</p>
            </div>
          ) : null}
        </div>
        <DatePicker
          selected={dateTime}
          onChange={(date) => handleChange(date)}
          dateFormat="MMMM d, yyyy h:mm aa"
          showTimeSelect
          timeInputLabel="Time:"
          inline
        />
      </div>
    </div>
  );
}

export default withRouter(Booking);
