import React, { useState } from "react";
import Questions from "../../../data/questions";
import Answers from "../../../data/answers";
import ProgressBar from "@ramonak/react-progress-bar";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Img1 from "../../../assets/svg-1.svg";
import Img2 from "../../../assets/svg-2.svg";
import Img3 from "../../../assets/svg-3.svg";
import Rep from "../../../data/report";
import Recommendation from "./Recommendation";

function QnACard() {
  const [q_no, setq_no] = useState(0);
  const [visible, setVisible] = useState(true);
  const [ansArray, setAnsArray] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [comp, setComp] = useState(true);
  const [note, setNote] = useState(false);
  const [personality, setPersonality] = useState("");
  const [labels, setLabels] = useState([]);
  const [interests, setInterests] = useState([]);

  async function sendCred() {
    await fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ansArray,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPersonality(data);
        setLoading(true);
        setComp(false);
        career(data);
        personaltits(data);
      });
  }

  const personalityData = {
    labels: [
      "Openness",
      "Extroversion",
      "Neuroticism",
      "Agreeableness",
      "Concientious",
    ],
    datasets: [
      {
        data: [
          personality.open,
          personality.extroversion,
          personality.neurotic,
          personality.agreeable,
          personality.conscientious,
        ],
        borderColor: ["rgba(255, 206, 86, 0.2)"],
        backgroundColor: [
          "rgba(0, 206, 86, 1)",
          "rgba(255, 30, 0, 1)",
          "rgba(255, 0, 86, 1)",
          "rgba(0, 70, 256, 1)",
          "rgba(250, 10, 190, 1)",
        ],
      },
    ],
  };

  var p1, p2, p3, p4, p5, c1, c2, c3;

  const careerData = {
    labels: labels,
    datasets: [
      {
        data: [3, 2, 1],
        borderColor: ["rgba(255, 206, 86, 0.2)"],
        backgroundColor: [
          "rgba(0, 206, 86, 1)",
          "rgba(255, 30, 0, 1)",
          "rgba(255, 0, 86, 1)",
        ],
      },
    ],
  };

  const intrestsData = {
    labels: interests,
    datasets: [
      {
        data: [3, 2, 2, 1, 5],
        borderColor: ["rgba(255, 206, 86, 0.2)"],
        backgroundColor: [
          "rgba(0, 206, 86, 1)",
          "rgba(255, 30, 0, 1)",
          "rgba(255, 0, 86, 1)",
          "rgba(0, 70, 256, 1)",
          "rgba(250, 10, 190, 1)",
        ],
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 6,
            stepSize: 1,
          },
        },
      ],
    },
  };

  const career = (data) => {
    for (var i = 0; i < Rep.length; i++) {
      if (data.cluster === Rep[i].index) {
        c1 = Rep[i].careers[0];
        c2 = Rep[i].careers[1];
        c3 = Rep[i].careers[2];
        setLabels([...labels, c1, c2, c3]);
      }
    }
  };

  const personaltits = (data) => {
    for (var i = 0; i < Rep.length; i++) {
      if (data.cluster === Rep[i].index) {
        p1 = Rep[i].personalities[0];
        p2 = Rep[i].personalities[1];
        p3 = Rep[i].personalities[2];
        p4 = Rep[i].personalities[3];
        p5 = Rep[i].personalities[4];
        setInterests([...interests, p1, p2, p3, p4, p5]);
      }
    }
  };

  const mcqSelect = (label) => {
    if (q_no + 1 === 50) {
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
        backgroundColor: "#6c8495",
        padding: 15,
        marginBottom: 7,
        borderRadius: 10,
      }}
    >
      <p style={{ color: "#fff", fontWeight: "bold" }}>
        {name + ")  " + option}
      </p>
    </div>
  );

  return comp ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#eee",
        height: 570,
      }}
    >
      <div
        style={{
          width: "47%",
          height: "85%",
          backgroundColor: "#fff",
          padding: 30,
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ProgressBar
            completed={(q_no + 1) * 2}
            bgColor="#00456d"
            height="17px"
            width="560px"
            baseBgColor="#e0e0de"
            labelAlignment="center"
            labelColor="#fff"
            labelSize="12px"
            transitionDuration="1s"
            transitionTimingFunction="ease-in-out"
          />
          <p style={{ fontWeight: "bold", color: "#00456d" }}>
            {q_no + 1} / 50
          </p>
        </div>
        <p
          style={{
            paddingTop: 30,
            paddingBottom: 30,
            fontSize: "20px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {Questions[q_no]}
        </p>
        <div style={{ width: "100%", height: "65%" }}>
          {Answers.map((item) => (
            <Item label={item.label} name={item.name} option={item.option} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p style={{ color: note ? "red" : "#fff" }}>
            Note: You have to answer all 50 questions
          </p>
          <div
            style={{
              width: "30%",
              padding: 15,
              backgroundColor: visible ? "#d3d3d3" : "#00456d",
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              visible ? setNote(true) : sendCred();
            }}
          >
            <h4
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 17,
                cursor: "pointer",
              }}
            >
              Finish
            </h4>
          </div>
        </div>
      </div>
    </div>
  ) : //  ------------------------------------------------RESULT-----------------------------------------------------
  isLoading ? (
    <div style={{ width: "100%", height: 2250 }}>
      <div
        style={{
          width: "100%",
          height: 500,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Img2} alt={Img2} width="300" height="300" />
          <h1 style={{ color: "#1c2237", padding: 20 }}>Your Ideal Careers</h1>
          <p style={{ paddingBottom: 100, fontSize: 16 }}>
            Here is the graphical representation of MUHAMMAD HARIS's Ideal
            Careers on the interest Level
          </p>
        </div>
        <div style={{ width: 540, height: 440, marginTop: 100 }}>
          <Bar data={careerData} options={options} />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 500,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#fff",
        }}
      >
        {/* <p>RESULT: {ansArray.toString(10).split("")}</p> */}
        <div style={{ width: 440, height: 440, padding: 30 }}>
          <Doughnut data={personalityData} options={options} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Img1} alt={Img1} width="300" height="300" />
          <h1 style={{ color: "#1c2237", padding: 20 }}>
            Your Interest Scores
          </h1>
          <p style={{ paddingBottom: 100, fontSize: 16 }}>
            Here is the graphical representation of MUHAMMAD HARIS's profile
            based on the interest Level
          </p>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 500,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#f7f7f7",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Img3} alt={Img3} width="300" height="300" />
          <h1 style={{ color: "#1c2237", padding: 20 }}>Your Interests</h1>
          <p style={{ paddingBottom: 100, fontSize: 16 }}>
            Here is the graphical representation of MUHAMMAD HARIS's Personality
            based on the interest Level
          </p>
        </div>
        <div style={{ width: 570, height: 500, padding: 30 }}>
          <Line data={intrestsData} options={options} />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 500,
          backgroundColor: "#f7f7f7",
        }}
      >
        <Recommendation />
      </div>
    </div>
  ) : (
    <div>
      <h1>Loading......</h1>
    </div>
  );
}

export default QnACard;
