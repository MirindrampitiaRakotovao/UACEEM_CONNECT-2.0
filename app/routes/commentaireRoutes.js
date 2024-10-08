const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');

router.post('/', commentaireController.createCommentaire);
router.get('/:publicationId', commentaireController.getCommentairesByPublication);
router.delete('/:commentaireId', commentaireController.deleteCommentaire);

module.exports = router;
