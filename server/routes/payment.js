const express = require('express');
const payment = require('../controllers/paymentController');
const router = express.Router();

router.post('/', payment);

module.exports = router;
