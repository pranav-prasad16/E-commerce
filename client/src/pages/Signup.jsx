import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    shippingAddress: '',
    billingAddress: '',
    city: '',
    street: '',
    pinCode: '',
    country: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3000/api/signup',
        userData
      );
      if (response.status === 200) {
        console.log('Sign up successful:', response.data);
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form className="signup-form">
        {/* Input fields for user data */}
        <div className="form-container">
          <label>First Name : </label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={userData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-container">
          <label>Last Name : </label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={userData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-container">
          <label>Email : </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-container">
          <label>Phone : </label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone no."
            value={userData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-container">
          <label>Password : </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-container">
          <label>Shipping Address : </label>
          <input
            type="text"
            name="shippingAddress"
            placeholder="Enter your shipping address"
            value={userData.shippingAddress}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-container">
          <label>Billing Address : </label>
          <input
            type="text"
            name="billingAddress"
            placeholder="Enter your billing address"
            value={userData.billingAddress}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-container">
          <label>City : </label>
          <input
            type="text"
            name="city"
            placeholder="Enter your city"
            value={userData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-container">
          <label>Street : </label>
          <input
            type="text"
            name="street"
            placeholder="Enter your street"
            value={userData.street}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-container">
          <label>Pin Code : </label>
          <input
            type="text"
            name="pinCode"
            placeholder="Enter your pin code"
            value={userData.pinCode}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-container">
          <label>Country : </label>
          <input
            type="text"
            name="country"
            placeholder="Enter your country"
            value={userData.country}
            onChange={handleInputChange}
          />
        </div>
        {/* Error message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Signup button */}
        <div>
          <button
            type="button"
            onClick={handleSignup}
            className="btn form-btn"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
