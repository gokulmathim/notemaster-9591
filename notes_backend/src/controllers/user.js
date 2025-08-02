const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

// PUBLIC_INTERFACE
/**
 * User registration and login controller.
 */
class UserController {
  /**
   * Registers a user.
   */
  async register(req, res) {
    const { username, password } = req.body;
    if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
      return res.status(400).json({ message: 'Username and password required.' });
    }
    const user = await UserModel.register(username, password);
    if (!user) return res.status(409).json({ message: 'User already exists' });
    return res.status(201).json({ user });
  }

  /**
   * Authenticates a user and returns a JWT.
   */
  async login(req, res) {
    const { username, password } = req.body;
    if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
      return res.status(400).json({ message: 'Username and password required.' });
    }
    const user = await UserModel.authenticate(username, password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign(user, process.env.JWT_SECRET || 'dev-super-secret', { expiresIn: '12h' });
    return res.json({ user, token });
  }

  /**
   * Gets the current user info.
   */
  async me(req, res) {
    const id = req.user && req.user.id;
    const user = UserModel.getById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user });
  }
}

module.exports = new UserController();
