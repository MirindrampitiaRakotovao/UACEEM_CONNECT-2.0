// authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Personnel } = require('../models');
require('dotenv').config();
const { getIO } = require('../../socket'); // Importer getIO

const SECRET_KEY = process.env.JWT_SECRET || 'votre_clé_secrète_pour_jwt';

const authController = {
  login: async (req, res) => {
    const { nomUtilisateur, motDePasse } = req.body;

    try {
      // Nettoyez les entrées pour éviter les espaces ou caractères invisibles
      const cleanedNomUtilisateur = nomUtilisateur.trim();
      const cleanedMotDePasse = motDePasse.trim();

      // 1. Vérifiez si le personnel existe dans la base de données
      const personnel = await Personnel.findOne({ where: { nomUtilisateur: cleanedNomUtilisateur } });

      if (!personnel) {
        return res.status(404).json({ message: 'Nom d’utilisateur ou mot de passe incorrect' });
      }

      // 2. Comparez le mot de passe envoyé avec celui de la base de données
      const motDePasseValide = await bcrypt.compare(cleanedMotDePasse, personnel.motDePasse);

      if (!motDePasseValide) {
        return res.status(401).json({ message: 'Nom d’utilisateur ou mot de passe incorrect' });
      }

      // 3. Créer un token JWT sans expiration
      const token = jwt.sign(
        { id: personnel.id, nomUtilisateur: personnel.nomUtilisateur, role: personnel.role },
        SECRET_KEY
      );

      // 4. Déterminer le message de bienvenue en fonction du rôle
      let messageBienvenue;
      switch (personnel.role) {
        case 'admin':
          messageBienvenue = 'Bienvenue Admin !';
          break;
        case 'professeur':
          messageBienvenue = 'Bienvenue Professeur !';
          break;
        case 'etudiant':
          messageBienvenue = 'Bienvenue Etudiant !';
          break;
        case 'president_association':
          messageBienvenue = 'Bienvenue President Association !';
          break;
        default:
          messageBienvenue = 'Bienvenue à vous!';
          break;
      }

      // 5. Renvoyer la réponse avec le token et le message de bienvenue
      res.status(200).json({
        message: `Connexion réussie. ${messageBienvenue}`,
        token,
        personnel: {
          id: personnel.id,
          nomUtilisateur: personnel.nomUtilisateur,
          role: personnel.role,
        }
      });

      // Émettre un message via Socket.IO
      getIO().emit('user_connected', { nomUtilisateur: cleanedNomUtilisateur }); // Émettre l'événement avec le nom d'utilisateur

    } catch (error) {
      console.error('Erreur lors de la tentative de connexion:', error); // Conserver pour le débogage
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  },
};

module.exports = authController;
