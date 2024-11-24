import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mycontext } from "../Context";
import "./Main.css"

export default function Main() {
  const { products, setProducts, isLoggedIn } = useContext(mycontext);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // Fetch cart and wishlist items for logged-in users
  const fetchCartItems = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.get("http://localhost:5000/user/getCart", { withCredentials: true });
        return response.data.cartItems.map((item) => item._id);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }
    return [];
  };

  const fetchWishlistItems = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.get("http://localhost:5000/user/getWishlist", { withCredentials: true });
        return response.data.wishlistItems.map((item) => item._id);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    }
    return [];
  };

  // Fetch products and set inCart and inWishlist status
  const fetchProducts = useCallback(async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/user/getProducts", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const [cartItems, wishlistItems] = await Promise.all([fetchCartItems(), fetchWishlistItems()]);

      const updatedProducts = response.data.allProducts.map((product) => ({
        ...product,
        inCart: cartItems.includes(product._id),
        inWishlist: wishlistItems.includes(product._id),
      }));

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [setProducts, isLoggedIn]);

  // Run fetchProducts on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addToCart = async (productId) => {
    if (!isLoggedIn) {
      alert("Please login to add to cart");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/user/addToCart", { productId }, { withCredentials: true });
      if (response.status === 200) {
        const updatedProducts = products.map((product) =>
          product._id === productId ? { ...product, inCart: true } : product
        );
        setProducts(updatedProducts);
        alert("Product added to cart successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Product already in cart");
      } else {
        console.error("Error adding product to cart:", error);
        alert("Failed to add product to cart");
      }
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete("http://localhost:5000/user/cart", { data: { productId }, withCredentials: true });
      const updatedProducts = products.map((product) =>
        product._id === productId ? { ...product, inCart: false } : product
      );
      setProducts(updatedProducts);
      alert("Product removed from cart successfully");
    } catch (err) {
      console.error("Error removing product from cart:", err);
      alert("Failed to remove product from cart");
    }
  };

  const handleCartAction = async (product) => {
    if (product.inCart) {
      await removeFromCart(product._id);
    } else {
      await addToCart(product._id);
    }
  };

  return (
    <div className="container">
  <div className="sub-Container">
    <h1 className="Home-Head"></h1>
  </div>
  <div className="HomeMainBody">
    <h2 className="bodyHead"></h2>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="bodyinner">
        {products.map((product) => (
          <div className="body-card" key={product._id} onDoubleClick={() => nav(`/product/${product._id}`)}>
            <img className="ProductImg" src={product.image} alt="img" />
            <div className="ProductDetails">
              <h4 className="ProductCategory">{product.category}</h4>
              <h4 className="ProductDishName">{product.dishname}</h4>
              <h4 className="ProductPrice">${product.price}</h4>
            </div>
            <button className="CartButton" onClick={() => addToCart(product)}>
              {product.inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
}
