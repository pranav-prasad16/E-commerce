const express = require('express');
const User = require('../models/users');
const router = express.Router();
const adminAuthMiddleware = require('../middleware/adminAuth');

router.use(adminAuthMiddleware);

router
  .get('/', async (req, res) => {
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
  })
  .get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ msg: 'User doesnot exist' });
      }
      res.status(201).json(user);
    } catch (error) {
      console.log('Error : ', error);
      res.status(500).json({ msg: 'Internal Server error' });
    }
  })
  .patch('/:userId', async (req, res) => {
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
  })
  .delete('/:userId', async (req, res) => {
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
  });

module.exports = router;
