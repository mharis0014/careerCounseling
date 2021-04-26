import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";
import logo from "../../images/logo_transparent.png";
import FolderIcon from "../../images/folder_icon_transparent.png";
import CloseIcon from "../../images/CloseIcon.svg";
import { BoxUpload, ImagePreview } from "./style";

const Sidebar = () => {
  const history = useHistory();
  const [toggle, setToggle] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [signedIn, setSignedIn] = useState(true);
  // user login hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // user register hooks
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  // counselor login hooks
  const [emailc, setEmailc] = useState("");
  const [passwordc, setPasswordc] = useState("");
  // counselor register hooks
  const [namec, setNamec] = useState("");
  const [mailc, setMailc] = useState("");
  const [education, setEducation] = useState("");
  const [about, setAbout] = useState("");
  const [passc, setPassc] = useState("");
  const [image, setImage] = useState({});
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState("");

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
          localStorage.setItem("token", data.token);
          console.log(localStorage.getItem("token"));
          localStorage.getItem("token") === "undefined"
            ? history.push("/login")
            : history.push("/");
        } catch (e) {
          console.log(e);
        }
      });
  };

  const userSignupCred = async (props) => {
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
          console.log(data.token);
          await localStorage.setItem("token", data.token);
          console.log(localStorage.getItem("token"));
          history.push("/");
        } catch (e) {
          console.log(e);
        }
      });
  };

  const counselorLoginCred = async (props) => {
    fetch("http://localhost:3001/counselorSignin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailc,
        password: passwordc,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          localStorage.setItem("token", data.token);
          console.log(localStorage.getItem("token"));
          localStorage.getItem("token") === "undefined"
            ? history.push("/login")
            : history.push("/");
        } catch (e) {
          console.log(e);
        }
      });
  };
  const counselorSignupCred = async (props) => {
    fetch("http://localhost:3001/counselorSignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileList: image,
        name: namec,
        email: mailc,
        education: education,
        about: about,
        password: passc,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          console.log(data.token);
          await localStorage.setItem("token", data.token);
          console.log(localStorage.getItem("token"));
          history.push("/");
        } catch (e) {
          console.log(e);
        }
      });
  };

  const handelName = (e) => {
    setName(e.target.value);
  };
  const handelMail = (e) => {
    setMail(e.target.value);
  };
  const handelPass = (e) => {
    setPass(e.target.value);
  };
  const handelEmail = (e) => {
    setEmail(e.target.value);
  };
  const handelPassword = (e) => {
    setPassword(e.target.value);
  };
  const handelEmailc = (e) => {
    setEmailc(e.target.value);
  };
  const handelPasswordc = (e) => {
    setPasswordc(e.target.value);
  };
  const handelNamec = (e) => {
    setNamec(e.target.value);
  };
  const handelMailc = (e) => {
    setMailc(e.target.value);
  };
  const handelEducation = (e) => {
    setEducation(e.target.value);
  };
  const handelAbout = (e) => {
    setAbout(e.target.value);
  };
  const handelPassc = (e) => {
    setPassc(e.target.value);
  };

  const handelUserSignup = (e) => {
    console.log(name);
    console.log(mail);
    console.log(pass);
    e.preventDefault();
    userSignupCred();
  };

  const handelCounselorSignup = (e) => {
    console.log(namec);
    console.log(mailc);
    console.log(education);
    console.log(about);
    console.log(passc);
    e.preventDefault();
    counselorSignupCred();
  };

  const handelUserLogin = (e) => {
    console.log(email);
    console.log(password);
    e.preventDefault();
    userLoginCred();
  };

  const handelCounselorLogin = (e) => {
    console.log(emailc);
    console.log(passwordc);
    e.preventDefault();
    counselorLoginCred();
  };

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      let reader = new FileReader();
      reader.onload = function (e) {
        // setImage(e.target.result);
        const imgSrc = e.target.result;
        const fileList = {
          contentType: "image/jpg",
          data: imgSrc,
        };
        setImage(fileList);
        setIsUploaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return toggle ? (
    <Container>
      <LogoWrapper>
        <BoxUpload>
          <div className="image-upload">
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={FolderIcon}
                    draggable={"false"}
                    alt="placeholder"
                    style={{ width: 100, height: 100 }}
                  />
                  <p style={{ color: "#444" }}>Click to upload image</p>
                </label>

                <input
                  id="upload-input"
                  type="file"
                  accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              <ImagePreview>
                <img
                  className="close-icon"
                  src={CloseIcon}
                  alt="CloseIcon"
                  onClick={() => {
                    setIsUploaded(false);
                    setImage(null);
                  }}
                />
                {typeFile.includes("video") ? (
                  <video
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    controls
                    autoPlay
                    alt="uploaded-img"
                  />
                ) : (
                  <img
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    alt="uploaded-img"
                  />
                )}
              </ImagePreview>
            )}
          </div>
        </BoxUpload>
      </LogoWrapper>
      {signedIn ? (
        <>
          <Form onSubmit={handelUserSignup}>
            <div>
              <h3>
                <span style={{ color: "#5dc399" }}>User</span> Register
                <span
                  onClick={() => setToggle(!toggle)}
                  style={{
                    marginLeft: "45px",
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
            <Input onChange={handelName} placeholder="Full Name" />
            <Input onChange={handelMail} type="email" placeholder="Email" />
            <Input
              onChange={handelPass}
              type="password"
              placeholder="Password"
            />
            <button>Sign Up</button>
          </Form>
          <div>
            <Terms>
              By signing up, I agree to the Privacy Policy <br /> and Terms of
              Service
            </Terms>
            <h4>
              Already have an account?{" "}
              <span onClick={() => setSignedIn(!signedIn)}>Sign In</span>
            </h4>
          </div>
        </>
      ) : (
        <>
          <Form onSubmit={handelUserLogin}>
            <div>
              <h3>
                <span style={{ color: "#5dc399" }}>User</span> Login
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
            <Input onChange={handelEmail} type="email" placeholder="Email" />
            <Input
              onChange={handelPassword}
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
              <span onClick={() => setSignedIn(!signedIn)}>Sign Up</span>
            </h4>
          </div>
        </>
      )}
    </Container>
  ) : (
    <Container>
      <LogoWrapper>
        <BoxUpload>
          <div className="image-upload">
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={FolderIcon}
                    draggable={"false"}
                    alt="placeholder"
                    style={{ width: 100, height: 100 }}
                  />
                  <p style={{ color: "#444" }}>Click to upload image</p>
                </label>

                <input
                  id="upload-input"
                  type="file"
                  accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              <ImagePreview>
                <img
                  className="close-icon"
                  src={CloseIcon}
                  alt="CloseIcon"
                  onClick={() => {
                    setIsUploaded(false);
                    setImage(null);
                  }}
                />
                {typeFile.includes("video") ? (
                  <video
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    controls
                    autoPlay
                    alt="uploaded-img"
                  />
                ) : (
                  <img
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    alt="uploaded-img"
                  />
                )}
              </ImagePreview>
            )}
          </div>
        </BoxUpload>
      </LogoWrapper>
      {loggedIn ? (
        <>
          <Form onSubmit={handelCounselorLogin}>
            <div>
              <h3>
                <span style={{ color: "#5dc399" }}>Counselor</span> Login
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
                  not a Counselor ?
                </span>
              </h3>
            </div>
            <Input onChange={handelEmailc} type="email" placeholder="Email" />
            <Input
              onChange={handelPasswordc}
              type="password"
              placeholder="Password"
            />
            <button>Sign Up</button>
          </Form>
          <div>
            <Terms>
              By signing up, I agree to the Privacy Policy <br /> and Terms of
              Service
            </Terms>
            <h4>
              Don't have an account?{" "}
              <span onClick={() => setLoggedIn(!loggedIn)}>Sign Up</span>
            </h4>
          </div>
        </>
      ) : (
        <>
          <Form onSubmit={handelCounselorSignup}>
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
            <Input onChange={handelNamec} placeholder="Name" />
            <Input onChange={handelMailc} type="email" placeholder="Email" />
            <Input
              onChange={handelEducation}
              type="text"
              placeholder="Education"
            />
            <Input onChange={handelAbout} type="text" placeholder="About" />
            <Input
              onChange={handelPassc}
              type="password"
              placeholder="Password"
            />
            <button>Sign Up</button>
          </Form>
          <div>
            <Terms>
              By signing up, I agree to the Privacy Policy <br /> and Terms of
              Service
            </Terms>
            <h4>
              Already have an account?{" "}
              <span onClick={() => setLoggedIn(!loggedIn)}>Sign Up</span>
            </h4>
          </div>
        </>
      )}
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
