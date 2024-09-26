const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationController');
const authenticateToken = require('../middlewares/authenticateToken');
const upload = require('../middlewares/upload');


router.post('/create', authenticateToken, upload.array('fichiers', 10) , publicationController.createPost);

module.exports = router;
