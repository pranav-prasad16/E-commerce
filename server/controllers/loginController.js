const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Load environment variables from the .env file
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ msg: 'All fields are required...' });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(409).json({ msg: 'User not found' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password)
      ? true
      : false;

    // const passwordMatch = user.password === password ? true : false;
    if (!passwordMatch) {
      return res.status(403).json({ msg: 'Incorrect password' });
    }

    const userId = user.id;
    const token = jwt.sign(
      {
        id: userId,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    console.log('Logged in');
    return res.status(201).json({ token, userId });
  } catch (err) {
    console.log('Error : ', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports = { login };
