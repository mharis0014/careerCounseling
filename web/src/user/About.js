import React from "react";
import web from "../images/img1sq.jpg";
import Common from "../components/main/Common";
import Navbar from "../components/main/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <Common
        name="Welcome to About page"
        imgsrc={web}
        visit="/counselors"
        visit2="/contact"
        btnname="Seek Advice"
        btnnametwo="Contact Now"
      />
    </>
  );
};

export default About;
