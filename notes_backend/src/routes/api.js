const express = require('express');
const userController = require('../controllers/user');
const noteController = require('../controllers/note');
const { authenticateJWT } = require('../middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User authentication
 *   - name: Notes
 *     description: Notes management
 *   - name: Tags
 *     description: Tag listing
 */

// Auth endpoints
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a user
 *     requestBody:
 *       description: Username and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created user
 *       409:
 *         description: User exists
 */
router.post('/auth/register', userController.register.bind(userController));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     requestBody:
 *       description: Username and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post('/auth/login', userController.login.bind(userController));

// User info endpoint
/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current user info
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User info
 *       401:
 *         description: Not authenticated
 */
router.get('/users/me', authenticateJWT, userController.me.bind(userController));

// Notes endpoints
/**
 * @swagger
 * /api/notes:
 *   post:
 *     tags: [Notes]
 *     summary: Create note
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Note to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Note created
 */
router.post('/notes', authenticateJWT, noteController.create.bind(noteController));

/**
 * @swagger
 * /api/notes:
 *   get:
 *     tags: [Notes]
 *     summary: List notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Tag filter
 *     responses:
 *       200:
 *         description: List of notes
 */
router.get('/notes', authenticateJWT, noteController.list.bind(noteController));

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     tags: [Notes]
 *     summary: Get note by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The note
 *       404:
 *         description: Not found
 */
router.get('/notes/:id', authenticateJWT, noteController.get.bind(noteController));

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     tags: [Notes]
 *     summary: Update a note
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Note update data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The updated note
 *       404:
 *         description: Not found
 */
router.put('/notes/:id', authenticateJWT, noteController.update.bind(noteController));

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     tags: [Notes]
 *     summary: Delete a note
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Note deleted
 *       404:
 *         description: Not found
 */
router.delete('/notes/:id', authenticateJWT, noteController.delete.bind(noteController));

/**
 * @swagger
 * /api/tags:
 *   get:
 *     tags: [Tags]
 *     summary: List all user tags
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tags
 */
router.get('/tags', authenticateJWT, noteController.tags.bind(noteController));

module.exports = router;
