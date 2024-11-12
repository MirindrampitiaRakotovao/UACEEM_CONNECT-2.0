const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

// Middleware d'authentification pour toutes les routes
router.use(authenticate);

// Routes pour les feedbacks
router.post(
    '/createfeedback', 
    authorizeRoles('etudiant'),  // Seuls les étudiants peuvent créer des feedbacks
    feedbackController.createFeedback
);

router.get(
    '/feedback/:coursId',
    feedbackController.getFeedbacksByCours
);

router.put(
    '/feedback/:id',
    authorizeRoles('etudiant'),  // Seuls les étudiants peuvent modifier leurs feedbacks
    feedbackController.updateFeedback
);

router.delete(
    '/remove-feedback/:id',
    authorizeRoles('etudiant'),  // Seuls les étudiants peuvent supprimer leurs feedbacks
    feedbackController.deleteFeedback
);

router.get(
    '/stats/:coursId',
    feedbackController.getFeedbackStats
);

// Route pour obtenir un feedback spécifique (si nécessaire)
router.get(
    '/feedback/detail/:id',
    feedbackController.getFeedbackById
);

module.exports = router;

/**
 * Documentation des routes :
 * 
 * POST /createFeedback
 * Body: {
 *   coursId: string,
 *   notation: number (1-5),
 *   commentaire: string
 * }
 * 
 * GET /feedback/:coursId
 * Query params: 
 *   - page (optional, default: 1)
 *   - limit (optional, default: 10)
 * 
 * PUT /feedback/:id
 * Body: {
 *   notation: number (1-5),
 *   commentaire: string
 * }
 * 
 * DELETE /remove-feedback/:id
 * 
 * GET /stats/:coursId
 * 
 * GET /feedback/detail/:id
 */