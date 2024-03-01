const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['shipping', 'billing'],
    required: true,
  },
  street: String,
  city: String,
  zipCode: String,
  country: String,
});

const Address = mongoose.model('address', addressSchema);

module.exports = Address;
