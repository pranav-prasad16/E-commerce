const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Wishlist = require('../models/wishlistModel');
const Order = require('../models/orderModel');

const getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    const allOrders = [];
    const orders = await Order.find({ customerId: userId });
    allOrders.push(orders);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ user, allOrders });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const updateFields = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ msg: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const deleteProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByIdAndRemove(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Remove related records in Cart and Wishlist
    await Cart.deleteMany({ user: userId });
    await Wishlist.deleteMany({ user: userId });

    res.status(200).json({ msg: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports = { getProfile, updateProfile, deleteProfile };
