const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    restaurantname:{
        type: String,
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
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: true,
  },
  dishname: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
   
  soldOut: {
    type: Boolean,
    required: true,
  },

 

});

// module.exports = mongoose.model("productDatas", productSchema);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;