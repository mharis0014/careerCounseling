import React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <Container>
      <h1
        style={{ marginLeft: "650px", marginBottom: "600px", fontSize: "50px" }}
      >
        <span style={{color: 'red'}}>Career</span> Finder
      </h1>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 80px;
    font-weight: 900;
    color: #343434;

    @media (max-width: 900px) {
      display: none;
    }
  }
`;

export default Main;
