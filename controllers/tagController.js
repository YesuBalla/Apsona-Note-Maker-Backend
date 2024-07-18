const Tag = require('../models/Tag');

// Create a new tag
exports.createTag = async (req, res) => {
    const { name } = req.body;

    try {
        const tag = new Tag({ name });
        await tag.save();
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all tags
exports.getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific tag
exports.getTag = async (req, res) => {
    const { id } = req.params;

    try {
        const tag = await Tag.findById(id);
        if (!tag) return res.status(404).json({ error: 'Tag not found' });
        res.json(tag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
