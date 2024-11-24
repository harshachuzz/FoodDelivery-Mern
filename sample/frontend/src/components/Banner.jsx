import React from 'react';
import './Banner.css';

function Banner() {
  return (
    <section className="banner">
      <div className="banner-content">
        <h1>Delicious Food Delivered to You</h1>
        <p>Order your favorite meals from local restaurants</p>
        <input type="text" placeholder="Search for food or restaurants..." />
        <button>Search</button>
      </div>
    </section>
  );
}

export default Banner;
