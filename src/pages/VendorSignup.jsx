// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import "../styles/VendorSignUp.css";
// import BackgroundImage from '../components/BackgroundImage';
// import axios from "axios";
const genderselect = ["Male", "Female", "Divided"]
const cityTypes = ["Hyderabad", "New Delhi", "Mumbai",
  "Chennai", "Kolkata", "Bengaluru", "Secunderabad", "Ahmadabad"
  , "Surat", "Pune", "Noida", "Visakhapatnam", "Vijayawada",
  "Kota", "Jaipur", "Udaipur", "Jaisalmer", "Jodhpuer", "Ajmer",
  "Raigad", "Tirupati", "Tiruttani", "Anantapur", "Guntur",
  "Kurnool", "Cuddapah", "Chittor", "Hindupur", "Mahboobnagar",
  "Nizamabad", "Nandyal", "Warangal", "Adilabad", "Ramagundam",
  "Khammam", "Karimnagar", "Nalgonda", "Vijayanagaram", "Srikakulam",
  "Kakinada", "Rajamandry", "Machilipatnam", "Amaravathi", "Ongole", "Nellore",
  "Eluru", "Bhimavaram", "Proddutur", "Narasaraopet", "Tenali", "Madurai",
  "Kancheepuram", "Coimbatore", "Vellore", "Pondicherry",
  "Trichy", "Salem", "Tumkur", "Dharwad", "Hubli", "Mysuru",
  "Mangaluru", "Bellary", "Hassan", "Mandya", "Raipur", "Jagdalpur",
  "Puri", "Cuttack", "Bubhaneshwar", "Brahmapur", "Paradeep", "Howrah",
  "Asansol", "Siliguri", "Darjeeling", "Guwahati", "Aizawl",
  "Agartala", "Shillong", "Dibrugarh", "Kohima", "Gangtok", "Dispur", "Patna",
  "Muzaffarpur", "Muzaffarnagar", "Gaya", "Jamshedpur", "Ranchi", "Bhilai", "Dhanbad",
  "Tiruvananthapuram", "Kochi", "Kozicode", "Kottayam", "Rameshwaram", "Udipi",
  "Manipal", "Nanded", "Solapur", "Nasik", "Kalyan", "Aurangabad", "Thane", "Nagpur",
  "Rajkot", "Gandhinagar", "Jhamnagar", "Bhopal", "Itarsi", "Gwalior", "Indore",
  "Bikaner", "Jammu", "Srinagar", "Jallandhar", "Chandigarh", "Ludhiana", "Amritsar",
  "Pathankot", "Mohali", "Shimla", "Manali", "Kullu", "Faridabad", "Gurugram",
  "Dharmashala", "Patiala", "Bhatinda", "Leh", "Dehradun", "Nainital",
  "Rishikesh", "Haridwar", "Lucknow", "Allahabad", "Varanasi", "Kanpur", "Aligarh",
  "Jhansi", "Ghaziabad", "Agra", "Moradabad", "Gorakhpur", "Satna", "Faizabad",
  "Chandrapur", "Darbhanga", "Durgapur", "Kharagpur", "Imphal", "Konark",
  "Rayagad", "Bilaspur", "Raigarh", "Kothagudem", "Chirala", "Sivakasi", "Tirunelveli",
  "Tiruppur", "Alappey", "Aluva", "Alappuzha", "Kollam", "Malappuram", "Thrissur", "Bhadravathi",
  "Shimoga", "Dhavangere", "Bijar", "Bijapur", "Yadgir", "Raichur", "Kalburgi", "Bagalkot",
  "Belgaun", "Balharshah", "Wardha", "Tuljapur", "Latur", "Port Blair", "Kawaratti", "Daman",
  "Silvassa", "Panaji", "Vasco", "Anand", "Kolhapur", "Vadodara", "Junagadh", "Bhuj", "Jabalpur",
  "Mathura", "Meerut", "Roorkee", "Bareily", "Raebareily", "Bokaro", "Pilani", "Bhiwani", "Karnal",
  "Ambala", "Panipat", "Kurukshetra", "Sonipat", "Hissar", "Rohtak",
  "Panchkula", "Anantnag", "Mandi", "Baramulla"]


// function uniq(a) {
//   return a.sort().filter(function (item, pos, ary) {
//     return !pos || item != ary[pos - 1];
//   });
// }
// uniq(cityTypes);
// cityTypes.sort();

// const VendorSignUp = () => {
//   const [vendors, setvendors] = useState({
//     vendorName: "",
//     email: "",
//     companyName: "",
//     phone: "",
//     aadhaar: "",
//     // registrationNo: "",
//     password: "",
//     // address:"",
//     city: "",
//     // gender:"",  

//   });


//   const handlevalueChange = (e) => {
//     setvendors({
//       ...vendors,
//       [e.target.name]: e.target.value
//     });
//     console.log(vendors);
//   }


//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("vendorName", vendors.vendorName);
//       formData.append("companyName", vendors.companyName);
//       formData.append("email", vendors.email);
//       // formData.append("gender", vendors.gender);
//       formData.append("phone", vendors.phone);
//       formData.append("aadhaar", vendors.aadhaar);
//       // formData.append("address", vendors.address);
//       formData.append("password", vendors.password);
//       // formData.append("registrationNo", vendors.registrationNo);
//       formData.append("city", vendors.city);



//       // if(formData.has("vendorName")){
//       //   console.log());

//       // }
//       // Make POST request using Axios
//       const response = await axios.post(
//         "http://localhost:8000/api/v1/vendors/vendorregister",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(response);

//       if (response.status === 200) {
//         navigate("/loginuser");
//       }

//       // Optionally, you can redirect the user or show a success message here
//     } catch (error) {
//       console.log(error);
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         console.error("Server Error:", error.response.data);
//         // Handle server error response, show error message to the user, etc.
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error("No Response from Server:", error.request);
//         // Handle request timeout or network error, show error message to the user, etc.
//       } else {
//         // Something else happened in making the request that triggered an error
//         console.error("Request Error:", error.message);
//         // Handle other types of errors, show error message to the user, etc.
//       }
//     }
//   }


//   return (

//     <>
//       <BackgroundImage />

//       <form className="form" onSubmit={handleSubmit}>
//         <p className="title">Vendor Signup </p>
//         <p className="message">Signup now and get full access to our app. </p>

//         <label htmlFor="htmlFor">
//           <input type="email" placeholder="Enter email"
//             name="email"

//             value={vendors.email}
//             onChange={handlevalueChange}
//             required
//           />
//         </label>

//         <label htmlFor="vendorName">
//           <input
//             type="text"
//             placeholder="Enter Vendor Name"
//             name="vendorName"

//             value={vendors.vendorName}
//             onChange={handlevalueChange}
//             required
//           />

//         </label>


//         <label htmlFor="companyName">
//           <input type="text"
//             name="companyName"
//             placeholder="Enter Company Name"
//             autoComplete="off"
//             value={vendors.companyName}
//             onChange={handlevalueChange}

//           />
//         </label>

//         <label htmlFor="phone">
//           <input
//             type="text"
//             name="phone"
//             placeholder="Enter Phone Number"

//             value={vendors.phone}
//             onChange={handlevalueChange}
//           />
//         </label>
//         <label htmlFor="aadhaar">
//           <input type="text" placeholder="Enter Aaddhar"
//             name="aadhaar"
//             value={vendors.aadhaar}
//             onChange={handlevalueChange}
//           />

//         </label>
//         <label htmlFor="password">
//           <input type="password" placeholder="Enter password"
//             name="password"
//             value={vendors.password}
//             onChange={handlevalueChange}
//           />

//         </label>
//         <lable htmlFor="city">
//           <select
//             name="city"
//             placeholder="Others"
//             value={vendors.city}
//             onChange={handlevalueChange}
//             required
//           >

//             <option value="">-- Select--City--Name --</option>

//             {cityTypes.map((cityTypes) =>
//               <option key={cityTypes} value={cityTypes}>
//                 {cityTypes}
//               </option>
//             )}
//           </select>
//         </lable>
//         <button className="submit">Submit</button>
//         <p className="signin">Already have an acount ? <Link to="/loginuser">Login</Link> </p>
//       </form>

//     </>
//   );
// };

// export default VendorSignUp;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/VendorSignUp.css";
import BackgroundImage from '../components/BackgroundImage';
import axios from "axios";
import { CircularProgress, Snackbar, Alert } from '@mui/material';

// const genderselect = ["Male", "Female", "Divided"];
// const cityTypes = [.../* your list of cities here */];

function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item !== ary[pos - 1];
  });
}
uniq(cityTypes);
cityTypes.sort();

const VendorSignUp = () => {
  const [vendors, setvendors] = useState({
    vendorName: "",
    email: "",
    companyName: "",
    phone: "",
    aadhaar: "",
    password: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handlevalueChange = (e) => {
    setvendors({
      ...vendors,
      [e.target.name]: e.target.value
    });
    console.log(vendors);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("vendorName", vendors.vendorName);
    formData.append("companyName", vendors.companyName);
    formData.append("email", vendors.email);
    formData.append("phone", vendors.phone);
    formData.append("aadhaar", vendors.aadhaar);
    formData.append("password", vendors.password);
    formData.append("city", vendors.city);

    try {
      const response = await axios.post(
        "https://nextevent-backend.onrender.com/api/v1/vendors/vendorregister",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        navigate("/loginuser");
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setError(error.response.data.message || "Server Error");
      } else if (error.request) {
        setError("No Response from Server");
      } else {
        setError("Request Error: " + error.message);
      }
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <BackgroundImage />
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Vendor Signup </p>
        <p className="message">Signup now and get full access to our app. </p>

        <label htmlFor="email">
          <input type="email" placeholder="Enter email" name="email" value={vendors.email} onChange={handlevalueChange} required />
        </label>
        <label htmlFor="vendorName">
          <input type="text" placeholder="Enter Vendor Name" name="vendorName" value={vendors.vendorName} onChange={handlevalueChange} required />
        </label>
        <label htmlFor="companyName">
          <input type="text" name="companyName" placeholder="Enter Company Name" autoComplete="off" value={vendors.companyName} onChange={handlevalueChange} />
        </label>
        <label htmlFor="phone">
          <input type="text" name="phone" placeholder="Enter Phone Number" value={vendors.phone} onChange={handlevalueChange} />
        </label>
        <label htmlFor="aadhaar">
          <input type="text" placeholder="Enter Aadhaar" name="aadhaar" value={vendors.aadhaar} onChange={handlevalueChange} />
        </label>
        <label htmlFor="password">
          <input type="password" placeholder="Enter password" name="password" value={vendors.password} onChange={handlevalueChange} />
        </label>
        <label htmlFor="city">
          <select name="city" placeholder="Others" value={vendors.city} onChange={handlevalueChange} required>
            <option value="">-- Select City Name --</option>
            {cityTypes.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
        <button className="submit" type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </button>
        <p className="signin">Already have an account? <Link to="/loginuser">Login</Link></p>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default VendorSignUp;

