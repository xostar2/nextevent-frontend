import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/ContactUs.css';
import BackgroundImage from '../components/BackgroundImage';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const url = "https://nextevent-backend.onrender.com/api/v1/contacts/contactregister";

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const onPhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url, { name, email, phone, message });
      console.log(response);
      if (response.status === 200) {
        setSnackbarMessage('Message sent successfully!');
        setSnackbarSeverity('success');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || 'Failed to send message. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <BackgroundImage />
      <div className="container">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={onNameChange}
            placeholder="Your Name"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={onEmailChange}
            placeholder="Your Email"
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={onPhoneChange}
            placeholder="Your Phone"
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={message}
            onChange={onMessageChange}
            placeholder="Your Message"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth  style={{hover: {backgroundColor: '#2962ff', color: 'white'}}}>
            Send
          </Button>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default ContactUs;
