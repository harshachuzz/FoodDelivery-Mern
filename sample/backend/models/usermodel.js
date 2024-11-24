const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Matches the Product model name
        },
      ],
    addresses: [
        {
            pincode: { type: String, required: true },
            locality: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            landmark: { type: String },
            addressType: { type: String, required: true }, // e.g., Home, Work, etc.
            phone: { type: String, required: true },
        }
    ],
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductId',
        }
    ],
});

// Export User Model
const User = mongoose.model("User", userSchema);
module.exports = User;