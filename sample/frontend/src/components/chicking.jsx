import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mycontext } from './Context';
import axios from "axios";
import Footer from './Footer';
import { FaShoppingCart } from "react-icons/fa";
import Chickingcarousel from './Chickingcarousel';

const Chicking = () => {
  const { products = [], setProducts, isLoggedIn } = useContext(mycontext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    fetchChickingProducts();
  }, []);

  const fetchChickingProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/user/products/category/Chicking",
        { withCredentials: true }
      );
      console.log("Fetched products:", response.data); // Log to verify response

      const updatedProducts = response.data.map(product => ({
        ...product,
        inCart: cartItems.includes(product._id),
      }));

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
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
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

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
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/user/cart`, {
        data: { productId },
        withCredentials: true,
      });

      const updatedCartItems = cartItems.filter(item => item !== productId);
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      const updatedProducts = products.map(product =>
        product._id === productId ? { ...product, inCart: false } : product
      );
      setProducts(updatedProducts);
      alert("Product removed from cart successfully");
    } catch (error) {
      console.error("Error removing product from cart:", error);
      alert("Failed to remove product from cart");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Chickingcarousel />

      <div className='main-section'>
        <div className='card-container'>
          {products.length === 0 ? (
            <p>No products available in this category.</p>
          ) : (
            products.map((product) => (
              <div 
                key={product._id}
                className="pet-card" 
                onDoubleClick={() => navigate(`/product/${product._id}`)}
              >
                <div className="pet-card-image-container">
                  <img src={product.image} className="pet-card-image" alt={product.name} />
                </div>
                <div className="pet-card-details">
                  <h3 className="pet-info">
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
            ))
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Chicking;
