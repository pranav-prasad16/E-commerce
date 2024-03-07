import React from 'react';
import { useState } from 'react';

function Profile() {
  const [firstName, setFirstName] = useState('first');
  const [lastName, setLastName] = useState('last');
  const [email, setEmail] = useState('email');
  const [phone, setPhone] = useState('phone');
  const [password, setPassword] = useState('password');
  const [shippingAddress, setShippingAddress] = useState('shippingAddress');
  const [billingAddress, setBillingAddress] = useState('billingAddress');
  const [street, setStreet] = useState('street');
  const [city, setCity] = useState('city');
  const [pinCode, setPinCode] = useState('pinCode');
  const [country, setCountry] = useState('country');

  const fetchUserDetails = () => {};

  const fetchOrderDetails = () => {};

  const fetchPaymentInformation = () => {};

  const updateUser = () => {
    console.log(
      firstName,
      lastName,
      email,
      phone,
      password,
      shippingAddress,
      billingAddress,
      street,
      city,
      pinCode,
      country
    );
  };
  return (
    <>
      <div className="container">
        <h1>Profile</h1>
        <div className="personal-info">
          <h2>Personal Information : </h2>
          <h3>
            Name : {firstName} {lastName}
          </h3>
          <h3>Email : {email}</h3>
          <h3>Phone : {phone}</h3>
          <h3>Password : {password}</h3>
          <h3>Shipping Address : {shippingAddress}</h3>
          <h3>Billing Address : {billingAddress}</h3>
          <h3>City : {city}</h3>
          <h3>Street : {street}</h3>
          <h3>Pin : {pinCode}</h3>
          <h3>Country : {country}</h3>
          <button type="button" onClick={updateUser} className="btn">
            Change
          </button>
        </div>
        <div className="order-info">
          <h2>Order History : </h2>
        </div>
      </div>
    </>
  );
}

export default Profile;
