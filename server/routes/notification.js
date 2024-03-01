const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/users');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// Configure nodemailer with your email provider's settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

router.post('/send', async (req, res) => {
  try {
    const { subject, message } = req.body;

    // Fetch the user's email from the database
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const userEmail = user.email;

    // Create the email options
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: userEmail,
      subject: subject,
      text: message,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ msg: 'Internal server error' });
      }

      console.log('Email sent:', info.response);
      res.status(200).json({ msg: 'Email sent successfully' });
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

module.exports = router;
