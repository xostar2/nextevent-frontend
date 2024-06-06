import React, { useEffect, useState, useContext } from 'react';
import '../styles/ViewOrders.css';
import BackgroundImage from '../components/BackgroundImage';
import { AppContext } from '../context/UserContext';
import { Button } from '@mui/material';
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ViewOrders = () => {
  const { vendorDetails } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [orders, setOrders] = useState([]);
  
  const vendorId = location.state.vendorId;

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get(`https://nextevent-backend.onrender.com/api/v1/orders/getvendororder/${vendorId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ventoken")}`
        }
      });
      setOrders(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Error in fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (index, status) => {
    try {
      await axiosInstance.put(`https://nextevent-backend.onrender.com/api/v1/orders/updateorderstatus/${orders[index]?._id}`, {
        status,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ventoken")}`
        }
      });
      
      const updatedOrders = [...orders];
      updatedOrders[index].status = status;
      setOrders(updatedOrders);
    } catch (error) {
      console.log("Error in updating order status:", error);
    }
  };

  return (
    <>
      <BackgroundImage />
      <h2>{vendorDetails}</h2>
      <div className="table-container-user-details">
        <h1>View Orders</h1>
        <table className="user-table-testing-user-details">
          <thead>
            <tr>
              <th>User ID</th>
              
              <th>Order ID</th>
              <th>Amount</th>
              <th>PackageId</th>
              <th>Package Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order?._id}>
                <td>{order.userId}</td>
                <td>{order?._id}</td>
                
                <td>{order.amount}</td>
               
                <td>{order.packageId}</td>
                <td>{order.packageName}</td>
                <td>
                  {order.status === 'pending' ? (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleStatusChange(index, 'accept')}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleStatusChange(index, 'reject')}
                        style={{ marginLeft: '10px' }}
                      >
                        Reject
                      </Button>
                    </>
                  ) : order.status === 'accept' ? (
                    <Button variant="contained" color="success">
                      Accepted
                    </Button>
                  ) : (
                    <Button variant="contained" color="error">
                      Rejected
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewOrders;
