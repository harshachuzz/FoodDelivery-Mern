const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const Product = require("../models/productmodel");
const Order = require("../models/ordermodel")




// User Registration
const userRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).send("Please fill in all fields");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration failed");
  }
};


// User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

 

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email: user.email }, "secretkey");
      res.cookie("token", token);

      res.status(200).json({ message: "Welcome user", token, user: { email: user.email, name: user.name } });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Login failed");
  }
};



const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};

// Ban a user
const banUser = async (req, res) => {
  try {
    const { userId, banned } = req.body;
    console.log(userId)
    // Find the user by ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const banUsers = await User.findByIdAndUpdate(userId, { bannedUser: banned }, { new: true })
    res.status(200).json({ message: 'User banned successfully', banUsers });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Unban a user
const unbanUser = async (req, res) => {
  try {
    const { userId, banned } = req.body;
    console.log(userId)
    // Find the user by ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const banUsers = await User.findByIdAndUpdate(userId, { bannedUser: banned }, { new: true })
    res.status(200).json({ message: 'User banned successfully', banUsers });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Get Products

const userGetProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const allProducts = await Product.find();

    // Try to get the token from cookies or headers
    const token = req.cookies.token;
    console.log("getProduct ",token);
    

    let userCart = [];
   

    // Map products and check cart status
    const productsWithCartStatus = allProducts.map((product) => ({
      ...product.toObject(),
      inCart: userCart.includes(product._id.toString()), // Add cart status
    }));

    res.status(200).json({ allProducts: productsWithCartStatus });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};




// Get Category Wise Products
const getCategoryWise = async (req, res) => {
  const categoryList = req.params.category

  try {
    const categoryProducts = await Product.find({ category: categoryList });

    console.log("cat", categoryProducts);
    res.status(200).json(categoryProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error", errorMessage: error.message });
  }
};

// Get Specific Product


// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }


    const token = req.cookies.token 

    const decoded = jwt.verify(token, "secretkey");

 
    const user = await User.findOne({ email: decoded.email });
    console.log("user in addto cart",user);
    

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (user.cart.includes(productId)) {
      return res.status(200).json({ message: "Product is already in the cart" });
    }

    user.cart.push(productId);
    await user.save();

    return res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const token = req.cookies.token 
    console.log("token get cart",token);
    
 
    const decoded = jwt.verify(token, "secretkey");
    const user = await User.findOne({ email: decoded.email }).populate("cart");
    console.log("User cart:", user.cart);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const token = req.cookies.token; 
    const decoded = jwt.verify(token, "secretkey");

 
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if product exists in the user's cart
    const index = user.cart.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // Remove the product from the user's cart
    user.cart.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Product removed from cart Successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};

const userDetails = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }).populate('cart');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};
const specificProduct = async (req, res) => {
  try {
    console.log(req.params.id);
    const specificProduct = await Product.findById(req.params.id);

    if (specificProduct) {
      return res.status(200).json({ message: "Specific Product:", specificProduct });
    }
    return res.status(404).json({ error: "Product not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




const handlePurchase = async (req, res) => {
  try {
    const { productId, quantity, addressDetails, paymentMethod } = req.body;

    // Validate required fields for purchase
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required." });
    }
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, "secretkey");
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch product details before checking stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product stock is sufficient
    if (product.stock < quantity) {
      return res.status(400).json({ error: "Insufficient stock available" });
    }

    // Deduct stock after successful stock check
    product.stock -= quantity;
    await product.save();

    // Check for existing address and add if it doesn't exist
    const existingAddress = user.addresses.find(addr => addr.phone === addressDetails.phone);
    if (!existingAddress) {
      const newAddress = { ...addressDetails };
      user.addresses.push(newAddress);
      await user.save();
    }

    // Determine payment status and handle online payment
    let paymentStatus;
    if (paymentMethod === "cash_on_delivery") {
      paymentStatus = "cash-on-delivery";
    } else if (paymentMethod === "online_payment") {
      try {
        // Handle online payment logic here
        // Assume you have a payment function that returns the payment status
        const paymentResult = await processOnlinePayment(req.body); // Replace with actual payment processing logic
        paymentStatus = paymentResult.status; // Ensure this reflects the payment result
      } catch (paymentError) {
        return res.status(500).json({ error: "Payment processing failed", details: paymentError.message });
      }
    } else {
      return res.status(400).json({ error: `Invalid payment method: ${paymentMethod}` });
    }

    // Create the order
    const order = new Order({
      userId: user._id,
      product: {
        productId: product._id,
        description: product.description,
        price: product.price,
        category: product.category,
        restaurantname: product.restaurantname,
        image: product.image,
      },
      quantity: Math.max(quantity, 1),
      address: addressDetails,
      status: 'Pending',
      paymentStatus,
      orderDate: new Date(),
    });

    // Save the order to the database
    await order.save();

    // Respond with user name, email, and success message
    res.status(200).json({
      message: "Purchase successful!",
      userName: user.name,
      userEmail: user.email // Include user's email in the response
    });
  } catch (err) {
    console.error("Error processing purchase:", err);
    res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};

// Sample online payment function (you need to implement this based on your payment provider)
const processOnlinePayment = async (paymentDetails) => {
  // Placeholder for actual payment processing logic
  // This should interact with your payment gateway and return the payment status
  return { status: "online-payment-successfully" }; // Simulate a successful payment
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: { $ne: 'Canceled' } }) // Exclude canceled orders
      .populate('userId', 'email name addresses')
      .populate({
        path: 'product.productId',
        select: 'name price category breed image',
      });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }

    const structuredOrders = orders.map(order => ({
      _id: order._id,
      userId: order.userId,
      product: order.product,
      quantity: order.quantity,
      status: order.status,
      paymentStatus: order.paymentStatus,
      orderDate: order.orderDate,
      address: order.address,
    }));

    res.status(200).json({
      message: "Orders retrieved successfully.",
      orders: structuredOrders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error",
      errorMessage: err.message,
    });
  }
};
const handleGetUserOrders = async (req, res) => {
  try {
    // const token = req.cookies.token;
    // if (!token) {
    //   return res.status(401).json({ error: "Unauthorized access" });
    // }

    // let decoded;
    // try {
    //   decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (error) {
    //   return res.status(401).json({ error: "Invalid token" });
    // }
    const { userEmail } = req.body
    const user = await User.findOne({ email: userEmail });
    console.log("ordr",user);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve orders for this user, excluding canceled ones
    const orders = await Order.find({ userId: user._id, status: { $ne: 'Canceled' } }) // Exclude canceled orders
      .populate('product.productId', 'image category breed price')
      .populate('userId', 'email name addresses');

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    const formattedOrders = orders.map(order => ({
      orderId: order._id,
      deliveryDate: order.deliveryDate,
      orderDate: order.orderDate,
      productImage: order.product.image,
      productCategory: order.product.category,
      productBreed: order.product.breed,
      productPrice: order.product.price,
      userEmail: user.email,
      userName: user.name,
      address: order.address,
    }));

    res.status(200).json({ orders: formattedOrders });
  } catch (err) {
    console.error("Error retrieving user orders:", err);
    res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};




module.exports = {
  userRegister,
  userLogin,
  userGetProducts,
  specificProduct,
  addToCart,
  getCategoryWise,
  getCart,
  removeFromCart,
  userDetails,
  handlePurchase,
  getOrders,
  handleGetUserOrders,
  getAllUsers,
  banUser,
  unbanUser

};