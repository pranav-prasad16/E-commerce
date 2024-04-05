const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  getAllOrder,
  getOrder,
  postOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');
const router = express.Router();

router.use(authMiddleware);

router
  .get('/', getAllOrder)
  .get('/:orderId', getOrder)
  .post('/', postOrder)
  .patch('/:orderId', updateOrder)
  .delete('/:orderId', deleteOrder);

module.exports = router;
