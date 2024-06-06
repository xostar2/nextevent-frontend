import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UserLogin.css";
import axios from "axios";
import { AppContext } from "../context/UserContext";
import BackgroundImage from "../components/BackgroundImage";
import axiosInstance from "./axiosInstance.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

//====================================================================================================================
const URL = "https://nextevent-backend.onrender.com/api/v1/users/userlogin";
const URL1 = "https://nextevent-backend.onrender.com/api/v1/vendors/vendorlogin";
const URL2 = "https://nextevent-backend.onrender.com/api/v1/admins/loginadmin";

//====================================================================================================================

const UserLogin = () => {
  const navigate = useNavigate();

  const {
    handleUserLogin,
    setUserDetails,
    handleVendorLogin,
    setVendorDetails,
  } = useContext(AppContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
    userType: "user",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let response;

      if (user.userType === "user") {
        response = await axiosInstance.post(URL, user, {
          "Content-Type": "application/json",
        });
      } else if (user.userType === "vendor") {
        response = await axiosInstance.post(URL1, user, {
          "Content-Type": "application/json",
        });
      } else if (user.userType === "admin") {
        response = await axios.post(URL2, user, {
          "Content-Type": "application/json",
        });
      }

      if (response.status === 200) {
        const data = response.data.data;
        if (user.userType === "user") {
          setUserDetails(data);
          handleUserLogin(data.accessToken);
          navigate("/userhomepage");
        } else if (user.userType === "vendor") {
          setVendorDetails(data);
          handleVendorLogin(data.accessToken);
          navigate("/vendorhomepage");
        } else if (user.userType === "admin") {
          navigate("/admindashboard", { state: { admin: data } });
        }
      } else {
        setErrorMessage(response.data.data.message);
        setOpenDialog(true);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage("No response from server");
      } else {
        setErrorMessage(error.message);
      }
      setOpenDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <BackgroundImage />
      <div className="login-form-user-border">
        <div className="user-login-form-login">
          <h1 className="main-heading mb-3-login">Login Here</h1>
          <br />

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                id="email"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                id="password"
                required
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userType">User Type</label>
              <select
                id="userType"
                name="userType"
                value={user.userType}
                onChange={handleInput}
              >
                <option value="user">User</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-group">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                fullWidth
              >
                {isSubmitting ? (
                  <CircularProgress size={24} />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
            <span className="signup-link">Register before login </span>
            <Link to="/signup" className="signup-link1">
              SignUp
            </Link>
          </form>
        </div>
      </div>
      {/* Dialog for displaying errors */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserLogin;
