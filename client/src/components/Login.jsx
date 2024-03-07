import React from 'react';
import { useState } from 'react';

function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState(''); // either email or phone no.
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(emailOrPhone, password);
  };
  return (
    <>
      <div className="container">
        <h1>Login</h1>
        <form className="login-form">
          <div className="form-container">
            <label>Email / phone no. : </label>
            <input
              type="text"
              placeholder="Enter your email / phone no."
              value={emailOrPhone}
              onChange={(event) => setEmailOrPhone(event.target.value)}
            />
          </div>
          <div className="form-container">
            <label> Password : </label>
            <input
              type="text"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleLogin}
              className="btn form-btn"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
