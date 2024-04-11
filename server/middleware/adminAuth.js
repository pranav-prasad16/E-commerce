const User = require('../models/userModel');

const adminAuthMiddleware = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.isAdmin === false) {
    return res
      .status(403)
      .json({ msg: 'Forbidden - Admin permissions required' });
  }

  next();
};

module.exports = adminAuthMiddleware;
