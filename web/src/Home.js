import React from "react";
import web from "../src/images/img2sq.jpg";
import Common from '../src/components/Common';

const Home = () => {
  return (
    <>
      <Common
        name="Your Career Is Your Life"
        imgsrc={web}
        visit="/counselors"
        btnname="Seek Advice Now"
        btnnametwo="Find Counselors"
      />
    </>
  );
};

export default Home;
