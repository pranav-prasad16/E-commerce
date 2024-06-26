const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
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

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
