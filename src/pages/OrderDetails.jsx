import React, { useEffect, useState } from 'react';
import BackgroundImage from '../components/BackgroundImage';
import "../styles/OrderDetails.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState({
    userId: "",
    vendorId: "",
    packageId: "",
    description: "",
    locations: "",
    eventDate: "",
    amount: "",
    packageName: "",
  });
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleVendorId = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      vendorId: location.state.vendor?._id,
      packageId: location.state.packages?._id,
      userId: user,
      amount: location.state.packages?.amount,
      packageName: location.state.packages?.title,
    }));
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(`https://nextevent-backend.onrender.com/api/v1/users/getuserprofile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setUser(response.data.data?._id);
        return response.data.data;
      }
    } catch (error) {
      console.log("Error in fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    handleVendorId();
  }, [user]); // Dependency array ensures handleVendorId runs after user is fetched

  const handleSubmit = (e) => {
    e.preventDefault();
    if (order.locations === "" || order.eventDate === "" || order.description === "") {
      setErrorMessage("Please fill all the required fields");
      setOpen(true);
      return;
    }

    setIsSubmitting(true);
    axiosInstance.post(`https://nextevent-backend.onrender.com/api/v1/orders/addorder`, order, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setOpen(true);
          setErrorMessage('Order placed successfully!');
          setTimeout(() => {
            navigate("/userhomepage");
          }, 2000); // Redirect after 2 seconds
        }
      })
      .catch((error) => {
        console.log("Error in handleSubmit:", error);
        setErrorMessage('Failed to place order. Please try again.');
        setOpen(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <BackgroundImage />
      <div className="form-container">
        <h1>Order Details</h1>
        <form className="form-order-details" onSubmit={handleSubmit}>
          <div className="form-group-order-details">
            <label htmlFor="Location">Location</label>
            <input type="text" id="Location" name="locations" required placeholder='Location'
              value={order.locations}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-order-details">
            <label htmlFor="eventDate">Event Date</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              required
              placeholder='Event date'
              value={order.eventDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-order-details">
            <label htmlFor="textarea">Description</label>
            <textarea name="description" value={order.description} onChange={handleChange} id="textarea" rows="10" cols="50" required placeholder='Description'></textarea>
          </div>
          <div className="form-group-order-details-button">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </div>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={errorMessage.includes('successfully') ? 'success' : 'error'} sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default OrderDetails;
