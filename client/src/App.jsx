import { React, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Navbar from './components/navbar';
import Login from './components/login';
import Signup from './components/signup';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import ProductsList from './components/Products';
import ProductDetail from './components/ProductDetails';
import Categories from './components/Categories';
import Category from './components/Category';
import NoPage from './components/NoPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (Token) => {
    localStorage.setItem('Token', Token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('Token');
    setIsAuthenticated(false);
  };

  const requireAuth = (component) => {
    return isAuthenticated ? component : <Navigate to="/login" />;
  };
  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route index element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<Login onlogin={login} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile onlogout={logout} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:cid" element={<Category />} />
        <Route
          path="/product/:pid"
          element={<ProductDetail isAuthenticated={isAuthenticated} />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
