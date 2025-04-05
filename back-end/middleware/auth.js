// middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware để xác thực JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Access token is missing',
      error: 'No token provided in Authorization header',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({
          message: 'Token has expired',
          error: 'Please login again to get a new token',
        });
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({
          message: 'Invalid token',
          error: 'Token is malformed or not valid',
        });
      }
      return res.status(403).json({
        message: 'Failed to authenticate token',
        error: err.message,
      });
    }

    req.user = user;
    next();
  });
};

// Middleware để kiểm tra quyền (dành cho tương lai, nếu cần phân quyền)
const authorizeRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({
      message: 'Access denied',
      error: `You do not have the required role: ${role}`,
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  authorizeRole,
};