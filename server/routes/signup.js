const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/', async (req, res) => {
  const body = req.body;
  if (
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.phone ||
    !body.password
  ) {
    return res.status(400).json({ msg: 'All fields are required...' });
  }

  try {
    const result = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      password: body.password,
      role: body.role || 'customer',
    });

    console.log('result : ', result);
    return res.status(201).json({ msg: 'Signup success' });
  } catch (err) {
    console.log('Error', err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

module.exports = router;
