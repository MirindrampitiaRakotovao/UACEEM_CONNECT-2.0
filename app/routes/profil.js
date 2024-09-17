const express = require('express');
const Etudiants = require('../models/etudiants');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.get('/profil', authenticateToken, async (req, res) => {
    try {
        const etudiant = await Etudiants.findOne({
            where: { id: req.user.id },
            attributes: { exclude: ['password'] },
        });

        if (!etudiant) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        res.status(200).json({ etudiant });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
});

module.exports = router;
