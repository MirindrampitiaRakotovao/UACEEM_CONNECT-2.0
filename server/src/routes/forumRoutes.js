const express = require('express');
const router = express.Router();
const { body } = require('express-validator'); 
const forumController = require('../controllers/forumController');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadFields } = require('../middleware/uploads');
// Routes pour les forums
router.post('/forums', 
    authMiddleware.authenticate,
    uploadFields([
        { name: 'audio', maxCount: 1 },
        { name: 'fichiers', maxCount: 5 }
    ]),
    forumController.validationCreerForum(), // Ajout de la validation
    forumController.handleValidationErrors, // Middleware de gestion des erreurs
    forumController.creerForum 
);
// Liste des forums
router.get('/forumsList', 
    authMiddleware.authenticate,
    forumController.recupererForums 
);
// Détail d'un forum
router.get('/detail/:id', 
    authMiddleware.authenticate,
    forumController.recupererForum 
);
// Supprimer un forum
router.delete('/delete/:id', 
    authMiddleware.authenticate,
    forumController.supprimerForum
);
// Routes pour les réponses
router.post('/forums/:forumId/reponses', 
    authMiddleware.authenticate,
    forumController.validationAjouterReponse(), // Ajout de la validation
    forumController.handleValidationErrors, // Middleware de gestion des erreurs
    forumController.ajouterReponse 
);
// Routes pour les réactions
router.post(
  '/forums/:forumId/reactions', 
  authMiddleware.authenticate,
  [
      body('type').isIn(['reaction', 'partage']).withMessage('Type de réaction invalide')
  ],
  forumController.reagir
);
router.post('/reponses/:reponseId/reactions', 
    authMiddleware.authenticate,
    forumController.validationReagir(), // Ajout de la validation
    forumController.handleValidationErrors, // Middleware de gestion des erreurs
    forumController.reagir 
);
// Routes pour supprimer les réactions
router.delete('/forums/:forumId/reactions', 
    authMiddleware.authenticate,
    forumController.supprimerReaction 
);
router.delete('/reponses/:reponseId/reactions', 
    authMiddleware.authenticate,
    forumController.supprimerReaction 
);
module.exports = router;