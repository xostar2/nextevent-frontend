import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/UserContext';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ErrorBoundary from './ErrorBoundary';

const userImage = 'https://source.unsplash.com/random/300x300';
const URL = "https://nextevent-backend.onrender.com/api/v1/vendors/getdetails";
const URL2 = "https://nextevent-backend.onrender.com/api/v1/vendors/updatevendor";

const VendorDeshboard = () => {
  const [vendors_d, setVendors_d] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const { vendordetails, setVendorDetails } = useContext(AppContext);
  const navigate = useNavigate();

  const fetchVendorDetails = async () => {
    try {
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ventoken")}`,
        },
      });
      console.log("this is response data:::::::::::::::::::::this is data", response.data.data.vendor);
      setVendors_d(response.data.data.vendor);
      setEditableData(response.data.data.vendor);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log("this is error in vendor home page while fetching data:", error.message);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    console.log("this is editable data", editableData);
    try {
      const response = await axios.put(URL2, editableData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ventoken")}`,
        },
      });
      console.log("Update response:", response.data);
      setVendors_d(editableData);
      setIsEditing(false);
      setSnackbarMessage('Vendor details updated successfully.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.log("Error updating vendor details:", error.message);
      setSnackbarMessage('Failed to update vendor details: ' + error.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchVendorDetails();
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
          <Grid container spacing={3}>
            {/* Top Grid: Company Name */}
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                {vendors_d?.companyName.toUpperCase()}
              </Typography>
            </Grid>

            {/* Middle Grid: Vendor Details and Image */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">Email:</Typography>
                    <Typography variant="body1" sx={{ border: '1px solid #ccc', padding: '0.5rem', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0,0,0,0.1)' }}>
                      {vendors_d?.email}
                    </Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">Vendor Name:</Typography>
                    <Typography variant="body1" sx={{ border: '1px solid #ccc', padding: '0.5rem', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0,0,0,0.1)' }}>
                      {vendors_d?.vendorName}
                    </Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">Registration No.:</Typography>
                    {isEditing ? (
                      <TextField
                        sx={{ padding: '0.5rem', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0,0,0,0.1)' }}
                        fullWidth
                        variant="outlined"
                        name="registrationNo"
                        value={editableData.registrationNo}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Typography variant="body1" sx={{ border: '1px solid #ccc', padding: '0.5rem', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0,0,0,0.1)' }}>
                        {vendors_d?.registrationNo}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">Phone:</Typography>
                    {isEditing ? (
                      <TextField
                        sx={{ border: '1px solid #ccc', padding: '0.5rem', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0,0,0,0.1)' }}
                        fullWidth
                        variant="outlined"
                        name="phone"
                        value={editableData.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Typography variant="body1" sx={{ border: '1px solid #ccc', padding: '0.5rem', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0,0,0,0.1)' }}>
                        {vendors_d?.phone}
                      </Typography>
                    )}
                  </Box>
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">DoB:</Typography>
                    <Typography variant="body1" sx={{ border: '1px solid #ccc', padding: '0.5rem', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0,0,0,0.1)' }}>
                      {moment(vendors_d?.DOB).format('DD/MM/YY')}
                    </Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">Aadhaar:</Typography>
                    {isEditing ? (
                      <TextField
                        sx={{ padding: '0.5rem', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0,0,0,0.1)' }}
                        fullWidth
                        variant="outlined"
                        name="aadhaar"
                        value={editableData.aadhaar}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Typography variant="body1" sx={{ border: '1px solid #ccc', padding: '0.5rem', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0,0,0,0.1)' }}>
                        {vendors_d?.aadhaar}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* Right Grid: User Image */}
            <Grid item xs={12} md={4}>
              {userImage && (
                <img
                  src={userImage}
                  alt=""
                  style={{ width: '100%', maxWidth: '300px', objectFit: 'cover', borderRadius: '200px' }}
                />
              )}
            </Grid>

            {/* Bottom Grid: Buttons */}
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
                {isEditing ? (
                  <Button variant="contained" color="primary" className='btn-vendor-deshboard' onClick={handleSaveClick}>
                    Save
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" className='btn-vendor-deshboard' onClick={handleUpdateClick}>
                    Update Profile
                  </Button>
                )}
                <Button variant="contained" color="primary" className='btn-vendor-deshboard' onClick={() => navigate("/vieworders", { state: { vendorId: vendors_d?._id } })}>View Orders</Button>
                <Button variant="contained" color="primary" className='btn-vendor-deshboard' onClick={() => navigate("/addevent")}>Add Event</Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ErrorBoundary>
  );
};

export default VendorDeshboard;
