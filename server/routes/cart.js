const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  postCart,
  getCart,
  updateCart,
  deleteCart,
} = require('../controllers/cartController');
const router = express.Router();

router.use(authMiddleware);

router
  .post('/', postCart)
  .get('/:cartId', getCart)
  .patch('/:cartId', updateCart)
  .delete('/:cartId', deleteCart);

module.exports = router;
