const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  image: { type: String, required: true },
  images: [
    {
      type: String,
    },
  ],
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

productSchema.set('toJSON', {
  virtuals: true,
});

// productSchema.plugin(paginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
