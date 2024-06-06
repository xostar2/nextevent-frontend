import React, { useEffect } from "react";
import logonexevent from "../assets/logonexevent.png";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/UserContext";
import axios from "axios";
import axiosInstance from "../pages/axiosInstance";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {
    userType,
    setUserType,
    isLogin,
    handleUserLogout,
    handleVendorLogout,
    isAuthenticated,
    setIsAuthenticated,
  } = useContext(AppContext);

  const setLogout = async () => {
    if (isAuthenticated || isLogin) {
      handleVendorLogout();
      handleUserLogout();
      localStorage.clear();
      !isLogin && (window.location.href = "/loginuser");
    }
  };

  const [userToken, setUserToken] = useState(null);
  const [vendorToken, setVendorToken] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const vendorToken = localStorage.getItem("ventoken");
    setUserToken(userToken);
    setVendorToken(vendorToken);
  }, [isAuthenticated, isLogin]);

  return (
    <>
      <nav>
        <Link to="/" className="NavBar-title">
          NexEvent
        </Link>
        <div
          className="menu"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={isOpen ? "open" : ""}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>

          {!isAuthenticated ? (
            <>
              {" "}
              <li>
                <NavLink to="/loginuser">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">SignUp</NavLink>
              </li>
            </>
          ) : (
            <>
              { isLogin && userToken && userType === "user" && (
                <li>
                  <NavLink to="/userhomepage">UserHome</NavLink>
                </li>
              )}
              { isLogin &&vendorToken && userType === "vendor" && (
                <li>
                  <NavLink to="/vendorhomepage">vendorHome</NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to={{
                    pathname: "/logout",
                    state: { userType: { userType } },
                  }}
                  onClick={() => {
                    console.log("clicked logout");

                    setLogout();
                    setIsAuthenticated(false);
                  }}
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
