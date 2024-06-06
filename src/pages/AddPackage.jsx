import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/AddPackage.css";
import BackgroundImage from "../components/BackgroundImage";
import axiosInstance from "./axiosInstance.js";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const AddPackage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    title: "",
    amount: "",
    description: "",
    avatar: null,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDataChange = (e) => {
    setPackageData({
      ...packageData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setPackageData({
      ...packageData,
      avatar: e.target.files[0],
    });
  };

  useEffect(() => {
    // Add any additional setup if needed
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = location.state.event?._id;
    const vn = location.state.vendor?._id;

    if (!packageData.title || !packageData.description || !packageData.amount) {
      alert("Please fill all the fields to add a package");
      setError("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", packageData.title);
      formData.append("description", packageData.description);
      formData.append("amount", packageData.amount);
      formData.append("avatar", packageData.avatar);
      formData.append("eventOwnerId", event);
      formData.append("vendorOwnerId", vn);

      const response = await axiosInstance.post(
        "https://nextevent-backend.onrender.com/api/v1/packages/addpackage",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setError("");
        setIsSubmitting(false);
        console.log("Package added successfully", response.data);
        navigate("/eventhomepage", {
          state: {
            event: location.state.event,
          },
        });
      } else {
        throw new Error("Failed to add package");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to add package. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BackgroundImage />
      <form className="form-control-add-package" onSubmit={handleSubmit}>
        <p className="title-add-package">Add Package</p>
        {error && <Alert severity="error">{error}</Alert>}
        <div className="input-field-add-package">
          <input
            required
            className="input-add-package"
            type="text"
            name="title"
            placeholder="Add Title"
            value={packageData.title}
            onChange={handleDataChange}
          />
        </div>
        <div className="input-field-add-package">
          <input
            required
            className="input-add-package"
            type="text"
            name="amount"
            placeholder="Enter Amount"
            value={packageData.amount}
            onChange={handleDataChange}
          />
        </div>
        <div className="input-field-add-package">
          <input
            required
            className="input-add-package"
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="input-field-add-package">
          <textarea
            required
            className="input-add-package"
            name="description"
            placeholder="Enter Description"
            value={packageData.description}
            onChange={handleDataChange}
          />
        </div>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            sx={{ width: '100%', mb: 2 }}
          >
            {isSubmitting ? "Adding..." : "Add Package"}
          </Button>
          {isSubmitting && <CircularProgress size={24} />}
        </Box>
        <div className="input-field-add-package">
          <label className="label-add-package">
            Read Terms and Conditions here{" "}
            <Link to="/" color="blue">
              click here
            </Link>
          </label>
        </div>
      </form>
    </>
  );
};

export default AddPackage;
