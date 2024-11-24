import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mycontext } from "./Context";
import "./Cart.css";



export default function Cart() {
  const { cartItems,setCartItems, setIsLoggedIn, isLoggedIn } = useContext(mycontext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartItemsstate, setCartItemsState] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchCartItems(); // Fetch cart items if user is logged in
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      setCartItemsState([]);
      setCartItems([]); // Clear context cart items
      setTotalAmount(0); // Reset total amount
      localStorage.removeItem("cartItems"); // Clear local storage
    } else {
      // Load cart items from local storage if user is logged in
      const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItemsState(savedCart);
      setCartItems(savedCart); // Update context
      calculateTotalAmount(savedCart);
    }
  }, [isLoggedIn, setCartItems]);

  const fetchCartItems = async () => {
    if (!isLoggedIn) return; // Only fetch if logged in
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/user/cart", {
        withCredentials: true,
      });
      const fetchedCart = response.data.cart;
      setCartItemsState(fetchedCart);
      setCartItems(fetchedCart); // Update context
      localStorage.setItem("cartItems", JSON.stringify(fetchedCart)); // Save to local storage
      calculateTotalAmount(fetchedCart);
    } catch (err) {
      setError("Failed to fetch cart items");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);
    setTotalAmount(total);
  };

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update local storage
  };

  const handleIncrease = (productId) => {
    const updatedCart = cartItems.map(item =>
      item._id === productId ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    setCartItemsState(updatedCart);
    setCartItems(updatedCart); // Update context
    updateLocalStorage(updatedCart); // Update local storage
    calculateTotalAmount(updatedCart);
  };

  const handleDecrease = (productId) => {
    const updatedCart = cartItems.map(item =>
      item._id === productId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    setCartItemsState(updatedCart);
    setCartItems(updatedCart); // Update context
    updateLocalStorage(updatedCart); // Update local storage
    calculateTotalAmount(updatedCart);
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete("http://localhost:5000/user/cart", {
        data: { productId },
        withCredentials: true,
      });
      const updatedCart = cartItems.filter(item => item._id !== productId);
      setCartItemsState(updatedCart);
      setCartItems(updatedCart); // Update context
      updateLocalStorage(updatedCart); // Update local storage
      calculateTotalAmount(updatedCart);
    } catch (err) {
      console.error("Error removing product from cart:", err);
      setError("Failed to remove product from cart");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <header className="bod">
      <div className="container">
        <h1 className="cart-title">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            <h2 className="cart-subtitle">Cart Items:</h2>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id} className="cart-item">
                  <img src={item.image} alt={item.name} className="product-image" />
                  <div className="item-details">
                    <strong>{item.name}</strong>
                    <p>Category: {item.category}</p>
                    <p>restaurantname: {item.restaurantname}</p>
                    <p>Price: ₹{item.price}</p>
                    <p>Dishname: ₹{item.dishname}</p>

                    <p>Quantity: {item.qty || 1}</p>
                    <p>Total: ₹{parseInt(item.price) * (item.qty || 1)}</p>
                  </div>
                  <div className="item-actions">
                    <button className="buttoonn" onClick={() => handleIncrease(item._id)}>+</button>
                    <button className="buttounn" onClick={() => handleDecrease(item._id)}>-</button>
                    <button className="buttonn" onClick={() => removeFromCart(item._id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="total-amount">Total Amount: ₹{totalAmount}</h3>
          </div>
        )}
      </div>
    </header>
  );
}
