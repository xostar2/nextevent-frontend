import React from 'react'
import {useState} from 'react'
import "../styles/SignUp.css"
import UserSignup from '../pages/UserSignUp'
import VendorSignup from '../pages/VendorSignup'
const SignUp = () => {

    const [usertype,setUsertype]= useState("user");

    const handleUserTypeChange =(e)=>{
        setUsertype(e.target.value);
    }
  return (
    <div className='signup-container-main'>
      <h1 className='main-heading-sign-up-page'>Sign Up</h1>
      <div className='radio-inputs'>
      <label htmlFor="user" className='radio'>
        <input 
        className='radio'
        type="radio"
        id="user"
        name="usertype"
        value="user"
        checked={usertype==="user"}
        onChange={handleUserTypeChange}    
        />
        <span className='name'>User</span>
        </label>
        <label htmlFor="vendor" className='radio'>
        <input 
        className='radio-signup'
        type="radio"
        id="vendor"
        name="usertype"
        value="vendor"
        checked={usertype==="vendor"}
        onChange={handleUserTypeChange}
        />
       <span className='name'>Vendor</span></label>
      </div>
      {usertype==="user"?<UserSignup/>:<VendorSignup/>}
      
    </div>
  )
}

export default SignUp
