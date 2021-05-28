import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";
import logo from "../../assets/logo_transparent.png";

const Sidebar = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginCred = async () => {
    fetch("http://localhost:3001/adminSignin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
           var items = {
             adminId: data[0],
             token: data[1],
           };

           localStorage.setItem("item", JSON.stringify(items));
           data[1] === "undefined"
             ? history.push("/")
             : history.push("/dashboard");
        } catch (e) {
          console.log(e);
        }
      });
  };

  const handlePassword = (e) => {
    console.log("Password: " + e.target.value);
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log("Email: " + e.target.value);
  };

  const handleLogin = (e) => {
    console.log(email, password);
    e.preventDefault();
    loginCred();
  };

  return (
    <Container>
      <LogoWrapper>
        <img src={logo} alt="logo" />
      </LogoWrapper>
      <Form onSubmit={handleLogin}>
        <div>
          <h3>
            <span style={{ color: "#5dc399" }}>Admin</span> Login
          </h3>
        </div>
        <Input onChange={handleEmail} type="email" placeholder="Email" />
        <Input
          onChange={handlePassword}
          type="password"
          placeholder="Password"
        />
        <button>Sign In</button>
      </Form>
      <div>
        <Terms>
          By signing up, I agree to the Privacy Policy <br /> and Terms of
          Service
        </Terms>
        <h4>Don't have an account? Sign Up</h4>
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
