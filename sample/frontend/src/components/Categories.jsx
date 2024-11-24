import React from 'react';
import './Categories.css';
import { Link } from 'react-router-dom';
import { FaPizzaSlice, FaHamburger, FaIceCream, FaAppleAlt } from 'react-icons/fa';

function Categories() {
  return (
    <section className="categories">
      <h2>Explore Categories</h2>
      <div className="categories-list">
        <div className="category">
          <Link to={"/chicking"}> <FaPizzaSlice  size={40} /></Link>
          <p>Pizza</p>
        </div>
        <div className="category">
         <Link to={"/burgerking"}> <FaHamburger size={40} /></Link> 
          <p>Burgers</p>
        </div>
        <div className="category">
         <Link to={"/scoops"}><FaIceCream size={40} /></Link> 
          <p>Desserts</p>
        </div>
        <div className="category">
        <Link to={"/main"}><FaAppleAlt size={40} /></Link> 
          <p>Healthy</p>
        </div>
      </div>
    </section>
  );
}

export default Categories;
