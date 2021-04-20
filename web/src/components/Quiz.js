import React, { useState } from "react";

import Questions from "../data/questions";
import Answers from "../data/answers";

const Quiz = (props) => {
  const [q_no, setq_no] = useState(0);
  const [visible, setVisible] = useState(true)
  const [ansArray, setAnsArray] = useState([]);

  const mcqSelect = (label) => {
    if (q_no + 1 >= 50) {
      setVisible(false);
    } else {
      setq_no(q_no + 1);
    }
    setAnsArray((prev) => [...prev, label]);
  };

  const Item = ({ option, name, label }) => (
    <div
      onClick={() => mcqSelect(label)}
      style={{
        width: "80%",
        padding: 20,
        backgroundColor: "#93278f",
        marginVertical: 10,
        marginBottom: 12,
        borderRadius: 30,
      }}
    >
      <h4 style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>
        {name + ")  " + option}
      </h4>
    </div>
  );
  return visible ? (
    <div
      style={{
        width: "63%",
        height: "72%",
        marginTop: 80,
        marginLeft: 300,
        paddingTop: "1%",
        flexDirection: "column",
        paddingLeft: "5%",
        paddingBottom: "2%",
        backgroundColor: "#f2f2f2",
        border: '5px solid #bcb6d4',
        borderRadius: 50,
      }}
    >
      <div style={{ flex: 1, padding: 15 }}>
        <h4 style={{ fontWeight: "bold", color: "#777" }}>
          Question {q_no + 1 + ": " + Questions[q_no]}
          <span style={{ paddingLeft: 400 }}>{q_no + 1}/50</span>
        </h4>
      </div>
      <hr
        style={{
          borderColor: "#333",
          width: "90%",
        }}
      />
      <div style={{ flex: 7, alignItems: "center" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            marginLeft: 40,
            paddingTop: "3%",
          }}
        >
          <ul>
            {Answers.map((item) => (
              <Item label={item.label} name={item.name} option={item.option} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div style={{ marginTop: 300 }}>
      <h1>RESULT: {ansArray.toString(10).split("")}</h1>
    </div>
  );
};

export default Quiz;
