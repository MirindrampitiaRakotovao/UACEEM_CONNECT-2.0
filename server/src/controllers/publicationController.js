const { Publication, Personnel } = require('../models');
const multer = require('multer');
const upload = require('../middleware/multer');
const jwt = require('jsonwebtoken');
const { getIO } = require('../../socket');

// Fonction pour obtenir l'utilisateur connecté
const getUtilisateurConnecte = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error('En-tête Authorization manquant');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new Error('Token invalide');
    }

    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'votre_clé_secrète_pour_jwt');
    } catch (error) {
        throw new Error('Token JWT invalide');
    }
};

// Contrôleur pour ajouter une nouvelle publication
const addPublication = async (req, res) => {
    const { audience, type, description } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    if (!description || !audience || !type) {
        return res.status(400).json({ error: "Tous les champs requis ne sont pas fournis" });
    }

    try {
        // Obtenir l'utilisateur connecté
        const utilisateur = getUtilisateurConnecte(req);

        // Créer la nouvelle publication
        const publication = await Publication.create({
            audience,
            type,
            description,
            image: JSON.stringify(images),
            auteurId: utilisateur.id,
        });

        // Récupérer la publication avec les détails de l'auteur
        const publicationAvecAuteur = await Publication.findByPk(publication.id, {
            include: [{
                model: Personnel,
                as: 'auteur',
                attributes: ['nomUtilisateur', 'photoProfil']
            }]
        });

        // Émettre un événement via Socket.IO avec les informations de l'auteur
        const io = getIO();
        io.emit('new_publication', publicationAvecAuteur);

        // Répondre avec la publication complète
        return res.status(201).json({
            message: "Publication ajoutée avec succès",
            publication: publicationAvecAuteur,
        });

    } catch (error) {
        console.error('Erreur lors de la création de la publication:', error);
        return res.status(500).json({
            error: "Une erreur s'est produite lors de l'ajout de la publication",
            details: error.message,
        });
    }
};

module.exports = {
    addPublication,
    upload,
};
