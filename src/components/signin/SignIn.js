import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import main from "../../Images/main.png";
import logo from "../../Images/navbar_logo.png";
import Spinner from "react-spinner-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignIn.css";
const SignIn = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
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

  const signInHandler = async (e) => {
    e.preventDefault();
    setDisplay(true);
    const res = await fetch(
      "https://homestyle-ecommerce-backend.onrender.com/signIn",
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
      localStorage.setItem("token", data.token);
      navigate("/");
    }
  };

  const inputHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const goToSignUpPage = () => {
    navigate("/signup");
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
          <div className="signInMiddle">
            <div>
              <h1 className="signInHeading">Sign In</h1>
              <form onSubmit={signInHandler}>
                <input
                  type="text"
                  name="email"
                  value={details.email}
                  onChange={inputHandler}
                  placeholder="Email"
                  className="signInInputFields"
                />
                <br />
                <br />
                <input
                  type="password"
                  name="password"
                  value={details.password}
                  onChange={inputHandler}
                  placeholder="Password"
                  className="signInInputFields"
                />
                <br />
                <br />
                {(() => {
                  if (!display) {
                    return (
                      <>
                        <input
                          type="submit"
                          value="Sign In"
                          className="signInSubmit"
                        />
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
              <div className="signInNewOuter">
                <div className="signInNewCorner">
                  <div className="signInNewLine"></div>
                </div>
                <div className="signInNew">
                  <p className="signInNewHeading">New to Homestyle?</p>
                </div>
                <div className="signInNewCorner">
                  <div className="signInNewLine"></div>
                </div>
              </div>

              <div onClick={goToSignUpPage} className="signInAccountOuter">
                <p className="signInAccountInner">Create an Account</p>
              </div>
            </div>
          </div>
          <div className="signInBottom">
            <div>
              <p className="signInPara">
                "Shop Home Decor and Make Every Corner a Masterpiece."
              </p>
              <div className="signInHrOuter">
                <div className="signInHrInner"></div>
              </div>
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

export default SignIn;
