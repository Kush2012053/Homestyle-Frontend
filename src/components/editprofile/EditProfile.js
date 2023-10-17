import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
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
              <input
                type="submit"
                value="Update"
                className="editProfileSubmit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
