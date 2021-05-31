import React, { useMemo, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import "./Stripe.css";
import { useHistory } from "react-router-dom";

import useResponsiveFontSize from "./userResponsiveFontSize";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const Stripe = (props) => {
  const [checked, setChecked] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const history = useHistory();

  const userData = localStorage.getItem("item");
  const afterParse = JSON.parse(userData);
  const userEmail = afterParse.userEmail;
  const userName = afterParse.userName;
  const userId = afterParse.userId;

   const paymentDone = async () => {
     try {
       const response = await fetch("http://localhost:3001/appointment", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           userID: userId,
           userName: userName,
           userEmail: userEmail,
           counselorEmail: props.data.email,
           counselorName: props.data.name,
           counselorId: props.data.id,
           counselorImg: props.data.imageData,
           date: props.data.date,
           pakage: props.data.pakage,
           price: props.data.price,
           status: "pending",
         }),
       });
       const resp = await response.json();
       console.log(resp);
       history.push("payment-success");
     } catch (e) {
       console.log(e);
     }
   };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });
    console.log("[PaymentMethod]", payload);
    console.log(props.data);
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <label className="labelname">
        Card number
        <CardNumberElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={(event) => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label className="labelname">
        Expiration date
        <CardExpiryElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={(event) => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label className="labelname">
        CVC
        <CardCvcElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={(event) => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <button
          onClick={() => setChecked(!checked)}
          className="stripebtn"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
        <div
          style={{
            width: "40%",
            padding: 20,
            backgroundColor: checked ? "#90EE90" : "#ddd",
            margin: 10,
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() =>
            checked ? paymentDone() : console.log("click on checkbox first")
          }
        >
          <h4
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 17,
              cursor: checked ? "pointer" : "default",
            }}
          >
            CONTINUE
          </h4>
        </div>
      </div>
    </form>
  );
};

export default Stripe;
