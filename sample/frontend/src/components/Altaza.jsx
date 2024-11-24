
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { mycontext } from './Context';
import axios from "axios";
import './Altazacarousel';
import Footer from './Footer';

import { FaInstagram, FaHeart, FaTwitter, FaRegHeart,FaShoppingCart, FaFacebookF } from "react-icons/fa";


const Altaza= () => {
  const { products, setProducts,isLoggedIn, setIsLoggedIn } = useContext(mycontext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  

  useEffect(() => {
    fetchaltazaProducts();
  }, []);

  const fetchaltazaProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/user/products/category/Altaza",
        { withCredentials: true }
      );

      const updatedProducts = response.data.map(product => ({
        ...product,
        inCart: cartItems.includes(product._id), // Check if product is in cart
      }));

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching dog products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCartAction = async (product) => {
    if (!isLoggedIn) {
      alert("You need to log in to add items to the cart.");
      return;
    }

    if (product.inCart) {
      await removeFromCart(product._id);
    } else {
      await addToCart(product._id);
    }
  };
  
  const addToCart = async (productId) => {
    if (!isLoggedIn) {
      alert("You need to log in to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/user/addToCart",
        { productId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const updatedCartItems = [...cartItems, productId];
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Persist cart items

        const updatedProducts = products.map(product =>
          product._id === productId ? { ...product, inCart: true } : product
        );
        setProducts(updatedProducts);
        alert("Product added to cart successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Product already in cart");
      } else {
        console.error("Error adding product to cart:", error);
        alert("Failed to add product to cart");
      }
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/user/cart`, {
        data: { productId },
        withCredentials: true,
      });

      const updatedCartItems = cartItems.filter(item => item !== productId);
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Persist cart items

      const updatedProducts = products.map(product =>
        product._id === productId ? { ...product, inCart: false } : product
      );
      setProducts(updatedProducts);
      alert("Product removed from cart successfully");
    } catch (err) {
      console.error("Error removing product from cart:", err);
      alert("Failed to remove product from cart");
    }
  };


  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const handleLogin = () => {
    // Logic for logging in
    setIsLoggedIn(true);
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems); // Update context state
  // Refetch products to update cart state
  };
  
  
  const handleLogout = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    setIsLoggedIn(false);
    alert("You have been logged out.");
  };
  ;const handleDoubleClick = (id) => {
    navigate(`/product/${id}`);
  };
  
  return (
    <div>
      <Altaza/> {/* Move Scoopscarousel to the top */}
      
      <div className='main-section'>
        <div>
          {/* Category buttons */}
        </div>
        <div className='card-container'>
          {products.map((product) => (
            <div 
              key={product._id}
              className="pet-card" 
              onDoubleClick={() => handleDoubleClick(product._id)}
            >
              <div className="pet-card-image-container">
                <img src={product.image} className="pet-card-image" alt={product.name} />
              </div>
              <div className="pet-card-details">
                <h3 className="pet-info">
                  <span className="pet-gender"></span> 
                  <span className="pet-category">{product.category}</span>
                </h3>
                <h3 className="pet-breed">{product.rating}</h3>
                <h4 className="pet-card-price">Price: ₹{product.price}</h4>
                <div className="pet-cardg-buttons">
                  <button className='cartg-button' onClick={() => handleCartAction(product)}>
                    <FaShoppingCart className="cart-icon" />
                    {cartItems.includes(product._id) ? "Remove from Cart" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
  export default Altaza;   