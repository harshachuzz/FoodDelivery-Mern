const express = require('express');
const cors = require('cors');
const connectDB = require('./config/data');
const cookieParser = require('cookie-parser');
require("dotenv").config();
// const checkAdminToken = require('./middleware/adminMiddleware'); // Fixed spelling

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));

// Connect to the database
connectDB();

// Route setup
const adminRoute = require('./route/productroutes');
const userRoute = require("./route/userroutes");

// Apply checkAdminToken middleware only to admin routes
app.use("/admin", adminRoute);


app.use("/user", userRoute);
// app.use("/api", userRoute);



app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
