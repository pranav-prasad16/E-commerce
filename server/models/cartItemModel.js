const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
