const express = require('express');
const authMiddleware = require('../middleware/auth');
const { sendNotification } = require('../controllers/notificationController');
const router = express.Router();

router.use(authMiddleware);

router.post('/send', sendNotification);

module.exports = router;
