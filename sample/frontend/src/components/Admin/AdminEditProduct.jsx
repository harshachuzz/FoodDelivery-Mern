import { useContext, useEffect, useState } from "react";
import { mycontext } from "../Context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './AdminEditProduct.css';

export default function AdminEditProduct() {
  const { productId } = useParams();
  const nav = useNavigate();
  const { product = {}, setProduct, token } = useContext(mycontext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("Fetching product with ID:", productId);
      console.log("Current token:", token);

      // Check if token is missing
      if (!token) {
        console.error("No token found. Unable to fetch product details.");
        return;
      }

      if (productId) {
        try {
          const response = await axios.get(`http://localhost:5000/admin/products/${productId}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Product details fetched successfully:", response.data.product);
          setProduct(response.data.product);
        } catch (error) {
          console.error("Error fetching product details:", error.response ? error.response.data : error.message);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("Product ID is not defined.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, setProduct, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
      ...(name === "stock" && {
        availability: value > 0,
        soldOut: value === "0",
      }),
    }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    // Check if token is missing
    if (!token) {
      console.error("Token not available. Please log in as an admin.");
      return;
    }

    const updatedData = {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
      availability: product.stock > 0,
      soldOut: product.stock === "0",
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/admin/products/${productId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Product updated successfully:", response.data);
      alert("Product edited successfully");
      nav("/adminProduct");
    } catch (error) {
      console.error("Failed to update product:", error.response ? error.response.data : error.message);
      alert("Failed to update product. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Simple loading state
  }

  // return (
  //   <div>
  //     {/* Render product editing form */}
  //     <form onSubmit={handleUpdateProduct}>
  //       {/* Form fields for product editing */}
  //       <input
  //         type="text"
  //         name="name"
  //         value={product.name || ""}
  //         onChange={handleChange}
  //       />
  //       {/* Add other input fields as required */}
  //       <button type="submit">Update Product</button>
  //     </form>
  //   </div>
  // );


  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleUpdateProduct}>
      <label>Restaurantname:</label>
        <input
          type="string"
          name="restaurantname"
          value={product.restaurantname || ""}
          onChange={handleChange}
          required
        />
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={product.category || ""}
          onChange={handleChange}
          required
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={product.description || ""}
          onChange={handleChange}
          required
        />
         <label>Dish Name:</label>
        <input
          type="text"
          name="dishname"
          value={product.dishname || ""}
          onChange={handleChange}
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={product.price || ""}
          onChange={handleChange}
          required
        />
        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={product.stock || ""}
          onChange={handleChange}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={product.image || ""}
          onChange={handleChange}
        />
        
        {/* <label>Detail Image URL:</label>
        <input
          type="text"
          name="detailImage"
          value={product.detailImage || ""}
          onChange={handleChange}
        />
        <label>About:</label>
        <textarea
          name="about"
          value={product.about || ""}
          onChange={handleChange}
        /> */}
        
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
