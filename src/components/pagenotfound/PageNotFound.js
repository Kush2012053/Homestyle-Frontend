import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };
  return (
    <>
      <div className="pageNotFoundOuterDiv">
        <div className="pageNotFoundInnerDiv">
          <h1 className="pageNotFoundHeading">404</h1>
          <h1 className="pageNotFoundH1">PAGE NOT FOUND</h1>
          <p className="pageNotFoundPara">
            We looked everywhere for this page.
            <br />
            Are you sure the website URL is correct?
            <br />
            Get in touch with the site owner.
          </p>
          <div className="pageNotFoungButtonDiv">
            <button className="pageNotFoundButton" onClick={goToHomePage}>
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
