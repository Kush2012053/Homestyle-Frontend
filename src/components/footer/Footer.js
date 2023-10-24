import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Images/footer_logo.png";

import "./Footer.css";
const Footer = () => {
  return (
    <>
      <div style={{backgroundColor: "black"}}>
        <div className="footerImageOuterDiv">
          <div className="footerImageInnerDiv">
            <img src={logo} height="100%" width="100%" />
          </div>
        </div>
        <div className="footerParaOuterDiv">
          <p className="footerParaInnerDiv">Homestyle, an e-commerce platform, offers a curated selection of home styling products. Explore furniture, decor, lighting, and more to transform your space beautifully.</p>
          <div className="footerNavbarOuter">
            <div className="footerNavbarInner">
              <p className="footerNavbarPara">
                <NavLink
                  to="/"
                  className="footerNavbarNavLink"
                  exact
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </p>
            </div>
            <div className="footerNavbarInner">
              <p className="footerNavbarPara">
                <NavLink
                  to="/products"
                  className="footerNavbarNavLink"
                  activeClassName="active"
                >
                  Products
                </NavLink>
              </p>
            </div>
            <div className="footerNavbarInner">
              <p className="footerNavbarPara">
                <NavLink
                  to="/about"
                  className="footerNavbarNavLink"
                  activeClassName="active"
                >
                  About
                </NavLink>
              </p>
            </div>
            <div className="footerNavbarInner">
              <p className="footerNavbarPara">
                <NavLink
                  to="/contact"
                  className="footerNavbarNavLink"
                  activeClassName="active"
                >
                  Contact
                </NavLink>
              </p>
            </div>
          </div>
          <p className="footerCopyRight">Homestyle &copy; 2023 | Curated by Twin Brothers for Stylish Homes</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
