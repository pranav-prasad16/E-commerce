const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; // Your secret key

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers, query parameters, or cookies
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized - No token provided' });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: 'Unauthorized - Invalid token' });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
    next(); // Move on to the next middleware or route handler
  });
};

module.exports = authMiddleware;
