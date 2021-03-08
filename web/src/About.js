import React from "react";
import web from "../src/images/img1sq.jpg";
import Common from "../src/components/Common";

const About = () => {
  return (
    <>
      <Common
        name="Welcome to About page"
        imgsrc={web}
        visit="/contact"
        btnname="Seek Advice"
        btnnametwo="Contact Now"
      />
    </>
  );
};

export default About;
