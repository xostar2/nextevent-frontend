import React from 'react'
import { Navigate } from 'react-router-dom';
import {useState, useEffect ,useContext, useRef} from 'react';
import { AppContext } from '../context/UserContext';

const UserLogOut = (userType) => {
  const {isLogin,handleUserLogout,handleVendorLogout,userdetails,vendordetails,admindetails,handleAdminLogout} = useContext(AppContext);
  
  useEffect(() => {
    if(isLogin){
      if(userType === 'user'){
        console.log(userdetails);
        console.log("login ho?? :",isLogin)
        handleUserLogout();

        console.log("logout ho gye?? :",isLogin)
       console.log("user logout:",userdetails);
      }
      else if(userType === 'vendor'){
        handleVendorLogout();
        
      }
      else if(userType === 'admin'){
        handleAdminLogout();
       
      }
    }
   }, [isLogin,userType,handleAdminLogout,handleUserLogout,handleVendorLogout]);

   return <Navigate to="/loginuser" />

}

export default UserLogOut
