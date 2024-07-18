const express = require('express');
const {
    createNote,
    getNotes,
    getNote,
    updateNote,
    archiveNote,
    trashNote,
    restoreNote,
    deleteNote,
    getNotesByTag,
    searchNotes,
    getTrashNotes,
} = require('../controllers/noteController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// Middleware to check authentication
router.use(authenticate);

router.post('/notes', createNote);
router.get('/notes', getNotes);
router.get('/notes/:id', getNote);

// Get notes by tag
router.get('/notes/tag/:tagId', getNotesByTag);
// Search notes
router.get('/notes/search', searchNotes);

// Get all notes in the trash
router.get('/notes/trash', getTrashNotes);


router.put('/notes/:id', updateNote);
router.patch('/notes/:id/archive', archiveNote);
router.patch('/notes/:id/trash', trashNote);
router.patch('/notes/:id/restore', restoreNote);
router.delete('/notes/:id', deleteNote);

module.exports = router;
