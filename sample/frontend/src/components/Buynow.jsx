import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { mycontext } from "./Context";
import './Buynow.css';

export default function Buynow() {
  const { productId } = useParams();
  const [specificProduct, setSpecificProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expirationDate: '', cvv: '' });
  const navigate = useNavigate();

  // Extract address details from context
  const { addressDetails, setAddressDetails } = useContext(mycontext);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/products/${productId}`, { withCredentials: true });
        setSpecificProduct(response.data.specificProduct);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const validateAddress = () => {
    const requiredFields = ["pincode", "locality", "address", "city", "state", "landmark", "addressType", "phone"];
    const missingFields = requiredFields.filter(field => !addressDetails[field]?.trim());
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
      return false;
    }
    return true;
  };

  const handleBuyNow = () => {
    if (!validateAddress() || quantity <= 0) {
      return;
    }
    setShowPaymentOptions(true);
  };

  const handlePaymentMethodSelection = (method) => {
    setPaymentMethod(method);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, Math.min(parseInt(e.target.value), specificProduct.stock));
    setQuantity(newQuantity);
  };

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    setIsLoading(true);
    const headers = { Authorization: `Bearer ${token}` };
    const payload = {
      productId,
      quantity,
      addressDetails,
      paymentMethod,
      ...(paymentMethod === 'online_payment' && { cardDetails }),
    };

    try {
      const response = await axios.post("http://localhost:5000/user/buy", payload, { headers, withCredentials: true });
      setSuccessMessage(paymentMethod === 'cash_on_delivery' 
        ? "Order placed successfully! Please pay cash on delivery." 
        : "Payment successful! Your order has been placed."
      );
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate("/navbar");
      }, 3000);
    } catch (error) {
      console.error("Error during purchase:", error.response?.data || error);
      alert(error.response?.data?.error || "There was an issue completing your purchase.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="buy-now">
      <div className="buy-now-container">
        {loading ? (
          <p>Loading...</p>
        ) : specificProduct ? (
          <div className="buy-now-content">
            <h1 className="product-title">{specificProduct.category}</h1>
            <img src={specificProduct.image} alt={specificProduct.dishname} className="product-image" />
            <p className="product-price">Price: ₹{specificProduct.price.toFixed(2)}</p>
            <p className="product-description">{specificProduct.restaurantname}</p>
            <p className="product-dishname">{specificProduct.dishname}</p>
          
            <p className="stock">Stock available: {specificProduct.stock}</p>
            {specificProduct.stock === 0 && <p className="out-of-stock">Out of stock</p>}

            <div className="purchase-details">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                max={specificProduct.stock}
                className="quantity-input"
              />

              <h3>Shipping Address:</h3>
              {Object.keys(addressDetails).map((key) => (
                <div key={key}>
                  <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                  <input
                    type={key === 'phone' ? 'tel' : 'text'}
                    id={key}
                    value={addressDetails[key]}
                    onChange={(e) => setAddressDetails({ ...addressDetails, [key]: e.target.value })}
                    placeholder={`Enter your ${key}`}
                    className="address-input"
                  />
                </div>
              ))}
            </div>

            <button onClick={handleBuyNow} className="buy-now-button" disabled={isLoading}>
              {isLoading ? "Processing..." : "Confirm Purchase"}
            </button>

            {showPaymentOptions && (
              <div className="payment-options">
                <h3>Select Payment Method:</h3>
                <button onClick={() => handlePaymentMethodSelection('cash_on_delivery')} className="payment-option-button">
                  Cash on Delivery
                </button>
                <button onClick={() => handlePaymentMethodSelection('online_payment')} className="payment-option-button">
                  Online Payment
                </button>
              </div>
            )}

            {paymentMethod && (
              <div className="payment-confirmation">
                {paymentMethod === 'cash_on_delivery' ? (
                  <>
                    <p>You have selected Cash on Delivery. Please confirm your order.</p>
                    <button onClick={handleConfirmOrder} className="confirm-button">Confirm Order</button>
                  </>
                ) : (
                  <>
                    <h3>Enter Card Details:</h3>
                    <label>Card Number:</label>
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                      placeholder="Enter card number"
                      className="card-input"
                    />

                    <label>Expiration Date:</label>
                    <input
                      type="text"
                      value={cardDetails.expirationDate}
                      onChange={(e) => setCardDetails({ ...cardDetails, expirationDate: e.target.value })}
                      placeholder="MM/YY"
                      className="card-input"
                    />

                    <label>CVV:</label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      placeholder="Enter CVV"
                      className="card-input"
                    />
                    <button onClick={handleConfirmOrder} className="confirm-button">Confirm Payment</button>
                  </>
                )}
              </div>
            )}

            {showSuccessAlert && (
              <div className="success-alert">
                <div className="alert-content">
                  <div className="alert-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="tick-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                  <div className="alert-message">{successMessage}</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Product not found</p>
        )}
      </div>
    </main>
  );
}
