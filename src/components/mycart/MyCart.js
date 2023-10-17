import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "./MyCart.css";
const MyCart = () => {
  const [data, setData] = useState([]);
  const [remove, setRemove] = useState(true);
  const [total, setTotal] = useState();
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
        setData(data.data.cartDetails.products);
        setTotal(data.data.cartDetails.totalPrice);
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
  }, [remove]);

  const goToOneProductPage = (productId) => {
    navigate("/oneproduct", { state: { _id: productId } });
  };

  const removeProductFromCartHandler = async (productId) => {
    const res = await fetch(
      `https://homestyle-ecommerce-backend.onrender.com/removeProductFromCart/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.status === 200) {
      setRemove(!remove);
    } else {
      alert(data.message);
    }
  };

  const goToShippingDetailsPage = () => {
    navigate("/shippingdetails");
  };

  const goToProductsPage = () => {
    navigate("/products");
  };
  return (
    <>
      {(() => {
        if (data.length !== 0) {
          return (
            <>
              <div className="myCartMainDiv">
                <div className="myCartLeftDiv">
                  <div className="myCartLeft">
                    <h3 className="myCartInfo">Shopping Cart</h3>
                    <h4 className="myCartLarge">
                      <p>{data.length} items in your cart</p>
                    </h4>
                    <h4 className="myCartCart">Your Cart Items:</h4>
                    <div className="myCartCartItems">
                      {data.map((obj) => {
                        return (
                          <>
                            <div className="myCartEachCart">
                              <div
                                className="myCartEachLeft"
                                onClick={() => {
                                  goToOneProductPage(obj.productId);
                                }}
                              >
                                <img
                                  src={obj.imageUrl}
                                  height="100%"
                                  width="100%"
                                />
                              </div>
                              <div className="myCartEachRight1">
                                <p className="myCartParaCart">{obj.name}</p>
                              </div>
                              <div
                                className="myCartEachRight1"
                                style={{
                                  paddingLeft: "0px",
                                }}
                              >
                                <p
                                  className="myCartParaCart"
                                  style={{ textAlign: "right" }}
                                >
                                  {obj.quantity} * &#8377; {obj.price} = &#8377;{" "}
                                  {obj.quantity * obj.price}
                                </p>
                              </div>
                              <div className="myCartEachRight2">
                                <DeleteIcon
                                  style={{ fontSize: "20px" }}
                                  className="myCartDeleteIcon"
                                  onClick={() => {
                                    removeProductFromCartHandler(obj.productId);
                                  }}
                                />
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="myCartRightDiv">
                  <div className="myCartRight">
                    <h3 className="myCartSummary">Total</h3>
                    <div className="myCartOuter">
                      <div className="myCartInnerLeft">
                        <p className="myCartPara">Subtotal:</p>
                      </div>
                      <div className="myCartInnerRight">
                        <p className="myCartPara">&#8377; {total}</p>
                      </div>
                    </div>
                    <div className="myCartOuter">
                      <div className="myCartInnerLeft">
                        <p className="myCartPara">Shipping Charges:</p>
                      </div>
                      <div className="myCartInnerRight">
                        <p className="myCartPara">&#8377; 0</p>
                      </div>
                    </div>
                    <div className="myCartDiv"></div>
                    <div className="myCartOuter">
                      <div className="myCartInnerLeft">
                        <p className="myCartPara">Total:</p>
                      </div>
                      <div className="myCartInnerRight">
                        <p className="myCartPara">&#8377; {total}</p>
                      </div>
                    </div>
                    <div className="myCartButtonDiv">
                      <button
                        className="myCartButton"
                        onClick={goToShippingDetailsPage}
                      >
                        Buy now
                      </button>
                    </div>
                    <br />

                    <div className="myCartButtonDiv">
                      <button
                        className="myCartButtonShop"
                        onClick={goToProductsPage}
                      >
                        Go to shop
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        } else {
          return (
            <>
              <div className="myCartEmptyDiv">
                <h1 className="myCartEmptyHeading">
                  Your cart is currently empty. Start shopping now to add items!
                </h1>
              </div>
            </>
          );
        }
      })()}
    </>
  );
};

export default MyCart;
