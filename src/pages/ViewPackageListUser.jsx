import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
const ViewPackageListUser = ({props}) => {


    const location = useLocation();

  useEffect(()=>{

  },[])  
  return (
    <div>
      <h1>View Package List User: {location.state}</h1>
    </div>
  )
}

export default ViewPackageListUser
