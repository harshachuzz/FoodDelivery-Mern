
import React, { useContext } from "react";
import { mycontext } from "./Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import "./Register.css";

export default function Register() {
  const nav = useNavigate();

  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
  } = useContext(mycontext);

  const Register = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      const response = await axios.post("http://localhost:5000/user/register", {
        name,
        email,
        password,
        confirmPassword,
      });



   

      if (response.status === 201) {
       alert("registraion success")
        nav("/login");
      }
    } catch (error) {
      if (error.response?.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    }
  };

  return (
    <main className="body">
      <header className="b">
        <div className="main-register">
          <ToastContainer />
          <h1 className="main-head">Register</h1>
          <input
            className="reg-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            className="reg-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            className="reg-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <input
            className="reg-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br />
          <button className="reg-button" onClick={Register}>
            Register
          </button>
          <br />
          <p className="pq">Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </header>
    </main>
  );
}
