const Product = require('../models/productModel');

const getAllProduct = async (req, res) => {
  const {
    category,
    priceFrom,
    priceTo,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = req.query;
  let query = {};

  if (category) {
    query.category = category;
  }
  if (priceFrom) {
    query.price = { $gte: priceFrom }; // greater than equal to
  }
  if (priceTo) {
    query.price = { ...query.price, $lte: priceTo }; // less than equal to
  }

  const options = {
    page,
    limit,
    sort: { [sortBy]: sortOrder }, // sort object for mongoose-paginate
    populate: 'category', // optional: populate category
  };

  try {
    const products = await Product.paginate(query, options);
    // const products = await Product.find().populate('category');
    if (!products.length) {
      return res.status(200).json({ msg: 'No products found' });
    }
    return res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found!' });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const postProduct = async (req, res) => {
  const productData = req.body;
  // console.log('current user id : ', req.user);
  // Check if a product with the same name already exists
  const existingProduct = await Product.findOne({ name: productData.name });
  if (existingProduct) {
    return res
      .status(400)
      .json({ msg: 'Product with this name already exists' });
  }

  try {
    const newProduct = await Product.create(productData);
    return res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const updatedData = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Product not found!' });
    }
    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(404).json({ msg: 'Product not found!' });
    }
    return res.status(200).json({ msg: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports = {
  getAllProduct,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
};
