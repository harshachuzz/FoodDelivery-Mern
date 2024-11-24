import { useContext } from "react";
import { mycontext } from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminAddProduct.css"


export default function AdminAddProduct() {
  const nav = useNavigate();
  const { product, setProduct } = useContext(mycontext);

  const token=localStorage.getItem("adminToken")
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
      availability: name === "stock" ? value > 0 : prevProduct.availability,
      soldOut: name === "stock" ? value === "0" : prevProduct.soldOut,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("Token not available. Please log in as an admin.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/products",
        product,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Product added successfully");
      nav('/adminproduct');
      console.log("Product created successfully", response.data);
    } catch (error) {
      console.error("Failed to create product", error.response);
      alert("Failed to create product");
    }
  };

  return (
    <div className="add-product-main">
      <h1 className="add-product-head">Add Product</h1>

      <form onSubmit={handleSubmit}>
        <label className="labell">category:</label>
        <input
        className="inputt"
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
        />
<label className="labell">Availability:</label>
<input
  className="inputt"
  type="text"
  name="availbility" // Use the typo from the server's expected field
  value={product.availbility}
  onChange={handleChange}
/>

       

        <label className="labell">Dishname:</label>
        <input
         className="inputt"
          type="text"
          name="dishname"
          value={product.dishname}
          onChange={handleChange}
        />

        <label className="labell">Rating:</label>
        <input
         className="inputt"
          type="text"
          name="rating"
          value={product.rating}
          onChange={handleChange}
        />  
        <label className="labell">stock:</label>
        <input
         className="inputt"
          type="text"
          name="stock"
          value={product.stock}
          onChange={handleChange}
        />


        <label className="labell">Description:</label>
        <textarea
         className="textareaa"
          name="description"
          value={product.description}
          onChange={handleChange}
        />

        <label className="labell">Price:</label>
        <input
         className="inputt"
          type="text"
          name="price"
          value={product.price}
          onChange={handleChange}
        />

<label className="labell">RestaurantName:</label>
        <input
         className="inputt"
          type="text"
          name="restaurantname"
          value={product.restaurantname}
          onChange={handleChange}
        />

        <label className="labell">Image URL:</label>
        <input
         className="inputt"
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}