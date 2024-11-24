import React, { useState } from 'react';
import './Menu.css'; // CSS file for styling
import { useNavigate } from 'react-router-dom';


const menuData = [
  { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, rating: 4.8, image: "https://tse1.mm.bing.net/th?id=OIP.YiVBT9TBoiIn4tlTGS5OewHaFM&pid=Api&P=0&h=220" },
  { id: 2, name: 'Cheeseburger', category: 'Burgers', price: 8.99, rating: 4.5, image: 'https://tse2.mm.bing.net/th?id=OIP.VFZPQNKwQuLi-NhNLcIHgQHaHa&pid=Api&P=0&h=220' },
  { id: 3, name: 'Sushi Platter', category: 'Sushi', price: 24.99, rating: 4.7, image: 'https://tse3.mm.bing.net/th?id=OIP.kJl4R_KG1P9uE9zEHw7BPgHaEK&pid=Api&P=0&h=220' },
  { id: 4, name: 'Caesar Salad', category: 'Salads', price: 10.99, rating: 4.6, image: 'https://tse1.mm.bing.net/th?id=OIP.CgUG-x5oSZmpm6Ybeq1QBAHaE8&pid=Api&P=0&h=220' },
  { id: 5, name: 'Chocolate Cake', category: 'Desserts', price: 6.99, rating: 4.9, image: 'https://tse4.mm.bing.net/th?id=OIP.oVrhw2Vgn5Jlgz54qvFugAHaEK&pid=Api&P=0&h=220' },
];

// Category buttons
const categories = ['All', 'Pizza', 'Burgers', 'Sushi', 'Salads', 'Desserts'];


const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const[specificProduct,setSpecificProduct]=useState(null);
  const navigate = useNavigate();
  // Filter the menu based on the selected category
  const filteredMenu = selectedCategory === 'All' 
    ? menuData 
    : menuData.filter(item => item.category === selectedCategory);

  const handleBuyNow = (item) => {
    // Logic to handle "Buy Now"
    // Example: Add item to cart or navigate to checkout
    console.log(`Buying ${item.name} for $${item.price}`);
    alert(`Proceeding to buy: ${item.name}`);
    // Optionally, redirect to a checkout page:
    // navigate(`/checkout?item=${item.id}`);
  };

  return (
    <div className="menu-page">
      <header className="menu-header">
        <h1>Explore Our Menu</h1>
        <p>Delicious food delivered to your doorstep.</p>
      </header>

      <div className="category-buttons">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-list">
        {filteredMenu.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <div className="menu-item-details">
              <h3 className="menu-item-name">{item.name}</h3>
              <p className="menu-item-category">{item.category}</p>
              <p className="menu-item-price">${item.price.toFixed(2)}</p>
              <p className="menu-item-rating">Rating: {item.rating}⭐</p>
              <button onClick={() => navigate(`/buy/${specificProduct._id}`)} className="buy-now-button">
              Buy Now
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
