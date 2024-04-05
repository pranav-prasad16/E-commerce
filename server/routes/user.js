const express = require('express');
const adminAuthMiddleware = require('../middleware/adminAuth');
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const router = express.Router();

router.use(adminAuthMiddleware);

router
  .get('/', getAllUsers)
  .get('/:userId', getUser)
  .patch('/:userId', updateUser)
  .delete('/:userId', deleteUser);

module.exports = router;
