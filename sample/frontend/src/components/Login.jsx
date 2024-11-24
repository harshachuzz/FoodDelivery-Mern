import { useContext, useState, useEffect } from "react";
import { mycontext } from "./Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const notify = () => toast("Login successful!");
  const nav = useNavigate();
  const { setToken, isLoggedIn, setIsLoggedIn, setCartItems } = useContext(mycontext);

  // Local state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/cart", {
        withCredentials: true,
      });
      setCartItems(response.data.cart);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  // Check for token in local storage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // If there's a token, the user is logged in
      fetchCartItems(); // Optionally fetch cart items if they are logged in
    }
  }, [setIsLoggedIn, setCartItems]);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:5000/user/login",
        { email, password },
        { withCredentials: true }
      );
  
      const data = response.data; // This may be undefined if the request failed.
      console.log("Banned", data)
      if(data.status === 403){
        toast.error('Your account has been banned. Please contact our support team.');
        return;
      }
  
      // Store user details and token in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("token in frontEnd", data.token);
      console.log("Login successful", data.message);
      // Set user token in context
      setToken(data.token);
  
      // Update login status
      setIsLoggedIn(true);
  
      // Notify user and navigate to home page
      notify();
      nav("/navbar");
    } catch (error) {
      // Check if error.response exists before accessing error.response.data
      if (error.response) {
        console.log(error.response.data); // This will show the server's response error message
        alert(error.response.data.message || "Login failed");
      } else {
        console.error("Error:", error.message);
        toast.error("Network error or server is down.");
      }
    }
  };
  

  const handleLogout = () => {
    // Clear token and user information from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Update context state
    setToken(null);
    setIsLoggedIn(false);
    setCartItems([]); // Optionally clear cart items if needed

    // Notify user
    // toast.success("Logged out successfully!");
    alert("login success")
    nav("/login"); // Navigate back to login page
  };

  return ( 
    <header className="rr">
      <div className="logini-container">
        <h1 className="logini-head">Login</h1>
        <input
          className="logini-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="logini-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="logini-btn" onClick={handleLogin}>
          Login
        </button>
        <ToastContainer />
        <p className="tt">Don't have an account?</p>
        <Link to="/register">Sign Up</Link>
        <Link to={"/adminlogin"}>Admin</Link>
        
        {isLoggedIn ? (
          <>
            <p>You are logged in!</p>
            <button className="logini-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
}
