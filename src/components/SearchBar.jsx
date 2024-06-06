import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai"; // Importing Search Icon
import "../styles/SearchBar.css"

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
"Panchkula", "Anantnag", "Mandi", "Baramulla", "Kargil"]
const SearchBar = () => {
  const [eventName, setEventName] = useState("");
  const [cityName, setCityName] = useState(""); // Replace "otherField" with the actual field name

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "eventName") 
      setEventName(value);
    if (name === "cityName") { // Replace "otherField" with the actual field name
      setCityName(value);
    }
}

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Searching for:", eventName, cityName); // Replace with your search logic
    setEventName(""); // Clear input fields after search
    setCityName(""); // Replace "otherField" with the actual field name to clear
    

  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <select
          id="eventName"
          name="eventName"
          placeholder="Others"
          value={eventName}
          onChange={handleInputChange}
          required
        >
        
        <option value="">-- Select Event Type --</option>
        {eventTypes.map((eventTypes)=>
          <option key={eventTypes} value={eventTypes}>
            {eventTypes}
          </option>
        )}
        </select>
        <select
          name="cityName"
          placeholder="Others"
          value={cityName} 
          onChange={handleInputChange}
          required
        >
        <option value="">-- Select--City--Name --</option>
        {cityTypes.map((cityTypes)=>
          <option key={cityTypes} value={cityTypes}>
            {cityTypes}
          </option>
        )}
        </select>
       
        <button type="submit">
          <AiOutlineSearch className="search-icon" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
