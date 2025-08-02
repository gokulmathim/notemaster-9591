//
// PUBLIC_INTERFACE
/**
 * Demo controller for echoing notes.
 * This endpoint is for demonstration purposes ONLY.
 * In production, notes are NOT persisted by the backend for this route.
 * Real note data is stored and managed on the client (browser) via localStorage.
 */
class DemoController {
  /**
   * POST /api/demo/echo-notes
   * Echos back notes sent in the request body.
   * This endpoint does not store or retrieve notes from a database.
   * 
   * Request body:
   *   {
   *     notes: [...]
   *   }
   * 
   * Response:
   *   {
   *     echo: [...]
   *   }
   */
  echoNotes(req, res) {
    const { notes } = req.body;
    if (!Array.isArray(notes)) {
      return res.status(400).json({
        message: 'Missing or invalid \'notes\' array in request body.'
      });
    }
    // For demonstration, just echoes the notes array back.
    return res.json({
      echo: notes,
      meta: {
        note: 'This endpoint is for demo only; real notes are stored in localStorage on the frontend.'
      }
    });
  }
}

module.exports = new DemoController();
