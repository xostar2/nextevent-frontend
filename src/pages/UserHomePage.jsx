import { useEffect, useState, useContext } from 'react';
import BackgroundImage from '../components/BackgroundImage'; // Or your combined component
import UserDashboard from '../components/UserDashboard';
import { AiOutlineSearch } from "react-icons/ai"; // Importing Search Icon
import { Snackbar, Alert, CircularProgress } from '@mui/material';
import "../styles/SearchBar.css"
import EventUserCard from '../components/EventUserCard';
import "../styles/UserHomePage.css"
import axiosInstance from './axiosInstance';
import { AppContext } from '../context/UserContext';

//============================================================================================================
const eventTypes = [
  "Conferences", "Seminars", "Workshops", "Team Building Events", "Trade Shows", 
  "Business Dinners", "Networking Events", "Product Launches", "VIP Events", 
  "Award Ceremonies", "Office Parties", "Weddings", "Birthday Parties", 
  "Anniversary Celebrations", "Baby Showers", "Engagement Parties", 
  "Family Reunions", "Graduation Parties", "Holiday Parties", "Concerts", 
  "Festivals", "Sporting Events", "Charity Events", "Community Events", 
  "Political Rallies", "Public Demonstrations", "Movie Premieres", 
  "Fashion Shows", "Celebrity Parties", "Entertainment and Award Nights", 
  "Brand Promotions", "Sales Promotions", "Retail Promotions", "Roadshows", 
  "Academic Conferences", "Alumni Events", "Lectures and Talks"
];
const cityTypes = ["Hyderabad", "New Delhi", "Mumbai", "Chennai", "Kolkata", 
  "Bengaluru", "Secunderabad", "Ahmadabad", "Surat", "Pune", "Noida", 
  "Visakhapatnam", "Vijayawada", "Kota", "Jaipur", "Udaipur", "Jaisalmer", 
  "Jodhpuer", "Ajmer", "Raigad", "Tirupati", "Tiruttani", "Anantapur", 
  "Guntur", "Kurnool", "Cuddapah", "Chittor", "Hindupur", "Mahboobnagar", 
  "Nizamabad", "Nandyal", "Warangal", "Adilabad", "Ramagundam", "Khammam", 
  "Karimnagar", "Nalgonda", "Vijayanagaram", "Srikakulam", "Kakinada", 
  "Rajamandry", "Machilipatnam", "Amaravathi", "Ongole", "Nellore", "Eluru", 
  "Bhimavaram", "Proddutur", "Narasaraopet", "Tenali", "Madurai", 
  "Kancheepuram", "Coimbatore", "Vellore", "Pondicherry", "Trichy", "Salem", 
  "Tumkur", "Dharwad", "Hubli", "Mysuru", "Mangaluru", "Bellary", "Hassan", 
  "Mandya", "Raipur", "Jagdalpur", "Puri", "Cuttack", "Bubhaneshwar", 
  "Brahmapur", "Paradeep", "Howrah", "Asansol", "Siliguri", "Darjeeling", 
  "Guwahati", "Aizawl", "Itanagar", "Agartala", "Shillong", "Dibrugarh", 
  "Kohima", "Gangtok", "Dispur", "Patna", "Muzaffarpur", "Muzaffarnagar", 
  "Gaya", "Jamshedpur", "Ranchi", "Bhilai", "Dhanbad", "Tiruvananthapuram", 
  "Kochi", "Kozicode", "Kottayam", "Rameshwaram", "Udipi", "Manipal", 
  "Nanded", "Solapur", "Nasik", "Kalyan", "Aurangabad", "Thane", "Nagpur", 
  "Rajkot", "Gandhinagar", "Jhamnagar", "Bhopal", "Itarsi", "Gwalior", 
  "Indore", "Bikaner", "Jammu", "Srinagar", "Jallandhar", "Chandigarh", 
  "Ludhiana", "Amritsar", "Pathankot", "Mohali", "Shimla", "Manali", "Kullu", 
  "Faridabad", "Gurugram", "Dharmashala", "Patiala", "Bhatinda", "Leh", 
  "Dehradun", "Nainital", "Rishikesh", "Haridwar", "Lucknow", "Allahabad", 
  "Varanasi", "Kanpur", "Aligarh", "Jhansi", "Ghaziabad", "Agra", "Moradabad", 
  "Gorakhpur", "Satna", "Faizabad", "Chandrapur", "Darbhanga", "Durgapur", 
  "Kharagpur", "Imphal", "Konark", "Rayagad", "Bilaspur", "Raigarh", 
  "Kothagudem", "Chirala", "Sivakasi", "Tirunelveli", "Tiruppur", "Alappey", 
  "Aluva", "Alappuzha", "Kollam", "Malappuram", "Thrissur", "Bhadravathi", 
  "Shimoga", "Dhavangere", "Bijar", "Bijapur", "Yadgir", "Raichur", 
  "Kalburgi", "Bagalkot", "Belgaun", "Balharshah", "Wardha", "Tuljapur", 
  "Latur", "Port Blair", "Kawaratti", "Daman", "Silvassa", "Panaji", 
  "Vasco", "Anand", "Kolhapur", "Vadodara", "Junagadh", "Bhuj", "Jabalpur", 
  "Mathura", "Meerut", "Roorkee", "Bareily", "Raebareily", "Bokaro", "Pilani", 
  "Bhiwani", "Karnal", "Ambala", "Panipat", "Kurukshetra", "Sonipat", 
  "Hissar", "Rohtak", "Panchkula", "Anantnag", "Mandi", "Baramulla", "Kargil"
];

const UserHomePage = () => {
  const { userdetails } = useContext(AppContext);
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); 
  const [searchDetails, setSearchDetails] = useState({ eventName: "", city: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);
    
    try {
      const response = await axiosInstance.post(`https://nextevent-backend.onrender.com/api/v1/events/getuserevent`,
        searchDetails,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });

      setEvent(response.data.data);
      
      if (response.data.data.length === 0) {
        setSnackbarMessage('No events found for the selected criteria.');
        setSnackbarSeverity('info');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setError(error.message);
      setSnackbarMessage('Failed to load events: ' + error.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/loginuser";
    }
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="user-home-page">
        <BackgroundImage />
        <UserDashboard />
        
        <div className="content-container-user-home-page">
          <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-input-container">
              <select
                name="eventName"
                id="eventName"
                value={searchDetails.eventName}
                onChange={(e) => setSearchDetails({ ...searchDetails, eventName: e.target.value })}
                required
              >
                <option value="">-- Select Event Name --</option>
                {eventTypes.map((eventType) => (
                  <option key={eventType} value={eventType}>{eventType}</option>
                ))}
              </select>
              <select
                name="city"
                id="city"
                value={searchDetails.city}
                onChange={(e) => setSearchDetails({ ...searchDetails, city: e.target.value })}
                required
              >
                <option value="">-- Select City Name --</option>
                {cityTypes.map((cityType) => (
                  <option key={cityType} value={cityType}>{cityType}</option>
                ))}
              </select>
              <button type="submit">
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
          </form>  
        </div>

        <div className="content-container-user-home-page-event-card">
          {isLoading && <div className="loading-indicator"><CircularProgress /></div>}
          {error && <div className="error-message">Failed to load events: {error}</div>}
          {event.length > 0 && (
            <div className="event-card-container">
              {event.map((eventObject) => (
                <EventUserCard key={eventObject._id} event={eventObject} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserHomePage;
