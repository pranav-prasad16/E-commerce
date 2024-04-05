import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/profile');
      console.log(response.data);
      const { users, allOrders } = response.data;
      setUserInfo(users);
      setOrderHistory(allOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error : ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleImageChange = (e) => {};

  return (
    <>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div className="container">
          <h1>Profile</h1>
          <div className="personal-info">
            <h2>Personal Information : </h2>
            <h3>
              Name : {userInfo.firstName} {userInfo.lastName}
            </h3>
            <h3>Email : {userInfo.email}</h3>
            <h3>Phone : {userInfo.phone}</h3>
            <h3>Password : {userInfo.password}</h3>
            <h3>Shipping Address : {userInfo.shippingAddress}</h3>
            <h3>Billing Address : {userInfo.billingAddress}</h3>
            <h3>City : {userInfo.city}</h3>
            <h3>Street : {userInfo.street}</h3>
            <h3>Pin : {userInfo.pinCode}</h3>
            <h3>Country : {userInfo.country}</h3>
            <button type="button" onClick={updateUser} className="btn">
              Change
            </button>
          </div>
          <div className="order-info">
            <h2>Order History : </h2>
            {orderHistory.length === 0 ? (
              <p>No orders found</p>
            ) : (
              <ul>
                {orderHistory.map((order) => (
                  <li id={order._id}>
                    <p>Total Amount : ${order.totalAmount.toFixed(2)}</p>
                    <p>
                      Order Date:{' '}
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    <p>Shipping Address: {order.shippingAddress}</p>
                    <ul>
                      {order.products.map((product) => (
                        <li key={product.productId}>
                          <p>Product ID: {product.productId}</p>
                          <p>Quantity: {product.quantity}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
