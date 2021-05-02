import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/logo_transparent.png";
import Input from "./Input";

const Sidebar = (props) => {
  const [toggle, setToggle] = useState(true);

  return toggle ? (
    <Container>
      <LogoWrapper>
        <img src={logo} alt="" />
      </LogoWrapper>
      <Form>
        <div>
          <h3>
            <span style={{ color: "#5dc399" }}>User</span> Register
            <span
              onClick={() => setToggle(!toggle)}
              style={{
                marginLeft: "70px",
                fontWeight: "normal",
                fontSize: 20,
                color: "#888",
                cursor: "pointer",
              }}
            >
              are you a Counselor ?
            </span>
          </h3>
        </div>
        <Input placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <button onClick={() => {}}>Sign Up</button>
      </Form>
      <div>
        <Terms>
          By signing up, I agree to the Privacy Policy <br /> and Terms of
          Service
        </Terms>
        <h4>
          Already have an account? <span>Sign In</span>
        </h4>
      </div>
    </Container>
  ) : (
    <Container>
      <LogoWrapper>
        <img src={logo} alt="" />
      </LogoWrapper>
      <Form>
        <div>
          <h3>
            <span style={{ color: "#5dc399" }}>Counselor</span> Register
            <span
              onClick={() => setToggle(!toggle)}
              style={{
                marginLeft: "40px",
                fontWeight: "normal",
                fontSize: 20,
                color: "#888",
                cursor: "pointer",
              }}
            >
              not a Counselor ?
            </span>
          </h3>
        </div>
        <Input placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Input type="text" placeholder="Education" />
        <Input type="text" placeholder="About" />
        <Input type="password" placeholder="Password" />
        <button>Sign Up</button>
      </Form>
      <div>
        <Terms>
          By signing up, I agree to the Privacy Policy <br /> and Terms of
          Service
        </Terms>
        <h4>
          Already have an account? <span>Sign In</span>
        </h4>
      </div>
    </Container>
  );
};

const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 13px;
  color: #808080;
  font-weight: 300;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: #666666;
    font-size: 25px;
    margin-left:
    margin-bottom: 10px;
  }

  button {
    width: 75%;
    max-width: 400px;
    min-width: 250px;
    height: 55px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #70edb9;
    color: #fff;
    font-weight: 600;
    font-size: 17px;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const LogoWrapper = styled.div`
  img {
    height: 12rem;
    padding-left: 15px;
  }

  h3 {
    color: #ff8d8d;
    text-align: center;
    font-size: 28px;
  }

  span {
    color: #5dc399;
    font-weight: 300;
    font-size: 24px;
  }
`;

const Container = styled.div`
  min-width: 550px;
  backdrop-filter: blur(35px);
  background-color: rgba(255, 255, 255, 0.8);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 900px) {
    width: 100vw;
    position: absolute;
    padding: 0;
  }

  h4 {
    color: #808080;
    font-weight: bold;
    font-size: 17px;
    margin-top: 2rem;

    span {
      color: #ff8d8d;
      cursor: pointer;
    }
  }
`;

export default Sidebar;
