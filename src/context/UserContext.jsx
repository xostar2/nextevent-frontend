import React, { createContext, useState,useEffect,useContext } from "react";

export const AppContext = createContext(); 

export const AppProvider=({children})=>{



//====================================================================================== 
    const venToken = localStorage.getItem('ventoken');
    const userToken = localStorage.getItem('token');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    React.useEffect(()=>{
        if(userToken || venToken){
          setIsAuthenticated(true);
        }else{
          setIsAuthenticated(false);
        }
    },[venToken, userToken, isAuthenticated])
  
//=================================================================0=====================
    const [userdetails,setUserDetails]=useState();
    const [vendordetails,setVendorDetails]=useState(null);
    const [eventdetails,setEventDetails]=useState();
    const [packagesdetails,setPackagesDetails]=useState();
    const [admindetails,setAdminDetails]=useState();
    const [userType,setUserType]=useState("");
//======================================================================================
    
    
    // let isLogin= !!userdetails || !!vendordetails || !!admindetails;
//======================================================================================
 
   useEffect((data)=>{
        if(userdetails){
            setUserDetails(userdetails);
        }
    },[userdetails])



    useEffect((data)=>{
        if(vendordetails){
            console.log("this is vendordetails in user context",vendordetails);
            setVendorDetails(vendordetails);
        }
    },[vendordetails])

    useEffect((data)=>{
        if(admindetails){
            setAdminDetails(admindetails);
        }
    },[admindetails])
    useEffect((data)=>{
        if(eventdetails){
            setEventDetails(eventdetails);
        }
    },[eventdetails])
    
//======================================================================================
    const handleUserLogin=(user)=>{
        if(user){
            localStorage.setItem("token",user);
            
            
            setUserType("user");
            
        }
        else{
            console.log("user is null in context");
        }
    }
//======================================================================================
    const handleUserLogout=()=>{     
        setUserDetails("");
        setUserType("");
        localStorage.removeItem("token");
    }

      
    
//======================================================================================
    const handleVendorLogin=(vendorData)=>{
        if(vendorData){
            
            setUserType("vendor");
            localStorage.setItem("ventoken",vendorData);
            
        }
        else{
            console.log("vendor is null in context");
        }
      
    }
//======================================================================================
    const handleVendorLogout=()=>{
        
        setVendorDetails(null);
        setUserType("");
        localStorage.removeItem("ventoken");
    }
    

//======================================================================================


    const handleEventCreate=(eventData)=>{  
        setEventDetails(eventData)
    }

    

//======================================================================================

    const handlePackageCreate=(packageData)=>{
        setPackagesDetails([...packagesdetails,packageData]);
    }

    
//======================================================================================
    

    return(
        <AppContext.Provider value={{ 
            
            userdetails,
            eventdetails,
            packagesdetails,
            vendordetails,
            handleUserLogin,
            handleUserLogout,
            handleEventCreate,
            handlePackageCreate,
            handleVendorLogin,
            handleVendorLogout,
            
            admindetails,
            isAuthenticated,
            setIsAuthenticated,
            setUserDetails,
            setVendorDetails

        }}>
            {children}
        </AppContext.Provider>
    )           
}



