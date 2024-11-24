import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart, FaUserPlus, FaSearch, FaClipboardList } from 'react-icons/fa'; // Import FaClipboardList for My Orders icon
import './Navbar.css';
import Carousel from './Carousel';
import Footer from './Footer';
import Categories from './Categories';
import Banner from './Banner';
import FeaturedRestaurants from './FeaturedRestaurants';
import Main from './Admin/Main';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if user is logged in
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?query=${searchInput}`);
      setSearchInput('');
      closeMobileMenu();
    }
  };

  const handleLogout = () => {
    // Clear any stored authentication tokens or user data here
    setIsAuthenticated(false);
    navigate('/'); // Redirect to the homepage after logout
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            FoodieExpress <i className="fas fa-utensils"></i>
          </Link>

          <div className="menu-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/menu" className="nav-links" onClick={closeMobileMenu}>
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/deals" className="nav-links" onClick={closeMobileMenu}>
                Deals
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-links" onClick={closeMobileMenu}>
                <FaShoppingCart /> Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/myorders" className="nav-links" onClick={closeMobileMenu}>
                <FaClipboardList /> My Orders
              </Link>
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <button className="nav-links" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                  <FaUserPlus /> Login
                </Link>
              )}
            </li>
          </ul>

          {/* Search bar */}
          <form className="nav-search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for food..."
              value={searchInput}
              onChange={handleInputChange}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <FaSearch />
            </button>
          </form>
        </div>
      </nav>

      <Carousel />
      <Categories />
      <Main />
      <FeaturedRestaurants />
      <Banner />
      <Footer />
    </header>
  );
};

export default Navbar;



