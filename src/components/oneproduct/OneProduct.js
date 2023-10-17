import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useLocation } from "react-router-dom";
import "./OneProduct.css";
const OneProduct = () => {
  const [details, setDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const getOneProductDetails = async () => {
      const res = await fetch(
        `https://homestyle-ecommerce-backend.onrender.com/getOneProductDetails/${location.state._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setDetails(data.data);
    };
    getOneProductDetails();
  }, []);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const addProductToCartHandler = async () => {
    const res = await fetch(
      "https://homestyle-ecommerce-backend.onrender.com/addProductToCart",
      {
        method: "POST",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: details.name,
          category: details.category,
          price: details.price,
          quantity: quantity,
          status: details.status,
          description: details.description,
          imageUrl: details.imageUrl,
          productId: details._id,
        }),
      }
    );
    const data = await res.json();
    if (data.status === 401) {
      alert("Please sign in to your account before adding items to your cart!");
    } else {
      alert(data.message);
    }
  };
  return (
    <>
      <div className="oneProductMainDiv">
        <div className="oneProductLeftOuterDiv">
          <div className="oneProductLeftInnerDiv">
            <img src={details.imageUrl} height="100%" width="100%" />
          </div>
        </div>
        <div className="oneProductRightOuterDiv">
          <div className="oneProductRightInnerDiv">
            <h1 className="oneProductMainHeading">{details.name}</h1>
            <h4 className="oneProductHeading">
              Category:{" "}
              <span className="oneProductWeight">{details.category}</span>
            </h4>
            <h4 className="oneProductHeading">&#8377; {details.price}</h4>
            <div className="oneProduct">
              <div className="oneProductIcon oneProductMinus">
                <RemoveCircleIcon
                  className="oneProductIconColor"
                  onClick={decreaseQuantity}
                />
              </div>
              <div className="oneProductIcon oneProductQuantity">
                {quantity}
              </div>
              <div className="oneProductIcon oneProductPlus">
                <AddCircleIcon
                  className="oneProductIconColor"
                  onClick={increaseQuantity}
                />
              </div>
              <div className="oneProductAdd" onClick={addProductToCartHandler}>
                <p className="oneProductAddToCart">Add To Cart</p>
              </div>
            </div>
            <h4 className="oneProductHeading">{details.status}</h4>
            <h4 className="oneProductDescriptionHeading">Description:</h4>
            <h4 className="oneProductHeading oneProductWeight">
              {details.description}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneProduct;
