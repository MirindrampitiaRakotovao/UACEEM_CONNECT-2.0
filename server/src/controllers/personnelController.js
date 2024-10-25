const bcrypt = require('bcrypt');
const { Personnel } = require('../models'); // Assurez-vous que ce chemin est correct

// Contrôleur pour créer un personnel
const createPersonnel = async (req, res) => {
    console.log(req.body);

    try {
        // Extraire les données de la requête
        const { 
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
        } = req.body;

        // Vérifier que tous les champs requis sont présents
        if (!nom || !prenom || !nomUtilisateur || !dateNaissance || !motDePasse || !situationMatrimoniale || !situationProfessionnelle || !posteOccupe || !contact || !email || !adresse || !role) {
            return res.status(400).json({ error: 'Tous les champs doivent être remplis' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        // Afficher le mot de passe hashé dans la console
        console.log('Mot de passe hashé:', hashedPassword);

        // Chemin du fichier téléchargé (photoProfil)
        const photoProfil = req.file ? req.file.path : null;

        // Créer l'enregistrement personnel directement dans le modèle
        const personnel = await Personnel.create({
            photoProfil,
            nom,
            prenom,
            nomUtilisateur,
            dateNaissance,
            motDePasse: hashedPassword, // Stocker le mot de passe hashé
            situationMatrimoniale,
            situationProfessionnelle,
            posteOccupe,
            contact,
            email,
            adresse,
            role
        });

        // Exclure le mot de passe en clair des logs
        const personnelSansMotDePasse = { ...personnel.toJSON(), motDePasse: undefined };

        // Répondre avec le personnel créé sans le mot de passe en clair
        res.status(201).json(personnelSansMotDePasse);
    } catch (error) {
        console.error('Erreur lors de la création du personnel:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

module.exports = {
    createPersonnel
};
