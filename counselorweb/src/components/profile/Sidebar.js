import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";
import logo from "../../assets/logo_transparent.png";
import FolderIcon from "../../assets/folder_icon_transparent.png";
import CloseIcon from "../../assets/CloseIcon.svg";
import { BoxUpload, ImagePreview } from "./style/index";

const Sidebar = () => {
  const history = useHistory();
  const [toggle, setToggle] = useState(true);
  // counselor login hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // counselor register hooks
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [education, setEducation] = useState("");
  const [about, setAbout] = useState("");
  const [pass, setPass] = useState("");
  const [image, setImage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePass = (e) => {
    setPass(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleMail = (e) => {
    setMail(e.target.value);
  };
  const handleEducation = (e) => {
    setEducation(e.target.value);
  };
  const handleAbout = (e) => {
    setAbout(e.target.value);
  };

  const counselorLoginCred = async (props) => {
    fetch("http://localhost:3001/counselorSignin", {
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
            counselorId: data[0],
            token: data[1],
          };
          if (data[1] === undefined) {
            history.push("/");
          } else {
            localStorage.setItem("citem", JSON.stringify(items));
            history.push("/dashboard");
            window.location.reload();
          }
        } catch (e) {
          console.log(e);
        }
      });
  };

  const counselorSignupCred = async () => {
    fetch("http://localhost:3001/counselorSignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileList: image,
        name: name,
        email: mail,
        education: education,
        about: about,
        password: pass,
        status: "requested",
        ratingAndFeedback: [],
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          console.log(data);
          await localStorage.setItem("item", {
            counselorId: data[0],
            token: data[1],
          });
          if (data === undefined) {
            history.push("/login");
          } else {
            setToggle(!toggle);
            window.location.reload();
          }
        } catch (e) {
          console.log(e);
        }
      });
  };

  const handelCounselorSignup = (e) => {
    e.preventDefault();
    counselorSignupCred();
  };

  const handelCounselorLogin = (e) => {
    console.log(email, password);
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
        const slicedImage = imgSrc.slice(23);

        setImage({
          contentType: "image/png",
          data: slicedImage,
        });

        setIsUploaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return toggle ? (
    <Container>
      <LogoWrapper>
        <img src={logo} alt="logo" />
      </LogoWrapper>
      <Form onSubmit={handelCounselorLogin}>
        <div>
          <h3>
            <span style={{ color: "#5dc399" }}>Counselor</span> Login
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
      <Form onSubmit={handelCounselorSignup}>
        <div>
          <h3>
            <span style={{ color: "#5dc399" }}>Counselor</span> Register
          </h3>
        </div>
        <Input onChange={handleName} placeholder="Name" />
        <Input onChange={handleMail} type="email" placeholder="Email" />
        <Input onChange={handleEducation} type="text" placeholder="Education" />
        <Input onChange={handleAbout} type="text" placeholder="About" />
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
          <span onClick={() => setToggle(!toggle)}>Sign Up</span>
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
