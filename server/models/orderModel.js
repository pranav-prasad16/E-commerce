const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem',
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: { type: String, default: 'pending' },
  shippingAddress: {
    type: String,
    required: true,
  },
  street: { type: String, required: true },
  pinCode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String },
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
