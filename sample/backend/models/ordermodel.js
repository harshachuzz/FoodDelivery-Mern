const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  product: {  // Product details as a subdocument
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Ensure the correct reference to the Product model
      required: true,
    },
    restaurantname: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    
    image: [{  // Allow multiple images
      type: String,
      required: false,
    }],
    
   
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Enforce a minimum quantity
  },
  address: {
    pincode: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: false,
    },
    addressType: {
      type: String,
      required: true, // e.g., Home, Office
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\d{10}$/.test(v), // Example validation for a 10-digit phone number
        message: props => `${props.value} is not a valid phone number!`
      }
    },
  },
  status: {
    type: String,
    default: 'Pending', // Initial status of the order
  },
  paymentStatus: {
    type: String,
    default: 'Pending', // Status can be 'Paid', 'Failed', etc.
  },
  transactionId: {
    type: String,
    required: false, // Optional, used for payment tracking
  },
  deliveryDate: {
    type: Date,
    required: false, // Optional, can be set after processing the order
  },
  orderDate: { // Added order date field
    type: Date,
    default: Date.now, // Automatically set the date when the order is created
  },
  statusHistory: [
    {
      status: {
        type: String,
        required: true,
      },
      updatedAt: {
        type: Date,
        default: Date.now, // Automatically set the date when the status is updated
      },
    },
  ],
  userFeedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5, // Rating scale from 1 to 5
    },
    comment: {
      type: String,
      required: false, // Optional user feedback comment
    },
  },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create the Order model using the defined schema
const Order = mongoose.model('Order', orderSchema);

// Export the Order model
module.exports = Order;