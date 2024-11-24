// src/components/About.js
import React from 'react';
import { FaUtensils, FaTruck, FaSmile, FaGlobe } from 'react-icons/fa';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <header className="about-header">
                <h1>About Us</h1>
                <p>Delivering delicious meals from local favorites to your doorstep.</p>
            </header>

            <section className="about-section">
                <div className="about-content">
                    <FaUtensils className="about-icon" />
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to bring a world of flavors to your door. We’re dedicated to delivering high-quality food from 
                        top local restaurants and delighting our customers with every meal.
                    </p>
                </div>
            </section>

            {/* <section className="about-section about-bg">
                <div className="about-content">
                    <FaTruck className="about-icon" />
                    <h2>Fast & Reliable Delivery</h2>
                    <p>
                        With our reliable delivery fleet, we ensure that your food arrives fresh and on time, every time.
                    </p>
                </div>
            </section> */}

            <section className="about-section">
                <div className="about-content">
                    <FaSmile className="about-icon" />
                    <h2>Customer Satisfaction</h2>
                    <p>
                        Customer satisfaction is our top priority. We strive to offer the best service, from the moment you place an order 
                        to the time it arrives at your door.
                    </p>
                </div>
            </section>

            <section className="about-section about-bg">
                <div className="about-content">
                    <FaGlobe className="about-icon" />
                    <h2>Our Story</h2>
                    <p>
                        Founded in [Year], we started as a small food delivery service with a big vision: to connect people with the flavors 
                        they love. Today, we proudly serve thousands of customers every day.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;
