import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";

function PaymentSuccess() {
  
    const location = useLocation();
    const history = useHistory();
    const counselorId = location.counselorId;
    const counselorName = location.name;
    const counselorEmail = location.email;
    const counselorImage = location.image;
    const pakage = location.pakage;
    const price = location.price;
    const date = location.date;

    const selectPkgBtn = (e) => {
      history.push("/payment-success", {
        counselorImage: counselorImage,
        counselorId: counselorId,
        counselorName: counselorName,
        counselorEmail: counselorEmail,
        pakage: pakage,
        price: price,
        date: date,
      });
      console.log(date);
    };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#eee",
        height: 470,
      }}
    >
      <div
        style={{
          width: "46.5%",
          height: "83%",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "75%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaCheckCircle color="#09dca4" size="70px" />
          <h3
            style={{
              fontSize: "32px",
              fontWeight: "normal",
              padding: 20,
            }}
          >
            Appointment Booked Successfully!
          </h3>
          <p>
            Appointment Booked with <strong>Ammar Ahmed</strong>
            <br /> on <strong>12 May 2021 5:00PM to 6:00PM</strong>
          </p>
          <div
            style={{
              width: "30%",
              padding: 18,
              backgroundColor: "#09dca4",
              margin: 30,
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => history.push("/appointments")}
          >
            <h4
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 17,
                cursor: "pointer",
              }}
            >
              CONTINUE
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
