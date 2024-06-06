import React from 'react'
import BackgroundImage from '../components/BackgroundImage'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/UserContext'
import { useEffect, useState } from 'react'
import axiosInstance from './axiosInstance'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const UserEventHomege = () => {
    const navigate = useNavigate();
    const { vendorDetails, setvendorDetails ,userType} = useContext(AppContext);
    const [vendor, setVendor] = useState(null);
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const location = useLocation();
  return (
    <div>
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
                Vendor ID:{vendor.vendorId}
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
                deletepackage();
              }}>
                Delete Event
              </button>

            </div>
          </div>
          </div>

        </>
      )}:
        
      
    </>

    </div>
  )
}

export default UserEventHomege
