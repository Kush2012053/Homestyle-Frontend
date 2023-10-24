import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-spinner-material";
import main from "../../Images/main.png";
import logo from "../../Images/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUp.css";

const SignUp = () => {
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSignIn = async () => {
      const res = await fetch(
        "https://homestyle-ecommerce-backend.onrender.com/checkSignIn",
        {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.status === 200) {
        navigate("/");
      } else if (data.status === 500) {
        toast(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          style: {
            backgroundColor: "#ff9b9b",
            color: "white",
          },
        });
      }
    };
    checkSignIn();
  }, []);

  const signUpHandler = async (e) => {
    e.preventDefault();
    setDisplay(true);
    const res = await fetch(
      "https://homestyle-ecommerce-backend.onrender.com/signUp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );
    const data = await res.json();
    toast(data.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        backgroundColor: "#ff9b9b",
        color: "white",
      },
    });
    setDisplay(false);
    if (data.status === 200) {
      navigate("/signin");
    }
  };

  const inputHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="signInMainDiv">
        <div className="signInSubDiv1">
          <div className="signInTop">
            <div className="signInLogo">
              <img src={logo} height="100%" width="100%" />
            </div>
          </div>
          <div className="signUpBottom">
            <div>
              <h1 className="signUpHeading">Sign Up</h1>
              <form onSubmit={signUpHandler}>
                <input
                  type="text"
                  name="fullName"
                  value={details.fullName}
                  onChange={inputHandler}
                  placeholder="Full Name"
                  className="signUpInputFields"
                />
                <br />
                <br />
                <input
                  type="text"
                  name="email"
                  value={details.email}
                  onChange={inputHandler}
                  placeholder="Email"
                  className="signUpInputFields"
                />
                <br />
                <br />
                <input
                  type="text"
                  name="phoneNumber"
                  value={details.phoneNumber}
                  onChange={inputHandler}
                  placeholder="Phone Number"
                  className="signUpInputFields"
                />
                <br />
                <br />
                <input
                  type="password"
                  name="password"
                  value={details.password}
                  onChange={inputHandler}
                  placeholder="Password"
                  className="signUpInputFields"
                />
                <br />
                <br />
                <input
                  type="password"
                  name="confirmPassword"
                  value={details.confirmPassword}
                  onChange={inputHandler}
                  placeholder="Confirm Password"
                  className="signUpInputFields"
                />
                <br />
                <br />
                {(() => {
                  if (!display) {
                    return (
                      <>
                        <input type="submit" value="Sign Up" className="signUpSubmit" />
                      </>
                    );
                  } else {
                    return (
                      <>
                        <button style={{backgroundColor: "white", border: "none"}}>
                        <Spinner
                  radius={30}
                  color={"#ff9b9b"}
                  stroke={4}
                  visible={true}
                />
                        </button>
                      </>
                    );
                  }
                })()}
              </form>
            </div>
          </div>
        </div>
        <div className="signInSubDiv2">
          <img src={main} height="100%" width="100%" />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
