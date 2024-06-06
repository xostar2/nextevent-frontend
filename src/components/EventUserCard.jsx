// import React, { useEffect } from 'react'
import "./EventUserCard.css";
// import moment from 'moment'
// import { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// const userImage = 'https://source.unsplash.com/random/300x300'

// const EventUserCard = (props) => {
//   const navigate=useNavigate()
//   const [vendorDetails, setVendorDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//  const  fetchVendor = async ()=>{
//   try {
//     setIsLoading(true)
//     setError(null)
//     const ownerId = props.event.owner;
//     const res = await axios.get(`http://localhost:8000/api/v1/vendors/getvendordetails/${ownerId}`
//       ,{
//         headers:{
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//       }
//     )
//       if(res.status === 200){
//         console.log("res is vendor:::::::::::::",res.data.data)
//         setVendorDetails(res.data.data.vendorName)
//       }
//   } catch (error) {
//     console.log(error.message)
//     setError(error.message)

//   }finally{
//     setIsLoading(false)
//   }

//  }

//   useEffect(() => {
//     console.log("props is::::::::::::::::::",props);
//     console.log("event name is ",props.event);
//     fetchVendor();
//     console.log("vendorDetails is",vendorDetails);
//     console.log("this is description is",props.event.description);
//   }, [])

//   return (
//     <>
//     <div className="card">
//   <div className="card-image">{userImage||props.event.thumbnail}</div>
//   <div className="card-body-body">
//       <p className="card-title">{props.event.eventName}</p>
//       <p className="card-body">
//         {props.event.description||"No description provided"}
//       </p>
//       <p className="footer">Written by <span className="by-name">{vendorDetails}</span> on <span className="date">{moment(props.event.createdAt).format('MMMM Do YYYY')}</span></p>
//   </div>
//   <div className="card-button-container">
//       <button className="card-button-container" onClick={()=>{
//         navigate("/eventhomepageuser",{state:{event:props.event}})
//       }}>
//               View Event
//       </button>
//   </div>
// </div>

//     </>
//   )
// }

// export default EventUserCard
import React, { useEffect } from "react";

import moment from "moment";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ErrorBoundary from "../components/ErrorBoundary";

const userImage = "https://source.unsplash.com/random/300x300";

const EventUserCard = (props) => {
  const navigate = useNavigate();
  const [vendorDetails, setVendorDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVendor = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const ownerId = props.event.owner;
      const res = await axios.get(
        `https://nextevent-backend.onrender.com/api/v1/vendors/getvendordetails/${ownerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        console.log("res is vendor:::::::::::::", res.data.data);
        setVendorDetails(res.data.data.vendorName);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("props is::::::::::::::::::", props);
    console.log("event name is ", props.event);
    fetchVendor();
    console.log("vendorDetails is", vendorDetails);
    console.log("this is description is", props.event.description);
  }, []);

  return (
    <ErrorBoundary>
      <div className="event-card-container">
        <Card className="card">
          <CardMedia
            className="card-image"
            component="img"
            src={props.event.thumbnail}
          />
          <div className="card-body" style={{ padding: "1rem" }}>
            <CardContent
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxHeight: "100px",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="card-title"
              >
                {props.event.eventName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="card-body"
              >
                {props.event.description || "No description provided"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="footer"
              >
                Written by <span className="by-name">{vendorDetails}</span> on{" "}
                <span className="date">
                  {moment(props.event.createdAt).format("MMMM Do YYYY")}
                </span>
              </Typography>
            </CardContent>
          </div>
          <div
            className="card-button-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                navigate("/eventhomepageuser", {
                  state: { event: props.event },
                });
              }}
              style={{ marginBottom: "1rem" }}
            >
              View Event
            </Button>
          </div>
        </Card>
        {/* More EventUserCard components here... */}
      </div>
    </ErrorBoundary>
  );
};

export default EventUserCard;
