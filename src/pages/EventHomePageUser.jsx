import React from "react";
import "../styles/EventHomePage.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import axios from "axios";
import BackgroundImage from "../components/BackgroundImage";
import ViewPackage from "./ViewPackage";


//==========================================================================================================================================
const url = "https://nextevent-backend.onrender.com/api/v1/vendors/getdetails";
const url1 = "https://nextevent-backend.onrender.com/api/v1/vendors/getvendordetailsuser";

//==========================================================================================================================================


const EventHomePageUser = () => {


  const navigate = useNavigate();
  const { vendorDetails, setvendorDetails ,userType,userdetails,setUserDetails} = useContext(AppContext);
  const [vendor, setVendor] = useState(null);
  let ownerId=null;
  const [event, setEvent] = useState(null);
  const [packages,setPackages]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId,setUserId] = useState(null);
  const location = useLocation();
  

//==========================================================================================================================================

  
  const fetchVendorDetails = async () => {
    console.log("this is ownerId in fetchVendorDetails::::::::::::::::::::::", ownerId);
    try {
      const response = await axiosInstance.get(`https://nextevent-backend.onrender.com/api/v1/vendors/getvendordetails/${ownerId}`, {//yhi galti he bhai
        
      });
      console.log("this is response in fetchvendordetails: ", response);
      if (response.status === 200) {
        console.log("this is response also in fetchvendordetails: ", response.data);
        setVendor(response.data.data);
        return response.data.data;
      }
    } 
    catch (error) {
      console.log(
        "this is error in event home page->fetchvendordetails: ",
        error
      );
    }
  };


//==========================================================================================================================================


useEffect(() => {
    console.log("this is props in EventHomePage:::::::::::::::::", location.state.event);
      if (location.state ) {
      setEvent(location.state.event);
      console.log("this is event: ", location.state.event);
      ownerId=(location.state.event.owner);
      fetchVendorDetails();  
        
      }
    }

  , []);
  
  
//==========================================================================================================================================




//=======================================================================================================================


useEffect(() => {
    const fetchdetailspackage = async () => {
     try {
       const eventId=location.state.event?._id;
       console.log("this is eventId in EventHomePage::::::::::::::::::::::", eventId);
       const response = await axiosInstance.get(`https://nextevent-backend.onrender.com/api/v1/packages/getallpackages/${eventId}`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       });
       console.log("this is response of package is EventHomepage while fetching data of package: ", response.data.data);
       setPackages(response.data.data);
 
       
       //console.log("this is packages in EventHomePage", packages);
       
       
     } catch (error) {
       console.log(
         "this is error in event home page->fetchvendordetails:Deleting the event ",
         error
       );
     }
   }
    fetchdetailspackage();
   }, []);


//==========================================================================================================================================

  return (
    <>
      <BackgroundImage/>
      {vendor && event && (
        <>
        <div className="event-home-page-main">          
          <div className="event-home-page">
            <h1>Event Home Page</h1>
            <h2>{event.eventName}</h2>
          </div>
          <div className="vendor-profile-box">
            <div className="vendor-profile-header">
              <h2 className="vendor-profile-company-name">
                Company Name :{vendor.companyName}
              </h2>
              <p className="vendor-profile-email">
                <span className="email-span" id="email-span">
                  Email:{vendor.email}
                </span>
              </p>
            </div>
            <div className="vendor-profile-details">
              <p className="vendor-profile-vendor-name">
                Vendor Name:{vendor.vendorName}
              </p>
              <p className="vendor-profile-vendor-id">
                Vendor ID:{vendor?._id}
              </p>
              <p className="vendor-profile-event-id">Event ID: {event?._id}</p>
            </div>
            <div className="vendor-profile-details-button">
          
              <button className="submit-btn-add-package" onClick={()=>{
                navigate("/userorderlist")
              }}>
                View Order
              </button>
              {/* <button className="submit-btn-add-package" onClick={()=>{
                navigate("/addpackage",{state:{event:event,vendor:vendor}})
              }}>   
                Add Package
              </button>
              <button className="submit-btn-add-package" onClick={()=>{
                deleteevent();
              }}>
                Delete Event
              </button> */}
              
              <button className="submit-btn-add-package" onClick={()=>{
                navigate("/feedbackform" ,{state:{event:event}})
              }}>
                Feedback
              </button>
            </div>
          </div>
          </div>

        </>
      )}
      {packages.length === 0 && !isLoading && ( // Check for empty packages after loading
        <div>
          {/* {enqueueSnackbar("No packages available for this event yet. Please look at other events.", { variant: "info" })} Use Snackbar to display message */}
        </div>
      )}
      <div>
    
        {
          packages.map((package_) => (
            <ViewPackage
              key={package_._id}
              vendor={vendor}
              event={event}
              packages={package_}
          
            />
          ))            
        }
      </div>
        
    
    </>
  )
}

export default EventHomePageUser
