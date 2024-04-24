const express = require('express');
const authMiddlware = require('../middleware/auth');
const adminAuthMiddleware = require('../middleware/adminAuth');
const {
  getAllUsers,
  getUser,
  getUserCount,
  updateUser,
  updateUserPassword,
  deleteUser,
} = require('../controllers/userController');
const router = express.Router();

router.use(authMiddlware);

router.patch('/:userId', updateUser);

router.use(adminAuthMiddleware);

router
  .get('/', getAllUsers)
  .get('/:userId', getUser)
  .get('/user/count', getUserCount)
  .delete('/:userId', deleteUser);

module.exports = router;
