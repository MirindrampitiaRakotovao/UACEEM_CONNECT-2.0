// routes/forumRoutes.js
const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const authMiddleware = require('../middleware/authMiddleware');
const {uploadMultiple} = require('../middleware/uploads');

// Routes pour les forums
router.post('/forums', 
  authMiddleware.authenticate,
  uploadMultiple('fichiers', 5), // Limite à 5 fichiers
  forumController.creerForum
);

router.get('/forumsList', 
  authMiddleware.authenticate,
  forumController.recupererForums
);

router.get('/forums/:id', 
  authMiddleware.authenticate,
  forumController.recupererForum
);

// Routes pour les réponses
router.post('/forums/:forumId/reponses', 
  authMiddleware.authenticate,
  forumController.ajouterReponse
);

// Routes pour les réactions
router.post('/forums/:forumId/reactions', 
  authMiddleware.authenticate,
  forumController.reagir
);

router.post('/reponses/:reponseId/reactions', 
  authMiddleware.authenticate,
  forumController.reagir
);

router.delete('/forums/:forumId/reactions', 
  authMiddleware.authenticate,
  forumController.supprimerReaction
);

router.delete('/reponses/:reponseId/reactions', 
  authMiddleware.authenticate,
  forumController.supprimerReaction
);

module.exports = router;