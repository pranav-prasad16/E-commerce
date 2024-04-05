import { React, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ProductsList from './pages/Products';
import ProductDetail from './pages/ProductDetails';
import CategoriesList from './pages/Categories';
import Category from './pages/Category';
import NoPage from './pages/NoPage';
// import { useAuth } from './context/AuthContext';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/category/:cid" element={<Category />} />
        <Route path="/product/:pid" element={<ProductDetail />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
