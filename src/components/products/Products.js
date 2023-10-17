import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <form>
        <input
          type="text"
          name="search"
          value={searchValue}
          onChange={inputHandler}
        />
      </form>
      {data.map((obj) => {
        return (
          <>
            <div>
              <img
                src={obj.imageUrl}
                alt=""
                height="100px"
                width="100px"
                onClick={() => {
                  goToOneProductPage(obj._id);
                }}
              />
              <h3>{obj.name}</h3>
              <h4>{obj.category}</h4>
              <h5>{obj.price}</h5>
              <hr />
            </div>
          </>
        );
      })}
    </>
  );
};

export default Products;
