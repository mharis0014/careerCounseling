import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import "./index.css";
import "./components/styles.css";

const Service = () => {
  const [arrayData, setArrayData] = useState([]);

  async function fetchData() {
    const response = await fetch("http://localhost:3001/getData");
    const data = await response.json();
    setArrayData(data);
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="my-5">
        <h1 className="text-center"> Our Counselors </h1>
      </div>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row gy-4">
              {arrayData.map((val, ind) => {
                return (
                  <Card
                    key={ind}
                    imgsrc={`data:image/jpeg;base64,${val.imageData}`}
                    title={val.name}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
