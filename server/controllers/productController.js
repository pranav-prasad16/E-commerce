const mongoose = require('mongoose');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const getAllProducts = async (req, res) => {
  // const {
  //   category,
  //   priceFrom,
  //   priceTo,
  //   page = 1,
  //   limit = 10,
  //   sortBy = 'createdAt',
  //   sortOrder = 'desc',
  // } = req.query;
  // let query = {};

  // if (category) {
  //   query.category = category;
  // }
  // if (priceFrom) {
  //   query.price = { $gte: priceFrom }; // greater than equal to
  // }
  // if (priceTo) {
  //   query.price = { ...query.price, $lte: priceTo }; // less than equal to
  // }

  // const options = {
  //   page,
  //   limit,
  //   sort: { [sortBy]: sortOrder }, // sort object for mongoose-paginate
  //   populate: 'category', // optional: populate category
  // };

  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(',') };
  }

  try {
    // const productList = await Product.paginate(query, options);
    const productList = await Product.find(filter).select(
      'name image description -_id'
    );
    // const products = await Product.find().populate('category');
    if (!productList.length) {
      return res.status(200).json({ success: false, msg: 'No products found' });
    }
    return res.status(200).json(productList);
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getProduct = async (req, res) => {
  const productId = req.params.productId;

  if (!mongoose.isValidObjectId(productId)) {
    return res.status(404).json({ msg: 'Invalid product id' });
  }

  try {
    const product = await Product.findById(productId).populate('category');
    if (!product) {
      return res
        .status(404)
        .json({ success: false, msg: 'Product not found!' });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments((count) => count);
    if (!productCount) {
      return res
        .status(404)
        .json({ success: false, msg: 'No products found!' });
    }
    return res.status(200).json({ productCount: productCount });
  } catch (err) {
    console.error('Error fetching product:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getFeaturedProducts = async (req, res) => {
  const count = req.params.count ? req.params.count : 5;
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).limit(
      +count
    );
    if (!featuredProducts) {
      return res
        .status(404)
        .json({ success: false, msg: 'No products found!' });
    }
    return res.status(200).json(featuredProducts);
  } catch (err) {
    console.error('Error fetching product:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const postProduct = async (req, res) => {
  const productData = req.body;
  // console.log('current user id : ', req.user);
  // Check if a product with the same name already exists
  if (
    !productData.name ||
    !productData.description ||
    !productData.richDescription ||
    !productData.price ||
    !productData.category ||
    // !productData.image ||
    !productData.countInStock
  ) {
    return res.status(400).json({ msg: 'Missing Fields' });
  }

  const categoryExist = await Category.findById(productData.category);
  if (!categoryExist) {
    return res.status(404).json({ msg: 'This Category doesnot exist' });
  }

  const existingProduct = await Product.findOne({ name: productData.name });
  if (existingProduct) {
    return res
      .status(400)
      .json({ success: false, msg: 'Product with this name already exists' });
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

  if (!mongoose.isValidObjectId(productId)) {
    return res.status(404).json({ msg: 'Invalid product id' });
  }

  const updatedData = req.body;

  if (updatedData.category) {
    const categoryExist = await Category.findById(updatedData.category);
    if (!categoryExist) {
      return res.status(404).json({ msg: 'This Category doesnot exist' });
    }
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, msg: 'Product not found!' });
    }
    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.isValidObjectId(productId)) {
    return res.status(404).json({ msg: 'Invalid product id' });
  }

  try {
    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(404).json({ msg: 'Product not found!' });
    }
    return res
      .status(200)
      .json({ succes: true, msg: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  getProductCount,
  getFeaturedProducts,
  postProduct,
  updateProduct,
  deleteProduct,
};
