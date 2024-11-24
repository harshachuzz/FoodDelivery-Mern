import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeaturedRestaurants.css';
import { mycontext } from './Context';
import axios from 'axios';
import { useEffect } from 'react';

function FeaturedRestaurants() {
  const { products, setProducts, isLoggedIn, setIsLoggedIn } = useContext(mycontext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/products", {
        withCredentials: true,
      });
      setProducts(response.data.allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [setProducts]);

  const handleGetProductsByCategory = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/user/products/category/${category}`, { withCredentials: true });

      const updatedProducts = response.data.map(product => ({
        ...product,
      }));

      setProducts(updatedProducts);
    } catch (error) {
      console.error(`Error fetching ${category} products:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetScoopsProducts = () => {
    handleGetProductsByCategory("Scoops");
    navigate(`/scoops`);
  };

  const handleGetBurgerKingProducts = () => {
    handleGetProductsByCategory("BurgerKing");
    navigate(`/burgerking`);
  };

  const  handleGetKFCProducts = () => {
    handleGetProductsByCategory("KFC");
    navigate(`/kfc`);
  };
  const handleGetChickingProducts = () => {
    handleGetProductsByCategory("Chicking");
    navigate(`/chicking`);
  };
  const handleGetaltazaProducts = () => {
    handleGetProductsByCategory("altaza");
    navigate(`/altaza`);
  };
  const handleGetdominospizzaProducts = () => {
    handleGetProductsByCategory("dominos");
    navigate(`/dominos`);
  };
  const handleGetmcdonaldsProducts = () => {
    handleGetProductsByCategory("mcdonalds");
    navigate(`/mcdonalds`);
  };
  const handleGetthaalkitchenProducts = () => {
    handleGetProductsByCategory("thaal");
    navigate(`/thaal`);
  };
  const  handleGetgokulootupuraProducts = () => {
    handleGetProductsByCategory("gokul");
    navigate(`/ootupura`);
  };
  const  handleGetmrshawarmaProducts = () => {
    handleGetProductsByCategory("shawarma");
    navigate(`/mrshawarma`);
  };
  const  handleGetrahumaniaProducts = () => {
    handleGetProductsByCategory("biriyani");
    navigate(`/biriyani`);
  };
  const  handleGetalreemProducts = () => {
    handleGetProductsByCategory("alreem");
    navigate(`/alreem`);
  };



  const restaurants = [
    { 
      name: "scoops", 
      description: "Ice Creams", 
      imageUrl: "https://tse1.mm.bing.net/th?id=OIP.GKoa6vbjvUMMnhlzsZQsFwHaEo&pid=Api&P=0&h=220",
      onClick: handleGetScoopsProducts
    },
    { 
      name: "Burger King", 
      description: "Juicy burgers you can't resist", 
      imageUrl: "https://tse4.mm.bing.net/th?id=OIP.KomAB7rg-OCyK3QEDO81fwHaEn&pid=Api&P=0&h=220",
      onClick:handleGetBurgerKingProducts
    },
    { 
      name: "Chicking", 
      description: "Fast Food Restaurant Franchise Opportunity", 
      imageUrl: "https://tse3.mm.bing.net/th?id=OIP.cTu5pdL0RSYu9oQK0Hx4RQHaEK&pid=Api&P=0&h=220",
      onClick: handleGetChickingProducts
    },
    { 
      name: "KFC", 
      description: "Kentucky Fried Chicken", 
      imageUrl: "https://tse1.mm.bing.net/th?id=OIP.dP86U6B09mVwXgofe0pmTgHaGo&pid=Api&P=0&h=220",
      onClick: handleGetKFCProducts
    },
    { 
      name: "Al Taza", 
      description: "Spicy Shawarma", 
      imageUrl: "https://tse4.mm.bing.net/th?id=OIP.eEdE_Tx6aEbqBBEgen_6FQHaE7&pid=Api&P=0&h=220",
      onClick: handleGetaltazaProducts
    },
    { 
      name: "Dominos Pizza", 
      description: "pizza", 
      imageUrl: "https://tse3.mm.bing.net/th?id=OIP.JsYHzF40WPvQuD1WUpQc2QHaFj&pid=Api&P=0&h=220",
      onClick: handleGetdominospizzaProducts
    },
    { 
      name: "Mc Donald's", 
      description: "Burger,Fastfood,Cafe", 
      imageUrl: "https://tse2.mm.bing.net/th?id=OIP.1L2tpneiyYfH2F0xWv5dTgHaEo&pid=Api&P=0&h=220",
      onClick: handleGetmcdonaldsProducts
    },
    { 
      name: "Thaal Kitchen", 
      description: "Kerala, Arabian, Biryani", 
      imageUrl: "https://tse4.mm.bing.net/th?id=OIP.YjLb8f21J0RBdxToAD1BYQHaHa&pid=Api&P=0&h=220",
      onClick: handleGetthaalkitchenProducts
    },
    { 
      name: "Gokul Oottupura", 
      description: "South Indian, North Indian, Chinese, Beverages", 
      imageUrl: "https://b.zmtcdn.com/data/pictures/4/901024/a3fcf52f73286c9711de3ae6996d2179_o2_featured_v2.jpg?output-format=webp",
      onClick: handleGetgokulootupuraProducts
    },
    { 
      name: "Mr Shawarma", 
      description: "Arabian,Beverages", 
      imageUrl: "https://tse3.mm.bing.net/th?id=OIP.ltbGhp_gCKKtHR2oRQWR5gHaEK&pid=Api&P=0&h=220",
      onClick: handleGetmrshawarmaProducts
    },
    { 
      name: "Rahumania Biriyani", 
      description: "Biryani, Kerala", 
      imageUrl: "https://tse4.mm.bing.net/th?id=OIP.qTzBIim8Nyc4KQofktP11AHaE8&pid=Api&P=0&h=220",
      onClick:handleGetrahumaniaProducts
    },
    { 
      name: "Al Reem", 
      description: "Arabian, Mandi", 
      imageUrl: "https://b.zmtcdn.com/data/pictures/chains/8/900688/c94004a82d81938ec37ed6dc1cf56c5c.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*",
      onClick:handleGetalreemProducts
    }
  
  
  ];

  return (
    
    <section className="featured-restaurants">
             
      <h2>Featured Restaurants</h2>
      <div className="restaurants-list">
        {restaurants.map((restaurant, index) => (
          <div className="restaurant-card" key={index} onClick={restaurant.onClick}>
            <img src={restaurant.imageUrl} alt={restaurant.name} />
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
            {/* <button onClick={handleGetKFCProducts}>chick</button> */}
            <button
              onClick={restaurant.onClick} // Calls each restaurant's specific onClick handler
              className="restaurant-button"
            >
              View {restaurant.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedRestaurants;
