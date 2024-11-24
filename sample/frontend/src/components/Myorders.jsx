import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { mycontext } from './Context';
import './Myorders.css';

const Myorder = () => {
  const { orders, setOrders ,setIsLoggedIn} = useContext(mycontext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOrderId, setEditOrderId] = useState(null);

  const userEmail=JSON.parse(localStorage.getItem("user")).email
  console.log("userEmail",userEmail);
  
  const [updatedAddress, setUpdatedAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    pincode: '',
    locality: '',
    landmark: '',
    addressType: '',
    phone: ''
  });
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:5000/user/getorders", { userEmail });
        console.log("Fetched orders:", response.data);
        setOrders(response.data.orders || []);
      } catch (error) {
        setError("Failed to fetch orders.");
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
const token=localStorage.getItem("token")
if(token){
  
  fetchOrders();
}
  }, [setOrders]);
  

  const handleCancelOrder = async (orderId) => {
    if (!orderId) return;

    setLoadingAction(true);
    try {
      const response = await axios.delete(`http://localhost:5000/user/cancelorder/${orderId}`, { withCredentials: true });
      console.log("Cancel response:", response);

      if (response.status === 200) {
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        console.log(`Order ${orderId} canceled successfully.`);
      } else {
        setError('Failed to cancel order. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err);
      setError(err.response?.data?.error || 'An error occurred while canceling the order.');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleUpdateAddress = async (orderId) => {
    setLoadingAction(true);
    try {
      await axios.post(`http://localhost:5000/user/updateAddress`, {
        orderId,
        addressDetails: updatedAddress
      }, { withCredentials: true });

      setOrders(prevOrders =>
        prevOrders.map(order => order._id === orderId ? { ...order, address: updatedAddress } : order)
      );
      setEditOrderId(null);
      setUpdatedAddress({
        street: '',
        city: '',
        state: '',
        zip: '',
        pincode: '',
        locality: '',
        landmark: '',
        addressType: '',
        phone: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while updating the address.');
    } finally {
      setLoadingAction(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setOrders([]); // Clear orders if not logged in
    }
  }, [setIsLoggedIn, setOrders]);


  const handleEditClick = (order) => {
    setEditOrderId(order._id);
    setUpdatedAddress({ ...order.address });
  };

  return (
    <div className="order-container">
      <h2>Your Orders</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      <ul className="order-list">
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map(order => (
            <li key={order._id} className="order-item">
              <div className="order-details">
                <h3>{order.product?.name || 'Product name not available'} (x{order.quantity})</h3>
                <p>Status: <strong>{order.status}</strong></p>
                <div className="address-section">
                  <h4>Address:</h4>
                  <p>
                    {order.address?.street || 'Street not available'},<br />
                    {order.address?.city || 'City not available'},<br />
                    {order.address?.state || 'State not available'} - {order.address?.zip || 'ZIP not available'}<br />
                    {order.address?.landmark && `Landmark: ${order.address.landmark}`}<br />
                    {order.address?.addressType && `Address Type: ${order.address.addressType}`}<br />
                    {order.address?.phone && `Phone: ${order.address.phone}`}
                  </p>
                </div>
                <p>User Email: {order.userEmail || 'Email not available'}</p>
                <p>Category: {order.productCategory || 'Category not available'}</p>
                <p>Price: <strong>${order.productPrice || 'Price not available'}</strong></p>
                {order.productImage && (
                  <img src={order.productImage} alt={order.product?.name} className="product-image" />
                )}
              </div>
              {/* <div className="order-actions">
                <button className="delete-button" onClick={() => handleCancelOrder(order._id)} disabled={loadingAction}>
                  {loadingAction ? 'Cancelling...' : 'Cancel Order'}
                </button>
                {editOrderId === order._id ? (
                  <div className="edit-address">
                    <h4>Edit Address</h4>
                    {Object.keys(updatedAddress).map((key) => (
                      <input
                        key={key}
                        type="text"
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={updatedAddress[key]}
                        onChange={e => setUpdatedAddress({ ...updatedAddress, [key]: e.target.value })}
                      />
                    ))}
                    <button className="save-button" onClick={() => handleUpdateAddress(order._id)} disabled={loadingAction}>
                      {loadingAction ? 'Saving...' : 'Save Address'}
                    </button>
                  </div>
                ) : (
                  <button className="edit-button" onClick={() => handleEditClick(order)}>Edit Address</button>
                )}
              </div> */}
            </li>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </ul>
    </div>
  );
};

export default Myorder;