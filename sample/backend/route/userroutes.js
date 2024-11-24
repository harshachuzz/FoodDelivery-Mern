const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();


const user = require("../controller/user");
const bodyParser = require("body-parser");
const userMiddleware = require("../middleware.js/usermiddleware")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser middleware

app.post("/register", user.userRegister);
app.post("/login", user.userLogin); // No userMiddleware here

// Middleware applied only to routes after successful login
app.get("/getProducts",userMiddleware, user.userGetProducts);
app.get("/products/:id",userMiddleware, user.specificProduct);
app.get("/products/category/:category",userMiddleware, user.getCategoryWise);
app.post("/addToCart",userMiddleware, user.addToCart); 
app.get("/cart",userMiddleware, user.getCart);
app.delete("/cart",userMiddleware, user.removeFromCart);
app.post("/buy",userMiddleware,user.handlePurchase);
app.get("/details", userMiddleware, user.userDetails);
app.get("/orders", user.getOrders);
app.get("/getorders",userMiddleware,user.handleGetUserOrders)
app.get("/users", user.getAllUsers);
app.put("/users/ban", user.banUser);
app.put("/users/unban", user.unbanUser);


module.exports=app