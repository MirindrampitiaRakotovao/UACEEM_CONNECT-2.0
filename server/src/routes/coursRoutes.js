const express = require('express');
const router = express.Router();
const coursController = require('../controllers/coursController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const { uploadMultiple } = require('../middleware/uploads');

// Routes protégées pour les cours
// Seuls les professeurs peuvent accéder à ces routes
router.use(authenticate);

// Route pour obtenir les enseignements du professeur
router.get(
  '/enseignements',
  authorizeRoles('professeur'),
  coursController.getEnseignements
);

// Route pour créer un nouveau cours
router.post('/cours', 
    authenticate, 
    authorizeRoles('professeur'),
    uploadMultiple('fichiers', 5), // permet jusqu'à 5 fichiers
    coursController.createCours
);

// Route pour obtenir tous les cours d'un professeur
router.get(
  '/mes-cours',
  authorizeRoles('professeur'),
  coursController.getCoursProf
);

// Route pour modifier un cours
router.put(
  '/cours/:id',
  authorizeRoles('professeur'),
  coursController.updateCours
);

// Route pour supprimer un cours
router.delete(
  '/cours/:id',
  authorizeRoles('professeur'),
  coursController.deleteCours
);

// Route pour publier/dépublier un cours
router.patch(
  '/cours/:id/publication',
  authorizeRoles('professeur'),
  coursController.togglePublication
);

// Route pour obtenir un cours spécifique
router.get(
  '/cours/:id',
  authorizeRoles('professeur'),
  coursController.getCoursById
);

// Route pour obtenir les cours par matière
router.get(
  '/cours/matiere/:enseignementId',
  authorizeRoles('professeur'),
  coursController.getCoursByMatiere
);

module.exports = router;