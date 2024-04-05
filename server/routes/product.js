const express = require('express');
const authMiddleware = require('../middleware/auth');
const adminAuthMiddleware = require('../middleware/adminAuth');
const {
  getAllProduct,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProduct);

router.use(authMiddleware);

router.get('/:productId', getProduct);

router.use(adminAuthMiddleware);
router
  .post('/', postProduct)
  .patch('/:productId', updateProduct)
  .delete('/:productId', deleteProduct);

module.exports = router;
