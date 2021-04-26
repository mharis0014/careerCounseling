import React from "react";
import web from "../images/img2sq.jpg";
import Common from '../components/main/Common';
import Navbar from "../components/main/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Common
        name="Your Career Is Your Life"
        imgsrc={web}
        visit="/counselors"
        visit2="/quiz"
        btnname="Seek Advice Now"
        btnnametwo="Find Counselors"
      />
    </>
  );
};

export default Home;
