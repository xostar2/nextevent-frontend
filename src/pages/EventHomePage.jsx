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

const url = "https://nextevent-backend.onrender.com/api/v1/vendors/getdetails";
const url1 = "https://nextevent-backend.onrender.com/api/v1/vendors/getdetailsuser";
const EventHomePage = ({ props }) => {
  const navigate = useNavigate();
  const { vendorDetails, setvendorDetails ,userType} = useContext(AppContext);
  const [vendor, setVendor] = useState(null);
  const [event, setEvent] = useState(null);
  const [packages,setPackages]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

//==========================================================================================================================================
  const deleteevent = async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const eventId=event?._id;
      console.log("this is eventId in deleteevent: ", eventId);
      const response = await axiosInstance.delete(
        `https://nextevent-backend.onrender.com/api/v1/events/deleteevent/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ventoken")}`,
          },
        }
      );
      console.log("this is response in delete package: ", response);
      if (response.status === 200) {
       // console.log("this is response: ", response);
        
        setVendor("");
        navigate("/");
        return response;
      }
      else{
        setError(response.data.message);
        console.log("this is error in event home page->fetchvendordetails:Deleting the event ", response.data.message);
      }
    } catch (error) {
      console.log(
        "this is error in event home page->fetchvendordetails:Deleting the event ",
        error
      );
    }
  };

  //==========================================================================================================================================
  const fetchVendorDetails = async () => {
    try {
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ventoken")}`,
        },
      });
      console.log("this is response in fetchvendordetails: ", response);
      if (response.status === 200) {
        console.log("this is response also in fetchvendordetails: ", response.data.data.vendor);
        setVendor(response.data.data.vendor);
        return response.data.data;
      }
    } catch (error) {
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
      fetchVendorDetails();     
       }
    }

  , []);
  //==========================================================================================================================================


  //==========================================================================================================================================
  useEffect(() => {
   const fetchdetailspackage = async () => {
    try {
      const eventId=location.state.event?._id;
      console.log("this is eventId in EventHomePage::::::::::::::::::::::", eventId);
      const response = await axiosInstance.get(`https://nextevent-backend.onrender.com/api/v1/packages/getallpackage/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ventoken")}`,
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
          
              <button className="submit-btn-add-package">
                Edit Event
              </button>
              <button className="submit-btn-add-package" onClick={()=>{
                navigate("/addpackage",{state:{event:event,vendor:vendor}})
              }}>
                Add Package
              </button>
              <button className="submit-btn-add-package" onClick={()=>{
                deleteevent();
              }}>
                Delete Event
              </button>

            </div>
          </div>
          </div>

        </>
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
  );
};

export default EventHomePage;
