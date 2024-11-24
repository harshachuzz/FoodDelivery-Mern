const jwt = require("jsonwebtoken");

const checkAdminToken = (req, res, next) => {
  let token = req.cookies.token||req.headers.authorization

  console.log("Token in middleware:", token);

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }
 
  token=token.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.token = token;
    next();

    
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = checkAdminToken;