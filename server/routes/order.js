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
  .get('/get/user/order/:userId', getAllUserOrders)
  .get('/:orderId', getOrder)
  .get('/status/:orderId', getOrderStatus)
  .post('/', postOrder)
  .put('/:orderId', updateOrder)
  .delete('/:orderId', deleteOrder);

router.use(adminAuthMiddleware);

router
  .get('/', getAllOrders)
  .get('/get/total/revenue', getTotalRevenue)
  .get('/get/count', getOrderCount)
  .patch('/update/order/status/:orderId', updateOrderStatus);
module.exports = router;
