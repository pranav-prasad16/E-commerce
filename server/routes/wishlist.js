const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  getWishlistItems,
  postWishlistItems,
  deleteWishlistItems,
} = require('../controllers/wishlistController');
const router = express.Router();

// Apply authMiddleware to all routes defined below
router.use(authMiddleware);

router
  .get('/', getWishlistItems)
  .post('/', postWishlistItems)
  .delete('/', deleteWishlistItems);

module.exports = router;
