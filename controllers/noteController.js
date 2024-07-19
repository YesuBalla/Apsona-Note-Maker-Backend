const Note = require('../models/Note');

// Create a new note
exports.createNote = async (req, res) => {
    const { title, content, tags, backgroundColor } = req.body;
    const userId = req.user.id;

    try {
        const newNote = new Note({
            userId,
            title,
            content,
            tags,
            backgroundColor,
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all notes for a user
exports.getNotes = async (req, res) => {
    const userId = req.user.id;
    try {
        const notes = await Note.find({ userId, archived: false, trash: false });
        res.json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific note
exports.getNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const note = await Note.findOne({ _id: id, userId, archived: false, trash: false });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a note
exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user.id;

    try {
        const note = await Note.findOneAndUpdate(
            { _id: id, userId, archived: false, trash: false },
            updates,
            { new: true }
        );
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Archive a note
exports.archiveNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const note = await Note.findOneAndUpdate(
            { _id: id, userId, archived: false, trash: false },
            { archived: true },
            { new: true }
        );
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Move a note to the trash
exports.trashNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const note = await Note.findOneAndUpdate(
            { _id: id, userId, trash: false },
            { trash: true },
            { new: true }
        );
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Restore a note from trash
exports.restoreNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const note = await Note.findOneAndUpdate(
            { _id: id, userId, trash: true },
            { trash: false },
            { new: true }
        );
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a note permanently
exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    try {
        const note = await Note.findOneAndDelete({ _id: id, userId});
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json({ message: 'Note deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get notes by tag
exports.getNotesByTag = async (req, res) => {
    const { tagId } = req.params;
    const userId = req.user.id;

    try {
        const notes = await Note.find({ userId, tags: tagId, archived: false, trash: false });
        res.json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Search notes
exports.searchNotes = async (req, res) => {
    const { query } = req.query;
    const userId = req.user.id;

    try {
        const notes = await Note.find({
            userId,
            archived: false,
            trash: false,
            $text: { $search: query }
        });
        res.json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all notes in the trash
exports.getTrashNotes = async (req, res) => {
    const userId = req.user.id;

    try {
        const notes = await Note.find({ userId, trash: true });
        res.json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
