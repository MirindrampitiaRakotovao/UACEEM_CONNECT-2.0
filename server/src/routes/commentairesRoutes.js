const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createCommentaire,           // Créer un nouveau commentaire
  getCommentairesEtReponses,   // Récupérer les commentaires et réponses
  deleteCommentaire,           // Supprimer un commentaire
  createReponse                // Créer une réponse à un commentaire
} = require('../controllers/ajoutCommentaireController'); // Assurez-vous que le chemin du contrôleur est correct

// Route pour ajouter un commentaire avec le middleware d'authentification
router.post('/:publicationId', authMiddleware.authenticate, createCommentaire);

// Route pour récupérer les commentaires d'une publication
router.get('/recuperer/:publicationId', authMiddleware.authenticate, getCommentairesEtReponses);

// Route pour supprimer un commentaire
router.delete('/:commentaireId', authMiddleware.authenticate, deleteCommentaire);

// Route pour ajouter une réponse à un commentaire
router.post('/:publicationId/commentaires/:commentaireId/reponses', authMiddleware.authenticate, createReponse);

module.exports = router;
