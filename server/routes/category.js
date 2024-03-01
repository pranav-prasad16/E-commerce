const express = require('express');
const Category = require('../models/category');
const Product = require('../models/products');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminAuthMiddleware = require('../middleware/adminAuth');

router.get('/', async (req, res) => {
  try {
    const category = await Category.find();
    if (!category) {
      return res.status(404).json({ msg: 'No category present' });
    }
    res.status(200).json(category);
  } catch (err) {
    console.log('Error : ', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

router.use(authMiddleware);
router.use(adminAuthMiddleware);
router
  .post('/', async (req, res) => {
    const categoryData = req.body;
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
  })
  .patch('/:categoryId', async (req, res) => {
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
  })
  .delete('/:categoryId', async (req, res) => {
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
  });

module.exports = router;
