import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/UserSignUp.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImage from '../components/BackgroundImage';
import { FaCalendarAlt } from 'react-icons/fa';
const genderselect = ["Male", "Female", "Divided"]


function RegistrationForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    gender: "",
    phone: "",
    DOB: new Date(),
    aadhaar: "",
    address: "",
    password: "",
  });

  const handleNameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

  };

  const handleGenderChange = (e) => {
    setUser({ ...user, gender: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("email", user.email);
      formData.append("gender", user.gender);
      formData.append("phone", user.phone);
      formData.append("DOB", user.DOB.toISOString());
      formData.append("aadhaar", user.aadhar);
      formData.append("address", user.address);
      formData.append("password", user.password);
      

      // Make POST request using Axios
      const response = await axios.post(
        "https://nextevent-backend.onrender.com/api/v1/users/userregister",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {

        navigate("/");
      }

      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.log(error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Server Error:", error.response.data);
        // Handle server error response, show error message to the user, etc.
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No Response from Server:", error.request);
        // Handle request timeout or network error, show error message to the user, etc.
      } else {
        // Something else happened in making the request that triggered an error
        console.error("Request Error:", error.message);
        // Handle other types of errors, show error message to the user, etc.
      }
    }
  };


  function DateIcon() {
    return <FaCalendarAlt className="date-icon" />; // Adjust class name as needed
  }
  return (
    <section>
      <main>
        <BackgroundImage />
        <div className="user-registration-form-signup">
          <h1 className="main-heading">User Signup </h1>
          <form onSubmit={handleSubmit} className="form-signup">
            <div className="form-group-username">
              {/* <label htmlFor="username">Username</label> */}
              <input
                type="text"
                name="username"
                placeholder="Username"
                id="username"
                required
                autoComplete="off"
                value={user.username}
                onChange={handleNameChange}
              />
            </div>

            <div className="form-group-email">
              {/* <label htmlFor="email">Email</label> */}
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                id="email"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleNameChange}
              />
            </div>

            <div className="mydict-usersignup">
              {/* <label htmlFor="gender" >Gender</label> */}
              <div className="input-container-vendr">
                <select
                  name="gender"
                  id="gender"
                  placeholder="Select Gender"
                  value={user.gender}
                  onChange={handleGenderChange}
                  required
                >
                  <option value="">--select--gender--</option>{

                    genderselect.map((genderselect) =>
                      <option key={genderselect} value={genderselect}>
                        {genderselect}
                      </option>
                    )
                  }
                </select>
              </div>
              {/* <label htmlFor="gender">Gender</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Women"
                      checked={user.gender === "Women"}
                      onChange={handleGenderChange}
                    />
                    <span className="gender-span">Women</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Men"
                      checked={user.gender === "Men"}
                      onChange={handleGenderChange}
                    />
                    <span className="gender-span">Men</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Divided"
                      checked={user.gender === "Divided"}
                      onChange={handleGenderChange}
                    />
                    <span className="gender-span">Divided</span>
                  </label>
                </div> */}
            </div>
            <div className="birthdate">
              <label htmlFor="birthdate">Date of Birth</label>
              <DatePicker
                placeholderText="Select Date"
                selected={user.DOB}
                onChange={(DOB) => setUser({ ...user, DOB })}
                dateFormat="yyyy/MM/dd"
                showYearDropdown
                scrollableMonthYearDropdown
                // customInput={<DateIcon />}
              />
            </div>

            <div className="form-group-aadhar">
              {/* <label htmlFor="aadhar">Aadhar No.</label> */}
              <input
                type="text"
                name="aadhaar"
                placeholder="Enter your Aadhaar number"
                id="aadhaar"
                required
                autoComplete="off"
                value={user.aadhaar}
                onChange={handleNameChange}
              />
            </div>

            <div className="form-group-address">
              {/* <label htmlFor="address">Address</label> */}
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                id="address"
                required
                autoComplete="off"
                value={user.address}
                onChange={handleNameChange}
              />
            </div>

            <div className="form-group-password">
              {/* <label htmlFor="password">Password</label> */}
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                id="password"
                required
                autoComplete="off"
                value={user.password}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group-phone">
              {/* <label htmlFor="phone">Phone</label> */}
              <input
                type="text"
                name="phone"
                placeholder="Enter your number"
                id="phone"
                required
                autoComplete="off"
                value={user.phone}
                onChange={handleNameChange}
              />
            </div>

            {/* <div className="form-group-image">
              <label htmlFor="image">Profile Image:</label>
              <input
                name="image"
                type="file"
                accept="image/*"

                onChange={handleImageChange}
              />
            </div> */}

            <button className="button-submit" id ="submit-button" type="submit">
              <span className="button-content">Sign Up </span>
            </button>
            <p>If already signup then<Link className="link-login" to="/loginuser">Login</Link> </p>
          </form>
        </div>

      </main>
    </section>
  );
}

export default RegistrationForm;

{
  /* <div className="mydict">
<div>
  <label>
    <input
      type="radio"
      name="gender"
      value="Women"
      checked={user.gender === "Women"}
      onChange={handleGenderChange}
    />
    <span>Women</span>
  </label>
  <label>
    <input
      type="radio"
      name="gender"
      value="Men"
      checked={user.gender === "Men"}
      onChange={handleGenderChange}
    />
    <span>Men</span>
  </label>
  <label>
    <input
      type="radio"
      name="gender"
      value="Divided"
      checked={user.gender === "Divided"}
      onChange={handleGenderChange}
    />
    <span>Divided</span>
  </label>
</div>
</div> */
}
