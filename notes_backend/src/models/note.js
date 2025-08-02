let notes = [];
let noteIdCounter = 1;

class NoteModel {
  // PUBLIC_INTERFACE
  /**
   * Creates a new note.
   * @param {object} data {userId, title, content, tags}
   * @returns {object} The created note.
   */
  static create({ userId, title, content, tags }) {
    const note = {
      id: noteIdCounter++,
      userId,
      title,
      content,
      tags: Array.isArray(tags) ? tags : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.push(note);
    return note;
  }

  // PUBLIC_INTERFACE
  /**
   * Lists all notes for a user, with optional search and tag filter.
   * @param {number} userId 
   * @param {object} opts 
   * @returns {object[]}
   */
  static list(userId, { search, tag }) {
    let userNotes = notes.filter(n => n.userId === userId);
    if (search) {
      const s = search.toLowerCase();
      userNotes = userNotes.filter(note => (note.title + note.content).toLowerCase().includes(s));
    }
    if (tag) {
      userNotes = userNotes.filter(note => note.tags.includes(tag));
    }
    return userNotes;
  }

  // PUBLIC_INTERFACE
  /**
   * Gets a note by ID (checks user).
   * @param {number} userId 
   * @param {number} noteId 
   */
  static get(userId, noteId) {
    return notes.find(n => n.userId === userId && n.id === noteId) || null;
  }

  // PUBLIC_INTERFACE
  /**
   * Updates a note.
   * @param {number} userId 
   * @param {number} noteId 
   * @param {object} data 
   * @returns {object|null}
   */
  static update(userId, noteId, data) {
    const note = notes.find(n => n.userId === userId && n.id === noteId);
    if (!note) return null;
    if (data.title !== undefined) note.title = data.title;
    if (data.content !== undefined) note.content = data.content;
    if (data.tags !== undefined) note.tags = Array.isArray(data.tags) ? data.tags : note.tags;
    note.updatedAt = new Date().toISOString();
    return note;
  }

  // PUBLIC_INTERFACE
  /**
   * Deletes a note.
   * @param {number} userId 
   * @param {number} noteId 
   * @returns {boolean}
   */
  static delete(userId, noteId) {
    const initial = notes.length;
    notes = notes.filter(n => !(n.userId === userId && n.id === noteId));
    return notes.length < initial;
  }
}

module.exports = NoteModel;
