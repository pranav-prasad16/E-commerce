const express = require('express');
const {
  getAllCategory,
  getCategory,
  postCategory,
  updateCateogry,
  deleteCategory,
} = require('../controllers/categoryController');
const authMiddleware = require('../middleware/auth');
const adminAuthMiddleware = require('../middleware/adminAuth');
const router = express.Router();

router.get('/', getAllCategory);

router.use(authMiddleware);
router.use(adminAuthMiddleware);
router
  .post('/', postCategory)
  .get('/:categoryId', getCategory)
  .patch('/:categoryId', updateCateogry)
  .delete('/:categoryId', deleteCategory);

module.exports = router;
