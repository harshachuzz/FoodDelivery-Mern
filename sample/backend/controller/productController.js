const Product = require('../models/productmodel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs') 
const schema = require("../models/usermodel"); 

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("adminlogin",req.body);
    
    
    if (email !== "admin@gmail.com" || password !== "admin123") {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

   
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

   
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(200).json({ message: "Welcome, Admin", token });
  } catch (err) {
    // res.status(500).json({ message: "Server Error", error: err.message });
    console.log(err);
    
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = {
      category: req.body.category,
      dishname: req.body.dishname,
      restaurantname: req.body.restaurantname,
     description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      rating: req.body.rating,
      stock:req.body.stock,
      availability:req.body.stock > 0,
      soldOut:req.body.stock === 0,
    };

    await Product.insertMany([newProduct]);

    res.status(200).json({ message: "Product created successfully" });
    console.log("Product created successfully");
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};
const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({ message: "All products list", allProducts });
  } catch (error) {
    console.error("Error fetching products:", error); // Log the error for debugging
    res.status(500).json({ message: "All product list not found", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    
    const {
      category,
      dishname,
      description,
      price,
      image,
      restaurantname,
      rating,
      stock,
    } = req.body;

    // Validate input fields if necessary
    if (!id || !category || !price) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        category,
        restaurantname,
        description,
        price,
        image,
        dishname,
        rating,
        stock,
        availability: stock > 0,
        soldOut: stock === 0,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error); // Log the error for debugging
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product found", product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }

};

module.exports = {
  adminLogin,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};
