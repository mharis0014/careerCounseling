import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";
import logo from "../assets/logo_transparent.png";

const Sidebar = () => {
  const history = useHistory();
  const [toggle, setToggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleMail = (e) => {
    setMail(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const userLoginCred = async (props) => {
    fetch("http://localhost:3001/userSignin", {
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
          console.log(data[3]);
          var items = {
            userId: data[0],
            userName: data[1],
            userEmail: data[2],
            token: data[3],
          };

          if (data[3] === undefined) {
            history.push("/login");
          } else {
            localStorage.setItem("item", JSON.stringify(items));
            history.push("/");
            window.location.reload();
          }
        } catch (e) {
          console.log(e);
        }
      });
  };

  const userSignupCred = async () => {
    fetch("http://localhost:3001/userSignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: mail,
        password: pass,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          console.log(data);
          if (data === undefined) {
            history.push("/login");
          } else {
            setToggle(!toggle);
          }
        } catch (e) {
          console.log(e);
        }
      });
  };

  const handleUserSignup = (e) => {
    e.preventDefault();
    userSignupCred();
  };

  const handleUserLogin = (e) => {
    console.log(email, password);
    e.preventDefault();
    userLoginCred();
  };

  return toggle ? (
    <Container>
      <LogoWrapper>
        <div style={{ marginTop: 30, marginBottom: -30 }}>
          <img src={logo} alt="logo" />
        </div>
      </LogoWrapper>
      <Form onSubmit={handleUserLogin}>
        <div>
          <h3>
            <span style={{ color: "#5dc399" }}>User</span> Login
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
        <h4>
          Don't have an account?{" "}
          <span onClick={() => setToggle(!toggle)}>Sign Up</span>
        </h4>
      </div>
    </Container>
  ) : (
    <Container>
      <LogoWrapper>
        <div style={{ marginTop: 30, marginBottom: -30 }}>
          <img src={logo} alt="logo" />
        </div>
      </LogoWrapper>
      <Form onSubmit={handleUserSignup}>
        <div>
          <h3>
            <span style={{ color: "#5dc399" }}>User</span> Register
          </h3>
        </div>
        <Input onChange={handleName} placeholder="Name" />
        <Input onChange={handleMail} type="email" placeholder="Email" />
        <Input onChange={handlePass} type="password" placeholder="Password" />
        <button>Sign Up</button>
      </Form>
      <div>
        <Terms>
          By signing up, I agree to the Privacy Policy <br /> and Terms of
          Service
        </Terms>
        <h4>
          Already have an account?{" "}
          <span onClick={() => setToggle(!toggle)}>Sign In</span>
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
    font-size: 26px;
    margin-left:
    margin-bottom: 10px;
  }

  button {
    width: 80%;
    max-width: 330px;
    min-width: 300px;
    height: 55px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #f00946;
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
    height: 10rem;
    padding-left: 14px;
  }

  h3 {
    color: #ff8d8d;
    text-align: center;
    font-size: 26px;
  }

  span {
    color: #5dc399;
    font-weight: 300;
    font-size: 24px;
  }
`;

const Container = styled.div`
  min-width: 620px;
  background-color: "#1c2237";
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
      color: #f00946;
      cursor: pointer;
    }
  }
`;
export default Sidebar;
