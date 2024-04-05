import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const [userData, setUserData] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Set loading state to true before making the API request
    try {
      const response = await axios.post(
        'http://localhost:3000/api/login',
        userData
      );
      if (response.status === 200) {
        const json = await response.json();
        const { token, userId } = json;
        login(userId, token);
        navigate('/home');
      } else {
        // Error occurred
        const json = await response.json(); // Get the error message as text
        const errorResponse = json.message;
        setErrorMessage(errorResponse); // Set the error message state
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.'); // Set a generic error message
    } finally {
      setLoading(false); // Set loading state to false after the API request completes
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
      <h1>Login</h1>
      <form className="login-form">
        <div className="form-container">
          <label>Email / phone no. : </label>
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Enter your email / phone no."
            value={userData.emailOrPhone}
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
        {/* Error message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>
          <button
            type="button"
            onClick={handleLogin}
            className="btn form-btn"
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
