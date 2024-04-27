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
router.use(adminAuthMiddleware);

router
  .get('/', getAllUsers)
  .get('/:userId', getUser)
  .get('/user/count', getUserCount)
  .patch('/:userId', updateUser)
  .delete('/:userId', deleteUser);

module.exports = router;
