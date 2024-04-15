const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');
// const { post } = require('./profile');

const getAllOrders = async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate('user', 'name email')
      .sort('orderDate');
    if (!orderList || !orderList.length) {
      return res.status(200).json({ msg: 'No orders found' });
    }
    return res.status(200).json(orderList);
  } catch (err) {
    console.log('Error : ', err.message);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const getAllUserOrders = async (req, res) => {
  const userId = req.params.userId;
  try {
    const userOrderList = await Order.find({ userId })
      .populate({
        path: 'orderItem',
        populate: { path: 'product', populate: 'category' },
      })
      .sort({ orderDate: -1 });
    if (!userOrderList || !userOrderList.length) {
      return res.status(200).json({ msg: 'No orders found' });
    }
    return res.status(200).json(userOrderList);
  } catch (err) {
    console.log('Error : ', err.message);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const getOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId)
      .populate('user', 'name email')
      .populate({
        path: 'orderItem',
        populate: { path: 'product', populate: 'category' },
      });
    if (!order) {
      return res.status(404).json({ msg: 'Order not found!' });
    }
    return res.status(200).json(order);
  } catch (err) {
    console.log('Error : ', err.message);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const getOrderStatus = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId);
    if (!order.status) {
      return res.status(404).json({ msg: 'Order status not found!' });
    }
    return res.status(200).json(order.status);
  } catch (err) {
    console.log('Error : ', err.message);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, totalReveue: { $sum: 'totalPrice' } } },
    ]);
    if (!totalRevenue) {
      return res
        .status(404)
        .json({ msg: 'Total Revenue cannot be genereated' });
    }
    return res
      .status(200)
      .json({ totalRevenue: totalRevenue.pop().totalRevenue });
  } catch (err) {
    console.log('Error : ', err.message);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const getOrderCount = async (req, res) => {
  try {
    const orderCount = await Order.countDocuments((count) => count);
    if (!orderCount) {
      return res.status(404).json({ success: false, msg: 'No orders found!' });
    }
    return res.status(200).json({ productCount: orderCount });
  } catch (err) {
    console.error('Error fetching product:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const postOrder = async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );
  const orderItemsIdsResolved = await orderItemsIds;

  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findbyId(orderItemId).populate(
        'product',
        'price'
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;

      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
  try {
    let newOrder = new Order({
      orderItems: orderItemsIdsResolved,
      shippingAddress1: req.body.shippingAddress1,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.body.user,
    });
    newOrder = await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (err) {
    console.log('Error : ', err.message);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const updateOrder = async (req, res) => {
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
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: req.body.status },
      {
        new: true,
      }
    );
    if (!updatedOrder) {
      return res.status(404).json({ msg: 'Order not found!' });
    }
    return res.status(200).json(updatedOrder);
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const deleteOrder = (req, res) => {
  const { orderId } = req.params;
  const deletedOrder = Order.findByIdAndDelete(orderId)
    .then(async (order) => {
      if (deletedOrder) {
        order.orderItem.map(async (orderItem) => {
          await OrderItem.findByIdAndDelete(orderItem);
        });

        return res
          .status(200)
          .json({ success: true, msg: 'Order deleted successfully' });
      } else {
        return res
          .status(404)
          .json({ success: false, msg: 'Order not found!' });
      }
    })
    .catch((err) => {
      console.error('Error:', err.message);
      return res.status(500).json({ msg: 'Internal server error' });
    });
};

module.exports = {
  getAllOrders,
  getAllUserOrders,
  getOrder,
  getOrderStatus,
  getOrderCount,
  getTotalRevenue,
  postOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
};
