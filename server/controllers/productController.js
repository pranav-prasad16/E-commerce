const mongoose = require('mongoose');
const multer = require('multer');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const getAllProducts = async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(',') };
  }
  try {
    // const productList = await Product.paginate(query, options);
    const productList = await Product.find(filter).select(
      'name image description brand price'
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
    const productCount = await Product.countDocuments();
    if (!productCount) {
      return res
        .status(404)
        .json({ success: false, msg: 'No products found!' });
    }
    return res.status(200).json({ productCount: productCount });
  } catch (err) {
    console.error('Error fetching product:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getFeaturedProducts = async (req, res) => {
  const count = req.params.count ? parseInt(req.params.count) : 5;
  if (isNaN(count) || count <= 0) {
    // Check if count is not a number or less than or equal to 0
    count = 5; // Default count to 5 if invalid or not provided
  }
  try {
    const featuredProducts = await Product.find({ isFeatured: true })
      .limit(+count)
      .select('name image description brand price');
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
  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
  // console.log(basePath + fileName);
  try {
    // const newProduct = await Product.create(productData);
    let newProduct = new Product({
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
    // console.log(`${file}`);
    // console.log(`${fileName}`);
    // console.log(`${basePath}${fileName}`);
    newProduct = await newProduct.save();

    if (!newProduct)
      return res.status(500).send('The product cannot be created');
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
        imagesPaths.push(`${basePath}${file.filename}`);
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
