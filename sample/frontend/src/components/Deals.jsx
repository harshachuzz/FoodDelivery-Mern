// src/components/Deals.js
import React, { useState, useEffect } from 'react';
import "./Deals.css"

const Deals = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDeals();
    }, []);

    const fetchDeals = async () => {
        try {
            const response = await fetch('https://api.example.com/deals'); // Replace with actual endpoint
            const data = await response.json();
            setDeals(data);
        } catch (error) {
            console.error("Error fetching deals:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="deals-page">
            <h1>Today's Deals</h1>
            <div className="deals-container">
                {deals.map(deal => (
                    <div key={deal.id} className="deal-card">
                        <img src={deal.image} alt={deal.title} className="deal-image" />
                        <h2>{deal.title}</h2>
                        <p>{deal.description}</p>
                        <p className="deal-price">${deal.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Deals;
