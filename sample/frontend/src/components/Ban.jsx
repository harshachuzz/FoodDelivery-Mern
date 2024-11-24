// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import './Ban.css';

// const UserManagement = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             setLoading(true);
//             setError(null);
//             const response = await axios.get("http://localhost:5000/user/users");
//             setUsers(response.data.users);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//             setError("Failed to load users. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const banUser = async (id) => {
//         try {
//             await axios.put("http://localhost:5000/users/ban", {
//                 userId: id,
//                 banned: true,
//             });
//             fetchUsers();
//         } catch (error) {
//             console.error("Error banning user:", error);
//             setError("Failed to ban the user.");
//         }
//     };

//     const unbanUser = async (id) => {
//         try {
//             await axios.put("http://localhost:5000/users/unban", {
//                 userId: id,
//                 banned: false,
//             });
//             fetchUsers();
//         } catch (error) {
//             console.error("Error unbanning user:", error);
//             setError("Failed to unban the user.");
//         }
//     };

//     return (
//         <div className="user-management-container">
//             <h2>User Management</h2>
//             {loading && <p className="loading-message">Loading users...</p>}
//             {error && <p className="error-message">{error}</p>}
//             <table className="user-management-table">
//                 <thead>
//                     <tr>
//                         <th>Username</th>
//                         <th>Email</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user) => (
//                         <tr key={user._id}>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td className={user.bannedUser ? "status-true" : "status-false"}>
//                                 {user.bannedUser ? "Banned" : "Active"}
//                             </td>
//                             <td>
//                                 {user.bannedUser ? (
//                                     <button onClick={() => unbanUser(user._id)} className="unban-button">Unban</button>
//                                 ) : (
//                                     <button onClick={() => banUser(user._id)} className="ban-button">Ban</button>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default UserManagement;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch users from the backend
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/user/users'); // Assuming your backend is set up to return all users
//         setUsers(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching users');
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Ban a user
//   const banUser = async (userId) => {
//     try {
//       await axios.put('http://localhost:5000/user/users/ban', { userId, banned: true });
//       setUsers(users.map(user => user._id === userId ? { ...user, bannedUser: true } : user));
//     } catch (err) {
//       setError('Error banning user');
//     }
//   };

//   // Unban a user
//   const unbanUser = async (userId) => {
//     try {
//       await axios.put('http://localhost:5000/user/users/unban', { userId, banned: false });
//       setUsers(users.map(user => user._id === userId ? { ...user, bannedUser: false } : user));
//     } catch (err) {
//       setError('Error unbanning user');
//     }
//   };

//   return (
//     <div className="user-management-container">
//       <h2>User Management</h2>
//       {loading && <p className="loading-message">Loading users...</p>}
//       {error && <p className="error-message">{error}</p>}
//       <table className="user-management-table">
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td className={user.bannedUser ? "status-true" : "status-false"}>
//                 {user.bannedUser ? "Banned" : "Active"}
//               </td>
//               <td>
//                 {user.bannedUser ? (
//                   <button onClick={() => unbanUser(user._id)} className="unban-button">Unban</button>
//                 ) : (
//                   <button onClick={() => banUser(user._id)} className="ban-button">Ban</button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserManagement;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Initializing as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/users'); // Assuming your backend is set up to return all users
        if (Array.isArray(response.data)) { // Check if the response is an array
          setUsers(response.data);
        } else {
          setError('Invalid data format');
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Ban a user
  const banUser = async (userId) => {
    try {
      await axios.put('http://localhost:5000/user/users/ban', { userId, banned: true });
      setUsers(users.map(user => user._id === userId ? { ...user, bannedUser: true } : user));
    } catch (err) {
      setError('Error banning user');
    }
  };

  // Unban a user
  const unbanUser = async (userId) => {
    try {
      await axios.put('http://localhost:5000/user/users/unban', { userId, banned: false });
      setUsers(users.map(user => user._id === userId ? { ...user, bannedUser: false } : user));
    } catch (err) {
      setError('Error unbanning user');
    }
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      {loading && <p className="loading-message">Loading users...</p>}
      {error && <p className="error-message">{error}</p>}
      <table className="user-management-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className={user.bannedUser ? "status-true" : "status-false"}>
                  {user.bannedUser ? "Banned" : "Active"}
                </td>
                <td>
                  {user.bannedUser ? (
                    <button onClick={() => unbanUser(user._id)} className="unban-button">Unban</button>
                  ) : (
                    <button onClick={() => banUser(user._id)} className="ban-button">Ban</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
