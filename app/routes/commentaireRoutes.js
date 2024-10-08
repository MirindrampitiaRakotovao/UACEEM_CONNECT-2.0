const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');

// Route pour créer un nouveau commentaire
router.post('/', commentaireController.createCommentaire);

// Route pour récupérer tous les commentaires et réponses d'une publication
router.get('/:publicationId', commentaireController.getCommentairesEtReponses);

// Route pour supprimer un commentaire (ou une réponse)
router.delete('/:commentaireId', commentaireController.deleteCommentaire);

// Route pour créer une réponse à un commentaire
router.post('/reponse', commentaireController.createReponse);

module.exports = router;
