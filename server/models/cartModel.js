const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartItem',
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
