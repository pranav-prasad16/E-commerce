const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      res.status(404).json({ msg: 'No users found' });
    }
    res.status(200).json(allUsers);
  } catch (err) {
    console.log('Error : ', err);
    res.status(500).json({ msg: 'Internal Server error' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      res.status(404).json({ success: false, msg: 'No user found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log('Error : ', err);
    res.status(500).json({ msg: 'Internal Server error' });
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

module.exports = { getAllUsers, getUser, updateUser, deleteUser };
