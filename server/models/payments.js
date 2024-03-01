const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['credit card', 'paypal', 'UPI', 'other'],
    required: true,
  },
  cardNumber: String, // For credit cards
  // Other fields based on the payment method type
});

const PaymentMethod = mongoose.model('paymentMethod', paymentMethodSchema);

module.exports = PaymentMethod;
