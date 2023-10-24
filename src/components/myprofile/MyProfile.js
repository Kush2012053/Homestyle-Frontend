import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MyProfile.css";

const MyProfile = () => {
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDetailsHandler = async () => {
      const res = await fetch(
        "https://homestyle-ecommerce-backend.onrender.com/getUserDetails",
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
        setDetails({
          fullName: data.data.fullName,
          email: data.data.email,
          phoneNumber: data.data.phoneNumber,
        });
      } else {
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
        getUserDetailsHandler();
      } else if (data.status === 401) {
        navigate("/");
      } else {
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

  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const goToEditProfileHandler = () => {
    navigate("/editprofile");
  };

  const goToMyOrdersHandler = () => {
    navigate("/myorders");
  };
  return (
    <>
      <div className="myProfileMainDiv">
        <div className="myProfileTop">
          <div className="myProfileInnerLeft">
            <h3 className="myProfileHeading">My Profile</h3>
          </div>
          <div className="myProfileInnerRight">
            <div>
              <button className="myProfileButton" onClick={goToMyOrdersHandler}>
                My Orders
              </button>
            </div>
          </div>
          <div className="myProfileInnerRight">
            <div>
              <button className="myProfileButton" onClick={logOutHandler}>
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="myProfileBottom">
          <div className="myProfileBox">
            <div className="myProfileEdit">
              <BorderColorIcon
                className="myProfileIcon"
                onClick={goToEditProfileHandler}
              />
            </div>
            <div className="myProfile">
              <h4 className="myProfileH4">Full Name</h4>
              <p className="myProfilePara1">{details.fullName}</p>
              <h4 className="myProfileH4">Email</h4>
              <p className="myProfilePara1">{details.email}</p>
              <h4 className="myProfileH4">Phone Number</h4>
              <p className="myProfilePara2">{details.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MyProfile;
