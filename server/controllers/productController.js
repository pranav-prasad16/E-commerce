const mongoose = require('mongoose');
const multer = require('multer');
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
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(404).json({ msg: 'Invalid Category' });
  const file = req.file;
  if (!file) return res.status(400).json({ msg: 'No image in the request' });
  const fileName = req.file.fileName;
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
  try {
    // const newProduct = await Product.create(productData);
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      price: req.body.price,
      brand: req.body.brand,
      category: category,
      image: `${basePath}${fileName}`,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });
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

const updateProductImages = async (req, res) => {
  const { productId } = req.params;
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(404).json({ msg: 'Invalid product id' });
  }
  try {
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    if (files) {
      files.map((file) => {
        imagesPaths.push(`${basePath}${file.fileName}`);
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { images: imagesPaths },
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    return res.status(201).json(updatedProduct);
  } catch (error) {
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
  updateProductImages,
  deleteProduct,
};
