import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { mycontext } from "./Context";
import './FoodDetails.css';

export default function FoodDetails() {
  const { productId } = useParams();
  const { cartItems, setCartItems } = useContext(mycontext);
  const [specificProduct, setSpecificProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecificProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/user/products/${productId}`,
          { withCredentials: true }
        );
        setSpecificProduct(response.data.specificProduct);
        setInCart(cartItems.includes(productId));
      } catch (error) {
        console.error("Error fetching specific product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecificProduct();
  }, [productId, cartItems]);

  const addToCart = async () => {
    try {
      if (!inCart) {
        const response = await axios.post(
          `http://localhost:5000/user/products/cart/${productId}`,
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          setCartItems((prevCartItems) => [...prevCartItems, productId]);
          setInCart(true);
          alert("Product added to cart");
        }
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const removeFromCart = async () => {
    try {
      if (inCart) {
        const response = await axios.delete(
          `http://localhost:5000/user/products/cart/${productId}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setCartItems((prevItems) => prevItems.filter((item) => item !== productId));
          setInCart(false);
          alert("Product removed from cart");
        }
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };
  

  return (
    <div className="food-details-container">
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : specificProduct ? (
        <>
          <h1 className="food-name">{specificProduct.name}</h1>
          <img src={specificProduct.image} alt="product" className="food-image" />
          <div className="food-info">
            <p><strong>Author:</strong> {specificProduct.author}</p>
            <p><strong>Category:</strong> {specificProduct.category}</p>
            <p><strong>Dishname:</strong> {specificProduct.dishname}</p>

            <p className="food-price"><strong>Price:</strong> ${specificProduct.price}</p>
            <p><strong>Stock:</strong> {specificProduct.stock}</p>
            <p><strong>Description:</strong> {specificProduct.description}</p>
          </div>
          <div className="button-group">
            <button onClick={() => navigate(`/buy/${specificProduct._id}`)} className="buy-now-button">
              Buy Now
            </button>
            {/* {!inCart ? (
              <button onClick={addToCart} className="add-to-cart-button">Add to Cart</button>
            ) : (
              <button onClick={removeFromCart} className="remove-from-cart-button">Remove from Cart</button>
            )} */}
          </div>
        </>
      ) : (
        <p className="not-found-message">Product not found</p>
      )}
    </div>
  );
}
