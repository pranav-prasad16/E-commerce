const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItem: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem',
      required: true,
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
  status: { type: String, default: 'pending' },
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

orderSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

orderSchema.set('toJSON', {
  virtuals: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
