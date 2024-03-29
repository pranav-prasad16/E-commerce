const express = require('express');
const Order = require('../models/orders');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router
  .get('/', async (req, res) => {
    try {
      const orders = await Order.find();
      if (!orders || !orders.length) {
        return res.status(200).json({ msg: 'No orders found' });
      }
      return res.status(200).json(orders);
    } catch (err) {
      console.log('Error : ', err.message);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })
  .get('/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ msg: 'Order not found!' });
      }
      return res.status(200).json(order);
    } catch (err) {
      console.log('Error : ', err.message);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })
  .post('/', async (req, res) => {
    const orderData = req.body;
    try {
      const newOrder = await Order.create(orderData);
      return res.status(201).json(newOrder);
    } catch (err) {
      console.log('Error : ', err.message);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })
  .patch('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const updatedData = req.body;
    try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedData, {
        new: true,
      });
      if (!updatedOrder) {
        return res.status(404).json({ msg: 'Order not found!' });
      }
      return res.status(200).json(updatedOrder);
    } catch (err) {
      console.error('Error:', err.message);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })
  .delete('/:orderId', async (req, res) => {
    const { orderId } = req.params;
    try {
      const deletedOrder = await Order.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        return res.status(404).json({ msg: 'Order not found!' });
      }
      return res.status(200).json({ msg: 'Order deleted successfully' });
    } catch (err) {
      console.error('Error:', err.message);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  });

module.exports = router;
