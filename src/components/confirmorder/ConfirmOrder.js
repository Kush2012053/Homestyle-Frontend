import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Spinner from "react-spinner-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const [details, setDetails] = useState({});
  const [products, setProducts] = useState([]);
  const [shippingDetails, setShippingDetails] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
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
        setDetails(data.data);
        setProducts(data.data.cartDetails.products);
        setShippingDetails(data.data.shippingDetails[0]);
        setTotalPrice(data.data.cartDetails.totalPrice);
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

  const checkoutHandler = async () => {
    setDisplay(true);
    const response = await fetch(
      "https://homestyle-ecommerce-backend.onrender.com/getKey",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data_response = await response.json();

    const res = await fetch(
      "https://homestyle-ecommerce-backend.onrender.com/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalPrice,
        }),
      }
    );
    const data = await res.json();
    if (data.status === 500) {
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
    setDisplay(false);

    var options = {
      key: data_response.key,
      amount: data.data.amount,
      currency: "INR",
      name: "Homestyle",
      order_id: data.data.id,
      handler: async function (response) {
        const res = await fetch(
          "https://homestyle-ecommerce-backend.onrender.com/paymentVerification",
          {
            method: "POST",
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
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
        if (data.status === 200) {
          navigate("/");
        }
      },
      prefill: {
        name: details.fullName,
        email: details.email,
        contact: details.phoneNumber,
      },
      notes: {
        address: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.country} - ${shippingDetails.pincode}`,
      },
      theme: {
        color: "#ff9b9b",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <div className="confirmOrderOuterDiv">
        <div className="confirmOrderInnerDiv">
          <div className="confirmOrderIcon">
            <div className="confirmOrderCommon">
              <LocalShippingIcon
                style={{ fontSize: "26px", color: "#ff9b9b" }}
              />
            </div>
            <div className="confirmOrderCommonUpper">
              <p className="confirmOrderHeadline  confirmOrderColor">
                Shipping Details
              </p>
            </div>
          </div>
          <div className="confirmOrderLine">
            <div className="confirmOrderCommon1 confirmOrderBorderColor"></div>
            <div className="confirmOrderCommon2 confirmOrderBorderColor"></div>
          </div>
          <div className="confirmOrderIcon">
            <div className="confirmOrderCommon">
              <LibraryAddCheckIcon
                style={{ fontSize: "26px", color: "#ff9b9b" }}
              />
            </div>
            <div className="confirmOrderCommonUpper">
              <p className="confirmOrderHeadline  confirmOrderColor">
                Confirm Order
              </p>
            </div>
          </div>
          <div className="confirmOrderLine">
            <div className="confirmOrderCommon1"></div>
            <div className="confirmOrderCommon2"></div>
          </div>
          <div className="confirmOrderIcon">
            <div className="confirmOrderCommon">
              <AccountBalanceIcon style={{ fontSize: "26px" }} />
            </div>
            <div className="confirmOrderCommonUpper">
              <p className="confirmOrderHeadline">Payment</p>
            </div>
          </div>
        </div>
      </div>
      <div className="confirmOrderMainDiv">
        <div className="confirmOrderLeftDiv">
          <div className="confirmOrderLeft">
            <h3 className="confirmOrderInfo">Shipping Info</h3>
            <h4 className="confirmOrderLarge">
              Name:{" "}
              <span className="confirmOrderSmall">{details.fullName}</span>
            </h4>
            <h4 className="confirmOrderLarge">
              Phone:{" "}
              <span className="confirmOrderSmall">{details.phoneNumber}</span>
            </h4>
            <h4 className="confirmOrderLarge">
              Address:{" "}
              <span className="confirmOrderSmall">
                {shippingDetails.address}, {shippingDetails.city},{" "}
                {shippingDetails.state}, {shippingDetails.country} -{" "}
                {shippingDetails.pincode}
              </span>
            </h4>
            <h4 className="confirmOrderCart">Your Cart Items:</h4>
            <div className="confirmOrderCartItems">
              {products.map((obj) => {
                return (
                  <>
                    <div className="confirmOrderEachCart">
                      <div className="confirmOrderEachLeft">
                        <img src={obj.imageUrl} height="100%" width="100%" />
                      </div>
                      <div className="confirmOrderEachRight1">
                        <p className="confirmOrderParaCart">{obj.name}</p>
                      </div>
                      <div className="confirmOrderEachRight2">
                        <p className="confirmOrderParaCart">
                          {obj.quantity} * &#8377;{obj.price} = &#8377;{" "}
                          {obj.quantity * obj.price}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="confirmOrderRightDiv">
          <div className="confirmOrderRight">
            <h3 className="confirmOrderSummary">Total</h3>
            <div className="confirmOrderOuter">
              <div className="confirmOrderInnerLeft">
                <p className="confirmOrderPara">Subtotal:</p>
              </div>
              <div className="confirmOrderInnerRight">
                <p className="confirmOrderPara">&#8377; {totalPrice}</p>
              </div>
            </div>
            <div className="confirmOrderOuter">
              <div className="confirmOrderInnerLeft">
                <p className="confirmOrderPara">Shipping Charges:</p>
              </div>
              <div className="confirmOrderInnerRight">
                <p className="confirmOrderPara">&#8377; 0</p>
              </div>
            </div>
            <div className="confirmOrderDiv"></div>
            <div className="confirmOrderOuter">
              <div className="confirmOrderInnerLeft">
                <p className="confirmOrderPara">Total:</p>
              </div>
              <div className="confirmOrderInnerRight">
                <p className="confirmOrderPara">&#8377; {totalPrice}</p>
              </div>
            </div>
            <div className="confirmOrderButtonDiv">
            {(() => {
                  if (!display) {
                    return (
                      <>
                        <button className="confirmOrderButton" onClick={checkoutHandler}>
                Proceed To Payment
              </button>
                      </>
                    );
                  } else {
                    return (
                      <>
                      <div className="confirmOrderLoaderDiv">
                        <button style={{backgroundColor: "white", border: "none"}}>
                        <Spinner
                  radius={30}
                  color={"#ff9b9b"}
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
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ConfirmOrder;
