const User = require('../models/userModel');

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
    const result = await User.create(userData);

    console.log('result : ', result);
    return res.status(201).json({ msg: 'Signup success' });
  } catch (err) {
    console.log('Error', err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = { signup };
