import React from "react";
import styled from "styled-components";
import bgImg from "../../assets/svg-1.svg";
import Sidebar from "./Sidebar";
import Main from "./Main";
import {withRouter} from 'react-router-dom'

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <Sidebar />
        <Main />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background: #eefcff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const Wrapper = styled.div`
  background-image: url(${bgImg});
  background-position: 80%;
  background-size: 40%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
`;

export default withRouter(Login);
