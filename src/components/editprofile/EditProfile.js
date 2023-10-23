import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-spinner-material";
import "./EditProfile.css";

const EditProfile = () => {
  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [display, setDisplay] = useState(false);
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
        alert(data.message);
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
        alert(data.message);
      }
    };
    checkSignIn();
  }, []);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setDisplay(true);
    const res = await fetch(
      "https://homestyle-ecommerce-backend.onrender.com/updateProfile",
      {
        method: "PATCH",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );
    const data = await res.json();
    alert(data.message);
    setDisplay(false);
  };

  const inputHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="editProfileOuterDiv">
        <div className="editProfileInnerDiv">
          <h1 className="editProfileHeading">Update Profile</h1>
          <br />
          <form className="editProfileForm" onSubmit={updateProfileHandler}>
            <div>
              <input
                type="text"
                name="fullName"
                value={details.fullName}
                onChange={inputHandler}
                placeholder="Name"
                className="editProfileInputFields"
              />
              <br />
              <br />
              <input
                type="text"
                name="email"
                value={details.email}
                onChange={inputHandler}
                placeholder="Email"
                className="editProfileInputFields"
              />
              <br />
              <br />
              <input
                type="text"
                name="phoneNumber"
                value={details.phoneNumber}
                onChange={inputHandler}
                placeholder="Phone Number"
                className="editProfileInputFields"
              />
              <br />
              <br />
              {(() => {
                  if (!display) {
                    return (
                      <>
                        <input
                type="submit"
                value="Update"
                className="editProfileSubmit"
              />
                      </>
                    );
                  } else {
                    return (
                      <>
                      <div className="editProfileLoaderDiv">
                        <button style={{backgroundColor: "white", border: "none"}}>
                        <Spinner
                  radius={30}
                  color={"#ff7a7a"}
                  stroke={4}
                  visible={true}
                />
                        </button>
                        </div>
                      </>
                    );
                  }
                })()}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
