const express = require('express');
const bodyparser = require("body-parser");



const admin = require('../controller/productController');
const checkAdminToken = require('../middleware.js/adminmiddleware'); 

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.post('/login', admin.adminLogin);
app.post("/products", admin.createProduct);
app.get("/products",admin.getProducts);
app.put('/products/:id',  admin.updateProduct);
app.delete("/products/:id", admin.deleteProduct);
app.get("/products/:id", admin.getProductById);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

module.exports = app;

