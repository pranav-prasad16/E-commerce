const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/profileController');
const router = express.Router();

router.use(authMiddleware);

router
  .get('/', getProfile)
  .patch('/', updateProfile)
  .delete('/', deleteProfile);

module.exports = router;
