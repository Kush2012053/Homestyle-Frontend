import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OneOrder.css";

const OneOrder = () => {
  const [details, setDetails] = useState({});
  const [products, setProducts] = useState([]);
  const [shippingDetails, setShippingDetails] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getOneOrderDetails = async () => {
      const res = await fetch(
        `https://homestyle-ecommerce-backend.onrender.com/getOneOrderDetails/${location.state._id}`,
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
        setShippingDetails(data.data.shippingDetails);
        setTotalPrice(data.data.cartDetails.totalPrice);
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
        getOneOrderDetails();
      } else if (data.status === 401) {
        navigate("/");
      } else {
        alert(data.message);
      }
    };
    checkSignIn();
  }, []);
  return (
    <>
      <div className="oneOrderIdOuterDiv">
        <div className="oneOrderIdInnerDiv">
          <h3 className="oneOrderInfo">Order Summary</h3>
          <h4 className="oneOrderLarge">
            Order ID: <span className="oneOrderSmall">{details.orderId}</span>
          </h4>
          <h4 className="oneOrderLarge">
            Placed: <span className="oneOrderSmall">{details.createdAt}</span>
          </h4>
        </div>
      </div>
      <div className="oneOrderMainDiv">
        <div className="oneOrderLeftDiv">
          <div className="oneOrderLeft">
            <h3 className="oneOrderInfo">Shipping Info</h3>
            <h4 className="oneOrderLarge">
              Name: <span className="oneOrderSmall">{details.fullName}</span>
            </h4>
            <h4 className="oneOrderLarge">
              Phone:{" "}
              <span className="oneOrderSmall">{details.phoneNumber}</span>
            </h4>
            <h4 className="oneOrderLarge">
              Address:{" "}
              <span className="oneOrderSmall">
                {shippingDetails.address}, {shippingDetails.city},{" "}
                {shippingDetails.state}, {shippingDetails.country} -{" "}
                {shippingDetails.pincode}
              </span>
            </h4>
            <h4 className="oneOrderCart">Ordered Items:</h4>
            <div className="oneOrderCartItems">
              {products.map((obj) => {
                return (
                  <>
                    <div className="oneOrderEachCart">
                      <div className="oneOrderEachLeft">
                        <img src={obj.imageUrl} height="100%" width="100%" />
                      </div>
                      <div className="oneOrderEachRight1">
                        <p className="oneOrderParaCart">{obj.name}</p>
                      </div>
                      <div className="oneOrderEachRight2">
                        <p className="oneOrderParaCart">
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
        <div className="oneOrderRightDiv">
          <div className="oneOrderRight">
            <h3 className="oneOrderSummary">Total</h3>
            <div className="oneOrderOuter">
              <div className="oneOrderInnerLeft">
                <p className="oneOrderPara">Subtotal:</p>
              </div>
              <div className="oneOrderInnerRight">
                <p className="oneOrderPara">&#8377; {totalPrice}</p>
              </div>
            </div>
            <div className="oneOrderOuter">
              <div className="oneOrderInnerLeft">
                <p className="oneOrderPara">Shipping Charges:</p>
              </div>
              <div className="oneOrderInnerRight">
                <p className="oneOrderPara">&#8377; 0</p>
              </div>
            </div>
            <div className="oneOrderDiv"></div>
            <div className="oneOrderOuter">
              <div className="oneOrderInnerLeft">
                <p className="oneOrderPara">Total:</p>
              </div>
              <div className="oneOrderInnerRight">
                <p className="oneOrderPara">&#8377; {totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneOrder;
