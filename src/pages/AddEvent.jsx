// import React, { useState ,useEffect} from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/AddEvent.css"
// import { useContext } from "react";
// import { AppContext } from "../context/UserContext";
// import BackgroundImage from "../components/BackgroundImage";
// import axiosInstance from "./axiosInstance";
// const URL="https://nextevent-backend.onrender.com/api/v1/events/addevent"

const eventTypes = [
  "Conferences",
  "Seminars",
  "Workshops",
  "Team Building Events",
  "Trade Shows",
  "Business Dinners",
  "Networking Events",
  "Product Launches",
  "VIP Events",
  "Award Ceremonies",
  "Office Parties",
  "Weddings",
  "Birthday Parties",
  "Anniversary Celebrations",
  "Baby Showers",
  "Engagement Parties",
  "Family Reunions",
  "Graduation Parties",
  "Holiday Parties",
  "Concerts",
  "Festivals",
  "Sporting Events",
  "Charity Events",
  "Community Events",
  "Political Rallies",
  "Public Demonstrations",
  "Movie Premieres",
  "Fashion Shows",
  "Celebrity Parties",
  "Entertainment and Award Nights",
  "Brand Promotions",
  "Sales Promotions",
  "Retail Promotions",
  "Roadshows",
  "Academic Conferences",
  "Alumni Events",
  "Lectures and Talks",
];
const city= ["Hyderabad", "New Delhi", "Mumbai",
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
      "Asansol", "Siliguri", "Darjeeling", "Guwahati", "Aizawl", "Itanagar", 
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
"Panchkula", "Anantnag", "Mandi", "Baramulla", "Kargil"];

// const AddEvent = () => {
  
//   const navigate = useNavigate();
    
//   useEffect(() => {
//     const ventoken = localStorage.getItem("ventoken");
//     if (!ventoken) {
//         window.location.href = "/loginuser";
//     }
//   }, []);

  
//   const [eventData, setEventData] = useState({
//     eventName: "",
//     createDate: new Date(),
//     thumbnail: null,
//     description: "",
//     city: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventData({ ...eventData, [name]: value });
//   };
//   const handleImageChange = (e) => {
//     setEventData({ ...eventData, thumbnail: e.target.files[0] });
//   };

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("eventName", eventData?.eventName);
//       formData.append("thumbnail", eventData?.thumbnail);
//       formData.append("description", eventData?.description); 
//       formData.append("city", eventData?.city);
      
      
//       const response = await axiosInstance.post(URL, formData, {
//         ...axiosInstance.defaults,
//         "Content-Type": "multipart/form-data",
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem("ventoken")}`
//         }
//       });
//      console.log("yaha se ara hu bhaiya");
//      console.log(response.data);
//       if(response.status===200){
//         console.log(response.status);
        
//         console.log("nhi yaha se ara hu bhaiya");
      
//       navigate("/vendorhomepage")
      
     
//       }
//     } catch (error) {
      
//       alert("event not created :",error?.response?.data?.message || " ");
//       console.log("event not created :",error?.response?.data?.message || " ");
//     }

    
//   };

//   return (
//     <>
//     <BackgroundImage/>
//         <div className="add-event-container">
//       <h1>Add Event</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group-event-name">
//           <label htmlFor="eventName">Event Name:</label>
//           <select
//             name="eventName"
//             id="eventName"
//             value={eventData.eventName}
//             onChange={handleChange}
//             required
//           >
//             <option value="">-- Select Event Type --</option>
//             {eventTypes.map((eventType) => (
//               <option key={eventType} value={eventType}>
//                 {eventType}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group-event-name">
//           <label htmlFor="cityName">City Name:</label>
//           <select
//             name="city"
//             id="city"
//             value={eventData.city}
//             onChange={handleChange}
//             required
//           >
//             <option value="">-- Select City Name --</option>
//             {city.map((city) => (
//               <option key={city} value={city}>
//                 {city}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group-thumbnail">
//           <label htmlFor="thumbnail">Event Thumbnail URL:</label>
//           <input
//             type="file"
//             name="thumbnail"
//             id="thumbnail"
//             accept="image/*"
//             onChange={handleImageChange}
            
//           />
//         </div>
//         <div className="form-group-description">
//           <label htmlFor="description">Event Description:</label>
//           <textarea
//             name="description"
//             id="description"
//             value={eventData.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>
//         <button className="button" type="submit">
//                   <span className="button-content">Add Event </span>
//         </button>
//       </form>
//     </div>
//     </>

//   );
// };

// export default AddEvent;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddEvent.css";
import { useContext } from "react";
import { AppContext } from "../context/UserContext";
import BackgroundImage from "../components/BackgroundImage";
import axiosInstance from "./axiosInstance";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const URL = "https://nextevent-backend.onrender.com/api/v1/events/addevent";

// const eventTypes = [
//   "Conferences",
//   //... other event types
// ];

// const city = [
//   "Hyderabad",
//   //... other cities
// ];

const AddEvent = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const ventoken = localStorage.getItem("ventoken");
    if (!ventoken) {
        window.location.href = "/loginuser";
    }
  }, []);

  const [eventData, setEventData] = useState({
    eventName: "",
    createDate: new Date(),
    thumbnail: null,
    description: "",
    city: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageChange = (e) => {
    setEventData({ ...eventData, thumbnail: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("eventName", eventData?.eventName);
      formData.append("thumbnail", eventData?.thumbnail);
      formData.append("description", eventData?.description); 
      formData.append("city", eventData?.city);

      const response = await axiosInstance.post(URL, formData, {
        ...axiosInstance.defaults,
        "Content-Type": "multipart/form-data",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("ventoken")}`
        }
      });

      if(response.status === 200){
        navigate("/vendorhomepage");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Event creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackgroundImage />
      <div className="add-event-container">
        <h1>Add Event</h1>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="form-group-event-name">
            <label htmlFor="eventName">Event Name:</label>
            <select
              name="eventName"
              id="eventName"
              value={eventData.eventName}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Event Type --</option>
              {eventTypes.map((eventType) => (
                <option key={eventType} value={eventType}>
                  {eventType}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group-event-name">
            <label htmlFor="cityName">City Name:</label>
            <select
              name="city"
              id="city"
              value={eventData.city}
              onChange={handleChange}
              required
            >
              <option value="">-- Select City Name --</option>
              {city.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group-thumbnail">
            <label htmlFor="thumbnail">Event Thumbnail URL:</label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group-description">
            <label htmlFor="description">Event Description:</label>
            <textarea
              name="description"
              id="description"
              value={eventData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              Add Event
            </Button>
            {loading && <CircularProgress size={24} sx={{ marginLeft: '10px' }} />}
          </Box>
        </form>
      </div>
    </>
  );
};

export default AddEvent;
