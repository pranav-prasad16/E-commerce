const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

const getAllCategory = async (req, res) => {
  try {
    const categoryList = await Category.find();
    if (!categoryList) {
      return res.status(404).json({ msg: 'No category present' });
    }
    res.status(200).json(categoryList);
  } catch (err) {
    console.log('Error : ', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const getCategory = async (req, res) => {
  const selectedCategory = req.params.category;
  try {
    await Product.find({ category: selectedCategory })
      .populate('category')
      .exec((err, products) => {
        if (err) {
          console.error('Error : ', err);
        } else if (selectedCategory.length === 0) {
          res.status(404).json({ message: 'No products in this category' });
        } else {
          res.status(200).json(products);
        }
      });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const postCategory = async (req, res) => {
  const categoryData = req.body;
  if (!categoryData.name || !categoryData.icon || !categoryData.color) {
    return res.status(400).json({ msg: 'Missing Fields' });
  }
  try {
    const existingCategory = await Category.find({ name: categoryData.name });
    if (existingCategory) {
      return res.status(401).json({ msg: 'This category already exists' });
    }
    const newCategory = await Category.create(categoryData);
    return res.status(201).json(newCategory);
  } catch (err) {
    console.log('Error : ', err.message);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const updateCateogry = async (req, res) => {
  const { categoryId } = req.params;
  const updatedData = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updatedData,
      {
        new: true,
      }
    );
    if (!updatedCategory) {
      return res.status(404).json({ msg: 'Category not found!' });
    }
    return res.status(200).json(updatedCategory);
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const deleteCategory = await Category.findByIdAndDelete(categoryId);
    if (!deleteCategory) {
      return res.status(404).json({ msg: 'Category not found!' });
    }
    return res.status(200).json({ msg: 'Category deleted successfully' });
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports = {
  getAllCategory,
  getCategory,
  postCategory,
  updateCateogry,
  deleteCategory,
};
