import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/UserContext";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ErrorBoundary from "./ErrorBoundary";

const userImage = "https://source.unsplash.com/random/300x300";
const URL = "https://nextevent-backend.onrender.com/api/v1/users/getuserprofile";

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/loginuser";
      throw new Error("User token not found");
    }
    fetchUserDetails();
  }, []);

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
      <Container maxWidth="md" style={{ marginBottom: '2rem' }}>
        <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
          <Grid container spacing={3}>
            {/* User Image */}
            <Grid item xs={12} md={4}>
              {userImage && (
                <img
                  src={userImage}
                  alt={user.username}
                  style={{ width: '100%', maxWidth: '300px', objectFit: 'cover', borderRadius: '200px', margin: '0 auto', display: 'block' }}
                />
              )}
            </Grid>

            {/* User Details */}
            <Grid item xs={12} md={8}>
              <Typography variant="h4" align="center" gutterBottom>
                {user.username}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Email:</Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Phone:</Typography>
                  <Typography variant="body1">{user.phone}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Gender:</Typography>
                  <Typography variant="body1">{user.gender}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" fontWeight="bold">User ID:</Typography>
                  <Typography variant="body1">{user._id}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Join Date:</Typography>
                  <Typography variant="body1">{moment(user.createdAt).format("DD/MM/YY")}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" fontWeight="bold">Date of Birth:</Typography>
                  <Typography variant="body1">{moment(user.DOB).format("DD/MM/YY")}</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" color="primary" onClick={() => navigate("/updateprofile")}>
                  Update Profile
                </Button>
                <Button variant="contained" color="primary" onClick={() => navigate("/userorderlist")} style={{ marginLeft: '1rem' }}>
                  View Orders
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ErrorBoundary>
  );
};

export default UserDashboard;
