const express = require('express');
const authMiddleware = require('../middleware/auth');
const adminAuthMiddleware = require('../middleware/adminAuth');
const {
  getAllOrders,
  getAllUserOrders,
  getOrder,
  getOrderStatus,
  getTotalRevenue,
  getOrderCount,
  postOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const router = express.Router();

router.use(authMiddleware);

router
  .get('/get/userOrders/:userId', getAllUserOrders)
  .get('/:orderId', getOrder)
  .get('/:orderId/status', getOrderStatus)
  .post('/', postOrder)
  .patch('/:orderId', updateOrder)
  .delete('/:orderId', deleteOrder);

router.use(adminAuthMiddleware);

router
  .get('/', getAllOrders)
  .get('/get/totalSales', getTotalRevenue)
  .get('/get/count', getOrderCount)
  .put('/:orderId', updateOrderStatus);
module.exports = router;
