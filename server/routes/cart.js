const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  getCartItems,
  addCartItems,
  deleteCartItems,
} = require('../controllers/cartController');
const router = express.Router();

router.use(authMiddleware);

router
  .get('/:userId', getCartItems)
  .put('/:userId', addCartItems)
  .delete('/:userId', deleteCartItems);

module.exports = router;
