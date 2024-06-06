import React, { useEffect, useState } from 'react';
import axiosInstance from '../pages/axiosInstance';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import './userorderlist.css';


const UserOrderList = () => {

    const [order, setOrder] = useState([]);


    const getStatusButtonStyle = (status) => {
        switch (status) {
            case 'pending':
                return { backgroundColor: 'orange', color: 'white' };
            case 'complete':
                return { backgroundColor: 'green', color: 'white' };
            case 'approve':
                return { backgroundColor: 'blue', color: 'white' };
            case 'reject':
                return { backgroundColor: 'red', color: 'white' };
            default:
                return { backgroundColor: 'gray', color: 'white' };
        }
    };

    
    


    
        useEffect(() => {
            // Fetch order data from API
            const fetchOrders = async () => {
                try {
                    const response = await axiosInstance.get(`https://nextevent-backend.onrender.com/api/v1/orders/getuserorder`,
                        {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        });
                    if (response.status === 200) {
                        console.log('Orders fetched successfully:', response.data);
                        setOrder(response.data.data); // Adjust this based on your API response
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            };
    
            fetchOrders();
        }, []);
    
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="order table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="right">User ID</TableCell>
                            <TableCell align="right">Vendor ID</TableCell>
                            <TableCell align="right">Package ID</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">Event Date</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.map((order, index) => (
                            <TableRow key={order._id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {order._id}
                                </TableCell>
                                <TableCell align="right">{order.userId}</TableCell>
                                <TableCell align="right">{order.vendorId}</TableCell>
                                <TableCell align="right">{order.packageId}</TableCell>
                                <TableCell align="right">{order.locations}</TableCell>
                                <TableCell align="right">{new Date(order.eventDate).toLocaleDateString()}</TableCell>
                                <TableCell align="right">{order.description}</TableCell>
                                <TableCell align="right">{order.amount}</TableCell>
                                <TableCell align="right">
                                    <Button style={getStatusButtonStyle((order.status).toLowerCase())} variant="contained">
                                        {order.status}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };
    
    export default UserOrderList;
    

