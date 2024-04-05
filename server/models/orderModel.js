const mongoose = require('mongoose');
const User = require('./users');

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  shippingAddress: {
    type: String,
    requied: true,
  },
  street: String,
  city: String,
  pinCode: String,
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
