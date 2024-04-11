const express = require('express');
const authMiddleware = require('../middleware/auth');
const adminAuthMiddleware = require('../middleware/adminAuth');
const {
  getAllCategory,
  getCategory,
  postCategory,
  updateCateogry,
  deleteCategory,
} = require('../controllers/categoryController');
const router = express.Router();

router.get('/', getAllCategory).get('/:categoryId', getCategory);

router.use(authMiddleware);
router.use(adminAuthMiddleware);
router
  .post('/', postCategory)
  .patch('/:categoryId', updateCateogry)
  .delete('/:categoryId', deleteCategory);

module.exports = router;
