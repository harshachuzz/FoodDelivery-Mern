
const app = require("express");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");

const checkUserToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log("token middileware ",token);
  
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  try { 
    const verified = jwt.verify(token, "secretkey");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};
module.exports = checkUserToken;