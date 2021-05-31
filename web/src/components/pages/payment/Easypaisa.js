import React from "react";
import logo from "../../../assets/easypaisa.png";
import QR from "../../../assets/qrcode.png";
import { useHistory } from "react-router-dom";

const Easypaisa = (props) => {
  const [checked, setChecked] = React.useState(false);

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

  return (
    <div
      style={{
        width: "50%",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        style={{ margin: 30 }}
        src={logo}
        width="270px"
        height="50px"
        alt={logo}
      />
      <h3 style={{ margin: 8, color: "#90EE90" }}>
        Scan my EasyPaisa QR to pay
      </h3>
      <img
        onClick={() => console.log(props.data)}
        style={{ margin: 8 }}
        src={QR}
        width="300px"
        height="300px"
        alt={QR}
      />
      <label style={{ fontSize: 18, margin: 18 }}>
        <input
          style={{ width: 25, height: 25, marginRight: 8, marginTop: 3 }}
          type="checkbox"
          defaultChecked={checked}
          onChange={() => setChecked(!checked)}
        />
        Paid Successfully ? Press me
      </label>
      <div
        style={{
          width: "40%",
          padding: 20,
          backgroundColor: checked ? "#90EE90" : "#ddd",
          marginVertical: 10,
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
  );
};

export default Easypaisa;
