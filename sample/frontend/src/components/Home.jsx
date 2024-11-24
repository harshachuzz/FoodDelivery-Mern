import React from "react";
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="hero">
      {/* <h1 style={{ color: "black" }} className="hero-text">Foodie</h1> */}

      <div className="hero-content">
        <h1 className="hero-text">Foodie Express</h1>
        <p className="hero-description">
        We’re here to help you live life the panda way.
        Spend more time doing what you love – we’ll take
        care of tasty meals, fresh groceries and new flavours.
        </p>
        <Link to="/navbar" className="hero-button">Go to Next Page</Link>
      </div>
      <div className="hero-image"></div>
    </div>
  )
}
export default Home;