const NoteModel = require('../models/note');

// PUBLIC_INTERFACE
/**
 * Notes controller for CRUD and search/tag features.
 */
class NoteController {
  /**
   * Creates a note.
   */
  async create(req, res) {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content required.' });
    }
    const note = NoteModel.create({ userId: req.user.id, title, content, tags });
    res.status(201).json({ note });
  }

  /**
   * Lists user's notes (optionally filter/search).
   */
  async list(req, res) {
    const { search, tag } = req.query;
    const notes = NoteModel.list(req.user.id, { search, tag });
    res.json({ notes });
  }

  /**
   * Gets a note by id.
   */
  async get(req, res) {
    const note = NoteModel.get(req.user.id, Number(req.params.id));
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ note });
  }

  /**
   * Updates a note.
   */
  async update(req, res) {
    const noteId = Number(req.params.id);
    const updates = req.body;
    const note = NoteModel.update(req.user.id, noteId, updates);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ note });
  }

  /**
   * Deletes a note.
   */
  async delete(req, res) {
    const noteId = Number(req.params.id);
    const ok = NoteModel.delete(req.user.id, noteId);
    if (!ok) return res.status(404).json({ message: 'Note not found' });
    res.status(204).send();
  }

  /**
   * Returns all unique tags for the user.
   */
  async tags(req, res) {
    const userNotes = NoteModel.list(req.user.id, {});
    const tagSet = new Set();
    userNotes.forEach(note => (note.tags || []).forEach(tag => tagSet.add(tag)));
    res.json({ tags: Array.from(tagSet) });
  }
}

module.exports = new NoteController();
