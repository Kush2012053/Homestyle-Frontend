import React from "react";
import main from "../../Images/main.png";
import { useNavigate } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();

  const goToProductsPage = () => {
    navigate("/products");
  };

  return (
    <>
      <div className="homeBottom">
        <div className="homeSubDiv1">
          <div>
            <h1 className="homeH1">
              Welcome to <span className="homeSpan">Homestyle</span>,
            </h1>

            <p className="homePara">Where Your Home Finds Its Perfect Match!</p>

            <div className="homeBuyNowOuter">
              <button className="homeBuyNowInner" onClick={goToProductsPage}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className="homeSubDiv2">
          <img src={main} height="100%" width="100%" />
        </div>
      </div>
    </>
  );
};

export default Home;
