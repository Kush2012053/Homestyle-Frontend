import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Images/navbar_logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";

const Navbar = () => {
  const [state, setState] = useState(false);
  const [display, setDisplay] = useState(false);
  useEffect(() => {
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
        setState(true);
      } else if (data.status === 500) {
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
  return (
    <>
      <div className="navbarMainDiv">
        <div className="navbarIcon">
          <MenuIcon
            className="navbarIconcolor"
            onClick={() => {
              setDisplay(true);
            }}
          />
        </div>
        <div className="navbarOuterImage">
          <div className="navbarInnerImage">
            <img src={logo} height="100%" width="100%" />
          </div>
        </div>
        <div className="navbarOptionsOuter">
          <div className="navbarOptionsMiddle">
            <div className="navbarOptionsInner">
              <p className="navbarPara">
                <NavLink
                  to="/"
                  className="navbarNavLink"
                  exact
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </p>
            </div>
            <div className="navbarOptionsInner">
              <p className="navbarPara">
                <NavLink
                  to="/products"
                  className="navbarNavLink"
                  activeClassName="active"
                >
                  Products
                </NavLink>
              </p>
            </div>
            <div className="navbarOptionsInner">
              <p className="navbarPara">
                <NavLink
                  to="/about"
                  className="navbarNavLink"
                  activeClassName="active"
                >
                  About
                </NavLink>
              </p>
            </div>
            <div className="navbarOptionsInner">
              <p className="navbarPara">
                <NavLink
                  to="/contact"
                  className="navbarNavLink"
                  activeClassName="active"
                >
                  Contact
                </NavLink>
              </p>
            </div>
          </div>
        </div>
        {(() => {
          if (state) {
            return (
              <>
                <div className="navbarRightIcon">
                  <NavLink to="/mycart" className="navbarNavLink">
                    <ShoppingCartIcon className="navbarIconcolor" />
                  </NavLink>
                </div>
                <div className="navbarRightIcon">
                  <NavLink to="/myprofile" className="navbarNavLink">
                    <AccountCircleIcon className="navbarIconcolor" />
                  </NavLink>
                </div>
              </>
            );
          } else {
            return (
              <>
                <div className="navbarSignIn">
                  <button className="navbarSignInButton">
                    <NavLink to="/signin" className="navbarSignInLink">
                      Sign In
                    </NavLink>
                  </button>
                </div>
              </>
            );
          }
        })()}
      </div>
      <div
        className="navbarOptions"
        style={{ left: display ? "0px" : "-100vw" }}
      >
        <div className="navbarOptionsClose">
          <div className="navbarOptionsCloseInner">
            <CloseIcon
              className="navbarIconcolor"
              onClick={() => {
                setDisplay(false);
              }}
            />
          </div>
        </div>
        <div className="navbaroptionsCloseDiv">
          <div className="navbarOptionsInner">
            <p className="navbarPara">
              <NavLink
                to="/"
                className="navbarNavLink"
                exact
                activeClassName="active"
              >
                Home
              </NavLink>
            </p>
          </div>
          <div className="navbarOptionsInner">
            <p className="navbarPara">
              <NavLink
                to="/products"
                className="navbarNavLink"
                activeClassName="active"
              >
                Products
              </NavLink>
            </p>
          </div>
          <div className="navbarOptionsInner">
            <p className="navbarPara">
              <NavLink
                to="/about"
                className="navbarNavLink"
                activeClassName="active"
              >
                About
              </NavLink>
            </p>
          </div>
          <div className="navbarOptionsInner">
            <p className="navbarPara">
              <NavLink
                to="/contact"
                className="navbarNavLink"
                activeClassName="active"
              >
                Contact
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
