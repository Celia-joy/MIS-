const jwt = require('jsonwebtoken');
const config = require('config');
const debug = require('debug')('app:auth');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || (config.has('jwt.secret') ? config.get('jwt.secret') : 'your-super-secret-jwt-key-change-in-production');
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    debug('Token verification failed:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;

