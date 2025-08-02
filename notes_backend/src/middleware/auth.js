const jwt = require('jsonwebtoken');

/**
 * Express middleware for verifying JWT token and attaching user to req.user.
 */
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Missing or invalid token' });
  }
  jwt.verify(token, process.env.JWT_SECRET || 'dev-super-secret', (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;
