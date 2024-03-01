const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const router = express.Router();
const User = require('../models/users');

// Load environment variables from the .env file
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.status(401).json({ msg: 'All fields are required...' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ msg: 'User not found' });
    }

    const passwordMatch = user.password === password ? true : false;
    if (!passwordMatch) {
      return res.status(403).json({ msg: 'Incorrect password' });
    }

    const userId = user.id;
    const token = jwt.sign(
      {
        id: userId,
      },
      JWT_SECRET
    );
    console.log('Logged in');
    return res.status(201).json({ token, userId });
  } catch (err) {
    console.log('Error : ', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

module.exports = router;
