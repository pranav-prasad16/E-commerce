import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/categories">Categories</Link>
      {isAuthenticated ? (
        <>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">Profile</Link>
        </>
      ) : (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
