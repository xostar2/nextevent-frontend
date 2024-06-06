import React, { useContext, useEffect, useState } from 'react';
import '../styles/VendorHomePage.css'; // Import the CSS file for styling
import BackgroundImage from '../components/BackgroundImage';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/UserContext';
import axios from 'axios';
import VendorDeshboard from '../components/VendorDeshboard';
import axiosInstance from './axiosInstance';
import EventCard from '../components/EventCard';
import ErrorBoundary from '../components/ErrorBoundary';
import { CircularProgress, Snackbar, Alert } from '@mui/material';

//====================================================================================================================

const URL = "https://nextevent-backend.onrender.com/api/v1/vendors/getdetails";
const URL2 = "https://nextevent-backend.onrender.com/api/v1/events/getevent";
//====================================================================================================================

const VendorHomePage = () => {
  const navigate = useNavigate();
  const [vendors_d, setVendors_d] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const { vendordetails, setVendorDetails } = useContext(AppContext);

  const ventoken = localStorage.getItem('ventoken'); // Assuming you store the token in localStorage
  console.log("this is token in vendor home page:", ventoken);
  console.log("this is vendordetails in vendor home page:", vendordetails);

  const fetchVendorDetails = async () => {
    try {
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${ventoken}`,
        },
      });
      console.log("this is response data:::::::::::::::::::::this is data", response.data.data);
      setVendors_d(response.data.data);
      setVendorDetails(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setSnackbarMessage('Failed to load vendor details: ' + error.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axiosInstance.get(URL2, {
          headers: {
            Authorization: `Bearer ${ventoken}`,
          },
        });
        console.log("this is response data in vendor home page from getevent", response.data.data);
        setEventList(response.data.data);
      } catch (error) {
        console.log("this is error in vendor home page while fetching data:", error.message);
        setSnackbarMessage('Failed to load event details: ' + error.message);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    };
    fetchEventDetails();
  }, []);

  useEffect(() => {
    if (!ventoken) {
      window.location.href = "/loginuser";
      throw new Error('Vendor token not found in vendorHomePage');
    }
    fetchVendorDetails();
  }, [setVendors_d]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <ErrorBoundary>
      <>
        <BackgroundImage />
        <VendorDeshboard />
        {isLoading ? (
          <div className="loading-indicator">
            <CircularProgress />
          </div>
        ) : (
          <div className="event-card-container">
            {eventList.map((eventObject) => (
              <EventCard key={eventObject._id} props={eventObject} />
            ))}
          </div>
        )}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </>
    </ErrorBoundary>
  );
};

export default VendorHomePage;
