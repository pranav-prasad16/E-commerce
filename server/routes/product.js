const express = require('express');
const authMiddleware = require('../middleware/auth');
const adminAuthMiddleware = require('../middleware/adminAuth');
const {
  getAllProducts,
  getProduct,
  getProductCount,
  getFeaturedProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const router = express.Router();

router
  .get('/', getAllProducts)
  .get('/get/featured/:count', getFeaturedProducts);

router.use(authMiddleware);

router.get('/:productId', getProduct);

router.use(adminAuthMiddleware);
router
  .post('/', postProduct)
  .patch('/:productId', updateProduct)
  .delete('/:productId', deleteProduct)
  .get('/', getProductCount);

module.exports = router;
