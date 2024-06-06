// src/AdminDashboard.js
import React, { useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

const AdminDashBoard = () => {
  // Dummy data for admin and feedback
  const location = useLocation();
  const [admin,setAdmin] = React.useState({});
  
  const [feedbacks,setFeedbacks] = React.useState([]);
  
  useEffect(() => {
    console.log(location.state.admin.user);
    setAdmin(location.state.admin.user);
  },[]);

  // Fetch data from the server
  const fetchfeedback = async () => {
    const response = await axios.get('https://nextevent-backend.onrender.com/api/v1/feedbacks/getfeedback');
    console.log(response.data.data.feedbacks);
    setFeedbacks(response.data.data.feedbacks);
  };

  useEffect(() => {
    // Fetch data from the server
    fetchfeedback();
    
    
  },[]);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" component="div" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="h6" component="div">
            Name: {admin.name}
          </Typography>
          <Typography variant="h6" component="div">
            Email: {admin.email}
          </Typography>
        </Paper>

        <Box sx={{ my: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: 1 }}>
      <Typography variant="h5" component="div" gutterBottom>
        Feedback
      </Typography>
      <List>
        {feedbacks.map(feedback => (
          <Card key={feedback._id} sx={{ mb: 2 }}>
            <CardContent>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={feedback.comment}
                  primaryTypographyProps={{ variant: 'body1', color: 'textPrimary' }}
                />
                <ListItemText
                  secondary={new Date(feedback.createdAt).toLocaleString()}
                  secondaryTypographyProps={{ variant: 'caption', color: 'textSecondary' }}
                />
                <ListItemText
                  secondary={`User ID: ${feedback.userId}`}
                  secondaryTypographyProps={{ variant: 'caption', color: 'textSecondary' }}
                />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
      </Box>
    </Container>
  );
};

export default AdminDashBoard;
