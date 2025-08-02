const bcrypt = require('bcrypt');

const users = []; // Simple in-memory user store for demonstration

class UserModel {
  // PUBLIC_INTERFACE
  /**
   * Registers a user with hashed password.
   * @param {string} username 
   * @param {string} password 
   * @returns {object} Created user or null if exists.
   */
  static async register(username, password) {
    if (users.find(u => u.username === username)) {
      return null;
    }
    const hash = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, username, password: hash };
    users.push(user);
    return { id: user.id, username: user.username };
  }

  // PUBLIC_INTERFACE
  /**
   * Authenticates a user.
   * @param {string} username 
   * @param {string} password 
   * @returns {object|null} Authenticated user or null.
   */
  static async authenticate(username, password) {
    const user = users.find(u => u.username === username);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;
    return { id: user.id, username: user.username };
  }

  // PUBLIC_INTERFACE
  /**
   * Gets a user by ID.
   * @param {number} id 
   * @returns {object|null}
   */
  static getById(id) {
    const user = users.find(u => u.id === id);
    if (!user) return null;
    return { id: user.id, username: user.username };
  }
}

module.exports = UserModel;
