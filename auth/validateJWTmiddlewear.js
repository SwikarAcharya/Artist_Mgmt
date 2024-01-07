const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    slicedToken = token.slice(7);
    const decoded = jwt.verify(slicedToken, secretKey);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error('Error validating token:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateToken;

