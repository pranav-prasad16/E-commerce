const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/userModel');

dotenv.config();

const signup = async (req, res) => {
  const userData = req.body;
  if (
    !userData.firstName ||
    !userData.lastName ||
    !userData.email ||
    !userData.phone ||
    !userData.password ||
    !userData.shippingAddress ||
    !userData.billingAddress ||
    !userData.city ||
    !userData.street ||
    !userData.pinCode ||
    !userData.country
  ) {
    return res.status(400).json({ msg: 'All fields are required...' });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { phone: userData.phone }],
    });

    if (existingUser) {
      return res.status(401).json({ msg: 'User already exists' });
    }
    //hashing the password -
    userData.password = bcrypt.hashSync(userData.password, process.env.SALT);

    const newUser = await User.create(userData);

    console.log(newUser);
    return res.status(201).json({ msg: 'Signup success' });
  } catch (err) {
    console.log('Error', err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = { signup };
