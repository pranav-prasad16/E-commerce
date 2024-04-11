const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const userList = await User.find().select('name phone email');
    if (!userList) {
      res.status(404).json({ msg: 'No users found' });
    }
    res.status(200).json(userList);
  } catch (err) {
    console.log('Error : ', err);
    res.status(500).json({ msg: 'Internal Server error' });
  }
};

const getUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log('Error : ', err);
    res.status(500).json({ msg: 'Internal Server error' });
  }
};

const getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments((count) => count);
    if (!userCount) {
      return res.status(404).json({ success: false, msg: 'No users found!' });
    }
    return res.status(200).json({ userCount: userCount });
  } catch (err) {
    console.error('Error fetching users:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ msg: 'User not found' });
    }
    res.status(201).json(updatedUser);
  } catch (error) {
    console.log('Error : ', error);
    res.status(500).json({ msg: 'Internal Server error' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    console.log('Error : ', error);
    res.status(500).json({ msg: 'Internal Server error' });
  }
};

module.exports = { getAllUsers, getUser, getUserCount, updateUser, deleteUser };
