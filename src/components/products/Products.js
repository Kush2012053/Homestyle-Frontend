import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await fetch("https://homestyle-ecommerce-backend.onrender.com/getAllProducts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const filteredProducts = data.data.filter((obj) => {
        if (
          obj.name.toLowerCase().includes(searchValue) ||
          obj.category.toLowerCase().includes(searchValue)
        ) {
          return obj;
        }
      });
      setData(filteredProducts);
    };
    getAllProducts();
  }, [searchValue]);

  const inputHandler = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const goToOneProductPage = (_id) => {
    navigate("/oneproduct", { state: { _id } });
  };
  return (
    <>
      <div className="searchBarDiv">
      <form>
        <input
           type="text"
           name="search"
           value={searchValue}
           onChange={inputHandler}
           placeholder="Search by name or category..."
           className="productSearchBar"
        />
      </form>
      </div>
      {(()=>{
        if(data.length !== 0) {
          return(
            <>
            <div className="productsOuterDiv">
      {data.map((obj) => {
        return (
          <>
            <div className="productsBoxMainOuter">
          <div className="productsBoxOuter">
            <div className="productsBoxInner">
              <div className="productsImgOuter">
                <div className="productsImgInner" onClick={() => {
                  goToOneProductPage(obj._id);
                }}>
                  <img src={obj.imageUrl} height="100%" width="100%" />
                </div>
              </div>
              <div className="productsTop">
                <p className="productsPara">{obj.name}</p>
              </div>
              <div className="productsMiddle">
                <p className="productsPara">{obj.category}</p>
              </div>
              <div className="productsBottom">
                <p className="productsPara">&#8377; {obj.price}</p>
              </div>
            </div>
          </div>
        </div>
          </>
        );
      })} 
      </div>
            </>
          );
        }
        else {
          return (
            <>
              <div className="productsEmptyDiv">
                <h1 className="productsEmptyHeading">
                  No product found with the name and category specified!
                </h1>
              </div>
            </>
          );
        }
      })()}      
    </>
  );
};

export default Products;
