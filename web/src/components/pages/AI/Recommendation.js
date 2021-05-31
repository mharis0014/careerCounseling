import React, { useState, useEffect } from "react";
import { Button } from "../../Button";
import "./Recommendation.css";
import { IconContext } from "react-icons/lib";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { MdMessage, MdCall } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { useHistory, withRouter } from "react-router-dom";

function Counselor(props) {
  const [arrayData, setArrayData] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  function dynamicsort(property, order) {
    var sort_order = 1;
    if (order === "desc") {
      sort_order = -1;
    }
    return function (a, b) {
      // a should come before b in the sorted order
      if (a[property] < b[property]) {
        return -1 * sort_order;
        // a should come after b in the sorted order
      } else if (a[property] > b[property]) {
        return 1 * sort_order;
        // a and b are the same
      } else {
        return 0 * sort_order;
      }
    };
  }

  const topRated = () => {
    console.log("array to be sort");
    console.log(arrayData);
    console.log("Sorting based on the Ratings property");
    // console.log(arrayData.sort(dynamicsort("ratingIndex", "desc")));
    // const sortedArray = arrayData.sort(dynamicsort("ratingIndex", "desc"));
    arrayData.sort(dynamicsort("ratingIndex", "desc"));
    console.log("=========SORTED ARRAY============");
      console.log(arrayData);
      setLoading(false);
    // console.log(sortedArray);
    // console.log("=========JSON OBJ LOG============");
    // console.log(Object.assign({}, sortedArray));
    // console.log("=========JSON OBJ LOG VAR============");
    // var jsonObj = Object.assign({}, sortedArray);
    // console.log(jsonObj);
    // setSortedArray(jsonObj);
  };

  async function fetchData() {
    const response = await fetch("http://localhost:3001/getRecomended");
    const data = await response.json();
    setArrayData(data);
    console.log(data);
  }

  useEffect( async () => {
      await fetchData();
      topRated();
  }, []);

  return isLoading ? null : (
    <IconContext.Provider value={{ color: "#fff", size: 64 }}>
      <div className="counselor__section">
        <div className="counselor__wrapper">
          <h1 className="counselor__heading">Recommended Counselors</h1>
          <div className="counselor__container">
            {arrayData.map((counselor, index) => (
              <div key={index} className="counselor__container-card">
                <div className="counselor__container-cardInfo">
                  <img
                    src={`data:image/jpeg;base64,${counselor.counselorImage}`}
                    alt={counselor.counselorImage}
                    height="256"
                    width="280"
                  />
                  <div
                    style={{
                      paddingTop: 20,
                      justifyContent: "space-between",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <h3 style={{ fontSize: 18, marginRight: 20 }}>
                      {counselor.counselorName}
                    </h3>
                    <div style={{ flexDirection: "row", display: "flex" }}>
                      <div
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 5,
                          backgroundColor: "#888",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <MdMessage size="1.3rem" />
                      </div>
                      <div
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 5,
                          backgroundColor: "#888",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 6,
                        }}
                      >
                        <FaVideo size="1.3rem" />
                      </div>
                      <div
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 5,
                          backgroundColor: "#888",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 6,
                        }}
                      >
                        <MdCall size="1.3rem" />
                      </div>
                    </div>
                  </div>
                  <div style={{ flexDirection: "row", marginRight: 140 }}>
                    <AiFillStar size="1.3rem" />
                    <AiFillStar size="1.3rem" />
                    <AiOutlineStar size="1.3rem" />
                    <AiOutlineStar size="1.3rem" />
                    <AiOutlineStar size="1.3rem" />
                  </div>
                  <p style={{ padding: 20, paddingBottom: 0 }}>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has
                    survived not only five centuries, but also the leap into
                    electronic
                  </p>
                  <Button
                    onClick={() =>
                      props.history.push({
                        pathname: "./pricing",
                        data: counselor,
                      })
                    }
                    buttonSize="btn--wide"
                    buttonColor="primary"
                  >
                    Book Apointment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
export default withRouter(Counselor);
