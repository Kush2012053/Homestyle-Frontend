import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Spinner from "react-spinner-material";
import "./ShippingDetails.css";

const ShippingDetails = () => {
  const [details, setDetails] = useState({
    address: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    country: "",
    state: "",
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
        if (data.data.shippingDetails.length !== 0) {
          setDetails(data.data.shippingDetails[0]);
        }
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

  const storeShippingDetailsHandler = async (e) => {
    e.preventDefault();
    setDisplay(true);
    const res = await fetch(
      "https://homestyle-ecommerce-backend.onrender.com/storeShippingDetails",
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
    if (data.status === 200) {
      setDisplay(false);
      navigate("/confirmorder");
    } else {
      alert(data.message);
      setDisplay(false);
    }
  };

  const inputHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="shippingDetailsOuterDiv">
        <div className="shippingDetailsInnerDiv">
          <div className="shippingDetailsIcon">
            <div className="shippingDetailsCommon">
              <LocalShippingIcon
                style={{ fontSize: "26px", color: "#ff7a7a" }}
              />
            </div>
            <div className="shippingDetailsCommonUpper">
              <p className="shippingDetailsHeadline shippingDetailsColor">
                Shipping Details
              </p>
            </div>
          </div>
          <div className="shippingDetailsLine">
            <div className="shippingDetailsCommon1"></div>
            <div className="shippingDetailsCommon2"></div>
          </div>
          <div className="shippingDetailsIcon">
            <div className="shippingDetailsCommon">
              <LibraryAddCheckIcon style={{ fontSize: "26px" }} />
            </div>
            <div className="shippingDetailsCommonUpper">
              <p className="shippingDetailsHeadline">Confirm Order</p>
            </div>
          </div>
          <div className="shippingDetailsLine">
            <div className="shippingDetailsCommon1"></div>
            <div className="shippingDetailsCommon2"></div>
          </div>
          <div className="shippingDetailsIcon">
            <div className="shippingDetailsCommon">
              <AccountBalanceIcon style={{ fontSize: "26px" }} />
            </div>
            <div className="shippingDetailsCommonUpper">
              <p className="shippingDetailsHeadline">Payment</p>
            </div>
          </div>
        </div>
      </div>
      <div className="shippingDetailsDiv">
        <div>
          <h1 className="shippingDetailsHeading">Shipping Details</h1>
          <br />
          <form onSubmit={storeShippingDetailsHandler}>
            <input
              type="text"
              name="address"
              value={details.address}
              onChange={inputHandler}
              placeholder="Address"
              className="shippingDetailsInputFields"
            />
            <br />
            <br />
            <input
              type="text"
              name="city"
              value={details.city}
              onChange={inputHandler}
              placeholder="City"
              className="shippingDetailsInputFields"
            />
            <br />
            <br />
            <input
              type="text"
              name="pincode"
              value={details.pincode}
              onChange={inputHandler}
              placeholder="Pin Code"
              className="shippingDetailsInputFields"
            />
            <br />
            <br />
            <input
              type="text"
              name="phoneNumber"
              value={details.phoneNumber}
              onChange={inputHandler}
              placeholder="Phone Number"
              className="shippingDetailsInputFields"
            />
            <br />
            <br />
            <input
              type="text"
              name="country"
              value={details.country}
              onChange={inputHandler}
              placeholder="Country"
              className="shippingDetailsInputFields"
            />
            <br />
            <br />
            <input
              type="text"
              name="state"
              value={details.state}
              onChange={inputHandler}
              placeholder="State"
              className="shippingDetailsInputFields"
            />
            <br />
            <br />
            {(() => {
                  if (!display) {
                    return (
                      <>
                        <input
              type="submit"
              value="Continue"
              className="shippingDetailsSubmit"
            />
                      </>
                    );
                  } else {
                    return (
                      <>
                      <div className="shippingDetailsLoaderDiv">
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
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingDetails;
