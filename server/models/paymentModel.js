const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  receipt_email: {
    type: String,
    required: true,
  },
  payment_status: {
    type: String,
    required: true,
    enum: ['succeeded', 'pending', 'failed'], // Define possible statuses
  },
  shipping: {
    name: {
      type: String,
      required: true,
    },
    address: {
      country: {
        type: String,
        required: true,
      },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
