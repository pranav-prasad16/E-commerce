const express = require('express');
const {
  postCart,
  getCart,
  updateCart,
  deleteCart,
} = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.use(authMiddleware);

router
  .post('/', postCart)
  .get('/:cartId', getCart)
  .patch('/:cartId', updateCart)
  .delete('/:cartId', deleteCart);

module.exports = router;
