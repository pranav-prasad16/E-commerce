const express = require('express');
const Wishlist = require('../models/wishlist');
const Product = require('../models/products');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Apply authMiddleware to all routes defined below
router.use(authMiddleware);

router
  .get('/', async (req, res) => {
    try {
      const wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
        'products'
      );

      if (!wishlist) {
        return res.status(404).json({ msg: 'Wishlist not found for the user' });
      }

      res.json({ success: true, wishlistItems: wishlist.products });
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  })
  .post('/', async (req, res) => {
    try {
      const { productId } = req.body;

      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      // Check if the product is already in the wishlist
      const wishlist = await Wishlist.findOne({ user: req.user.id });
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ msg: 'Product already in wishlist' });
      }

      // Add the product to the wishlist
      wishlist.products.push(productId);
      await wishlist.save();

      res.json({ success: true, msg: 'Product added to wishlist' });
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  })
  .delete('/', async (req, res) => {
    try {
      const { productId } = req.body;

      // Remove the product from the wishlist
      const wishlist = await Wishlist.findOne({ user: req.user.id });
      wishlist.products = wishlist.products.filter(
        (product) => product.toString() !== productId
      );
      await wishlist.save();

      res.json({ success: true, msg: 'Product removed from wishlist' });
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  });

module.exports = router;
