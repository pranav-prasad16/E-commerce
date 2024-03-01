const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router
  .post('/', async (req, res) => {
    const cartData = req.body;
    // Check if the user already has a cart
    const existingCart = await Cart.findOne({ user: req.user.id });

    if (existingCart) {
      return res.status(200).json({ msg: 'Cart already exists' });
    }
    try {
      // Create a new cart for the user
      const newCart = await Cart.create(cartData);
      return res.status(201).json(newCart);
    } catch (error) {
      console.error('Error creating cart:', error);
      return res.status(500).json({ msg: 'Internal Server error' });
    }
  })
  .get('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        return res.status(404).json({ msg: 'No cart with the Id found' });
      }
      return res.status(201).json(cart);
    } catch (error) {
      console.error('Error: ', error.message);
      return res.status(500).json({ msg: 'Internal Server error' });
    }
  })
  .patch('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;
    const updatedCartData = req.body;
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        cartId,
        updatedCartData,
        {
          new: true,
        }
      );
      if (!updatedCart) {
        return res.status(404).json({ msg: 'No cart with the Id found' });
      }
      return res.status(201).json(updatedCart);
    } catch (error) {
      console.error('Error: ', error.message);
      return res.status(500).json({ msg: 'Internal Server error' });
    }
  })
  .delete('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;
    try {
      const deletedCart = await Cart.findByIdAndDelete(cartId);
      if (!deletedCart) {
        return res.status(404).json({ msg: 'No cart with the Id found' });
      }
      return res.status(201).json({ msg: 'Cart deleted' });
    } catch (error) {
      console.error('Error: ', error.message);
      return res.status(500).json({ msg: 'Internal Server error' });
    }
  });

module.exports = router;
