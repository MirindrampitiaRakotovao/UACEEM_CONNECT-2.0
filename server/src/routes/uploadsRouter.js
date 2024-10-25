const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploads'); // Importer le middleware upload
const personnelService = require('../services/personnel');

// Route pour créer un personnel avec photo de profil
router.post('/personnel', upload.single('photoProfil'), async (req, res) => {
    try {
        const { nom, prenom, nomUtilisateur, dateNaissance, motDePasse, situationMatrimoniale, situationProfessionnelle, posteOccupe, contact, email, adresse, role } = req.body;

        // Chemin du fichier téléchargé
        const photoProfil = req.file ? `/uploads/${req.file.filename}` : null;

        // Créer l'enregistrement personnel
        const personnel = await personnelService.create({
            photoProfil,
            nom,
            prenom,
            nomUtilisateur,
            dateNaissance,
            motDePasse,
            situationMatrimoniale,
            situationProfessionnelle,
            posteOccupe,
            contact,
            email,
            adresse,
            role
        });

        res.status(201).json(personnel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
