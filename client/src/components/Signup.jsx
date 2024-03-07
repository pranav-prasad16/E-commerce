import React from 'react';
import { useState } from 'react';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    console.log(firstName, lastName, email, phone, password);
  };
  return (
    <>
      <div className="container">
        <h1>Signup</h1>
        <form className="signup-form">
          <div className="form-container">
            <label>First Name : </label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="form-container">
            <label>Last Name : </label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="form-container">
            <label>Email : </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-container">
            <label>Phone : </label>
            <input
              type="text"
              placeholder="Enter your phone no."
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="form-container">
            <label>Password : </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleSignup}
              className="btn form-btn"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
