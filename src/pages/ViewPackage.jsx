import React, { useEffect } from "react";
import "../styles/ViewPackage.css";
import BackgroundImage from "../components/BackgroundImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


//==========================================================================================================================================

const ViewPackage = ({packages,event,vendor}) => {

  const[isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [usertype, setUsertype] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
      if(localStorage.getItem("ventoken")){
        setUsertype("vendor");
      }else{
        setUsertype("user");
      }
  }, []);


  const handledelete = async (packageId) => {
    
    try {
      console.log(packageId);
      const response= await axios.delete(`https://nextevent-backend.onrender.com/api/v1/packages/deletepackage/${packageId}`
        ,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("ventoken")}`
          }
        }
      );
      console.log(response);
      if(response.status===200){
        navigate("/eventhomepage");
        console.log("event deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(packages);
    console.log(event);
    console.log(vendor);
    console.log("this is usertype in handledelete::::::::::::::::::::::", usertype);
  }, [packages]);
  return (
    <>
      <div className="background-image">
     
      <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background Image" />
    </div>
      <BackgroundImage />
      <div className="package-container-viewpackage">
        <div className="package-thumbnail-viewpackage">
          {" "}
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Package Thumbnail"
            className="package-thumbnail-viewpackage"
          />
        </div>
       
        <div className="product-post-viewpackage">
          <div className="product-post-viewpackage__item">
            <label className="title-viewpackage">
              <span>title:</span>{packages?.title}
            </label>
          </div>
          <div className="product-post-viewpackage__item">
            <label className="description-viewpackage">
              <span>description:</span> {packages?.description}
              <ul></ul>
            </label>
          </div>
          <div className="product-post-viewpackage__item">
            <label className="owner-details-viewpackage">
              <span>owner:</span>{vendor?.vendorName}
            </label>
          </div>
          <div className="product-post-viewpackage__item">
            <label className="amount-viewpackage">
              <span>amount:</span>${packages?.amount}
            </label>
          </div>
          <div className="product-post-viewpackage__item">
            <label className="created-date-viewpackage">
              <span>createdDate:</span>{packages?.createdAt}
            </label>
          </div>
          <div className="product-post-viewpackage__item">
            <label className="eventid-viewpackage">
              <span>eventid:</span>{event?._id}
            </label>
          </div>
          <div className="product-post-viewpackage__item">
            <label className="vendorid-viewpackage">
              <span>vendorid:</span>{vendor?._id}
            </label>
          </div>
        </div>
        <div className="package-button-add-package">
          {usertype==="vendor"?(
            <>
          <div className="input-field-add-package">  
            <button className="submit-btn-add-package" onClick={()=>{
              handledelete(packages._id);
            }}>Delete</button>
          </div>
          <div className="input-field-add-package">
            <button className="submit-btn-add-package">Edit</button>
          </div>
          </>
          ):(
            <>
              <div className="input-field-add-package">
            <button className="submit-btn-add-package"
              onClick={()=>{
                navigate("/addorder",{state:{event:event,vendor:vendor,packages:packages}})
              }}
            >book package</button>
          </div>
            </>
          )
        }
        </div>
      </div>
    </>
  );
};

export default ViewPackage;


 {/* <div className="package-details-grid-viewpackage">
          <div className="package-title-viewpackage">
            <label className="title-viewpackage">title:{title}</label>
          </div>
          <div className="package-description-viewpackage">
            <label className="description-viewpackage">
              description:{description}
            </label>
          </div>
          <div className="package-ownerdetails-viewpackage">
            <label className="owner-details-viewpackage">
              owner:{ownerName}
            </label>
          </div>
          <div className="package-amount-viewpackage">
            <label className="amount-viewpackage">amount:{amount}</label>
          </div>
          <div className="package-createddate-viewpackage">
            <label className="created-date-viewpackage">
              createdDate:{createdAt}
            </label>
          </div>
          <div className="package-eventid-viewpackage">
            <label className="eventid-viewpackage">eventid:{eventid}</label>
          </div>
          <div className="package-vendorid-viewpackage">
            <label className="vendorid-viewpackage">vendorid:{vendorid}</label>
          </div>
        </div> */}