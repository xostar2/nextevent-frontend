import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const FeedbackForm = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [eventId, setEventId] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.event) {
      setEventId(location.state.event._id);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedback = {
      rating,
      comment,
      eventowner: eventId,
    };

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "https://nextevent-backend.onrender.com/api/v1/feedbacks/userfeedback",
        feedback,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("Feedback submitted successfully!");
      setOpen(true);
      setTimeout(() => {
        navigate("/userhomepage");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setMessage("Error submitting feedback. Please try again.");
      setOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" component="div" gutterBottom>
            Submit Feedback
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" component="div" gutterBottom>
              Rate the Event
            </Typography>
            <Rating
              name="event-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={1}
            />
            <TextField
              fullWidth
              required
              label="Comment"
              variant="outlined"
              margin="normal"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
        </Paper>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={message.includes("successfully") ? "success" : "error"} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default FeedbackForm;
