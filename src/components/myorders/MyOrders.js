import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./MyOrders.css";
const MyOrders = () => {
  const [orderDetails, setOrderDetails] = useState([]);
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
        setOrderDetails(data.data.orderDetails);
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

  const goToOneOrderPage = (orderId) => {
    navigate("/oneorder", { state: { _id: orderId } });
  };

  return (
    <>
      {(() => {
        if (orderDetails.length !== 0) {
          return (
            <>
              <div className="myOrdersOuterDiv">
                <h1 className="myOrdersHeading">Order History</h1>
                <p className="myOrdersPara">
                  Below is a list of all the orders you have completed on our
                  site.
                </p>
                <div className="myOrdersMainDiv">
                  <div className="myOrdersDiv1">
                    <h4>Order ID</h4>
                  </div>
                  <div className="myOrdersDiv2">
                    <h4>Status</h4>
                  </div>
                  <div className="myOrdersDiv2">
                    <h4>Total</h4>
                  </div>
                  <div className="myOrdersDiv3">
                    <h4>View</h4>
                  </div>
                </div>
                <div className="myOrdersInnerDiv">
                  {orderDetails.map((obj) => {
                    return (
                      <>
                        <div className="myOrdersMainBottomDiv">
                          <div className="myOrdersDiv1">
                            <p>{obj.orderId}</p>
                          </div>
                          <div className="myOrdersDiv2">
                            <p>{obj.status}</p>
                          </div>
                          <div className="myOrdersDiv2">
                            <p>{obj.cartDetails.totalPrice}</p>
                          </div>
                          <div className="myOrdersDiv3">
                            <VisibilityIcon
                              style={{ fontSize: "20px" }}
                              className="myOrdersIcon"
                              onClick={() => {
                                goToOneOrderPage(obj.orderId);
                              }}
                            />
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          );
        } else {
          return (
            <>
              <div className="myOrdersEmptyDiv">
                <h1 className="myOrdersEmptyHeading">
                  You currently have no order history. Start shopping now to
                  track your orders!
                </h1>
              </div>
            </>
          );
        }
      })()}
    </>
  );
};

export default MyOrders;
