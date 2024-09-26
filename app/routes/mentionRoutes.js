const express = require('express');
const router = express.Router();
const mentionController = require('../controllers/mentionController');

// Route pour créer une mention
router.post('/create', mentionController.createMention);

module.exports = router;
