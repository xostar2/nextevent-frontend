import React from "react";
import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "https://nextevent-backend.onrender.com/api/v1",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;