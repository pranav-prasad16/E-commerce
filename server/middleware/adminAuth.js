const User = require('../models/users');

const adminAuthMiddleware = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const userRole = user.role;

  if (userRole !== 'admin') {
    return res
      .status(403)
      .json({ msg: 'Forbidden - Admin permissions required' });
  }

  next();
};

module.exports = adminAuthMiddleware;
