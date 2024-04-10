const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
    default: 'icon-name',
  },
  color: {
    type: String,
    default: '#000',
  },
});

categorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

categorySchema.set('toJSON', {
  virtuals: true,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
