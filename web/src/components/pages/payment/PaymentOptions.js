import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Stripe from "./Stripe";
import Easypaisa from "./Easypaisa";
import logo from "../../../assets/stripelogo.png";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const PaymentOptions = () => {
  const location = useLocation();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "row",
      }}
    >
      <Easypaisa data={location.data} />
      <div style={{ backgroundColor: "#f7f7f7", width: "50%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{ margin: 10 }}
            src={logo}
            width="270px"
            height="90px"
            alt={logo}
          />
        </div>
        <div style={{ padding: 100 }}>
          <Elements stripe={stripePromise}>
            <Stripe data={location.data} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
