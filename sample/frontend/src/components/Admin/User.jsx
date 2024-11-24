// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import Navbar from '../Navbar';
// import { mycontext } from '../Context';
// // import User from '../../../../backend/models/usermodel';
// // import '../Admin/user.css';

// const AdminUser = () => {
//   const { orders, setOrders } = useContext(mycontext);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const[users,setUsers] = useState()

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const { data } = await axios.get('http://localhost:5000/user/users', { withCredentials: true });
//       setOrders(Array.isArray(data.orders) ? data.orders : []);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       setError('Failed to fetch orders. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await axios.delete(`http://localhost:5000/users/${userId}`, { withCredentials: true });
//         setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
//         alert("User deleted successfully.");
//       } catch (error) {
//         console.error('Error deleting user:', error);
//         setError(error.response?.data?.error || 'Failed to delete user. Please try again later.');
//       }
//     }
//   };
  

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <p className="loading-message">Loading orders...</p>;
//   }

//   return (
//     <div className='order-management-container'>
//       <h1 className="title">Order Management</h1>
//       {error && <p className="error-message">{error}</p>}
//       {orders.length > 0 ? (
//         <table className="order-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>User Email</th>
//               <th>Product Name</th>
//               <th>Image</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Order Date</th>
//               <th>Payment Status</th>
//               <th>Shipping Address</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.userId ? order.userId.email : 'User information not available'}</td>
//                 <td>{order.product ? order.product.name : 'Product information not available'}</td>
//                 <td>
//                   {order.product && order.product.image.length > 0 ? (
//                     <img
//                       src={order.product.image[0]}
//                       alt={order.product.name}
//                       className="product-image"
//                     />
//                   ) : (
//                     'No image available'
//                   )}
//                 </td>
//                 <td>${order.product ? order.product.price.toFixed(2) : 'N/A'}</td>
//                 <td>{order.quantity}</td>
//                 <td>{new Date(order.orderDate).toLocaleString()}</td>
//                 <td>{order.paymentStatus}</td>
//                 <td>
//                   {order.address ? (
//                     <div>
//                       <p>{order.address.address}</p>
//                       <p>{order.address.locality}, {order.address.city}</p>
//                       <p>{order.address.state} - {order.address.pincode}</p>
//                     </div>
//                   ) : 'Shipping address not available'}
//                 </td>
//                 <td>
//                   <button
//                     className="delete-order-button"
//                     onClick={() => handleDeleteOrder(order._id)}
//                   >
//                     Delete Order
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default AdminUser;



import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("useEffect");
    
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/users", {
          withCredentials: true,
        });
        console.log("API Response:", response.data); // Debugging
        if (response.data.success) {
          setUsers(response.data.users);
        } else {
          setError("Failed to fetch users.");
        }
      } catch (err) {
        console.error("Error fetching users:", err); // Debugging
        setError("An error occurred while fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={user._id || index}>
            <strong>Name:</strong> {user.name || "N/A"} <br />
            <strong>Email:</strong> {user.email || "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUser;








// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import Navbar from '../Navbar';
// import { mycontext } from '../Context';

// const AdminUser = () => {
//   const {users,setUsers } = useState([])
 
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const { data } = await axios.get('http://localhost:5000/user/users', { withCredentials: true });

//       setUsers(Array.isArray(data.users) ? data.users : []);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setError('Failed to fetch users. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await axios.delete(`http://localhost:5000/users/${userId}`, { withCredentials: true });
//         setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
//         alert("User deleted successfully.");
//       } catch (error) {
//         console.error('Error deleting user:', error);
//         setError(error.response?.data?.error || 'Failed to delete user. Please try again later.');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   if (loading) {
//     return <p className="loading-message">Loading users...</p>;
//   }

//   return (
//     <div className='user-management-container'>
//       <h1 className="title">User Management</h1>
//       {error && <p className="error-message">{error}</p>}
//       {Array.isArray(users) && users.length > 0 ? (
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th>User ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user._id}>
//                 <td>{user._id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <button
//                     className="delete-user-button"
//                     onClick={() => handleDeleteUser(user._id)}
//                   >
//                     Delete User
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No users found.</p>
//       )}
//     </div>
//   );
// };

// export default AdminUser;
