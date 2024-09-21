const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Etudiant = require('../models/etudiants');

/*login*/
const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_key';

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
      // Trouver l'étudiant avec le nom d'utilisateur
      const etudiant = await Etudiant.findOne({ where: { username } });

      if (!etudiant) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Vérification du mot de passe
      const validPassword = await bcrypt.compare(password, etudiant.password);
      if (!validPassword) {
          return res.status(401).json({ message: 'Mot de passe incorrect' });
      }

      //mise à jour du status en ligne
      await etudiant.update({ status: true });

      // Générer un token JWT
      const token = jwt.sign(
          { id: etudiant.id, username: etudiant.username, role:etudiant.role }, 
          JWT_SECRET, 
          { expiresIn: '1h' });

      // Envoyer le token dans un cookie sécurisé
      res.cookie('token', token, {
          httpOnly: true, // Empêche l'accès par JavaScript
          secure: process.env.NODE_ENV === 'production', // En production, utiliser HTTPS
          maxAge: 3600000 // 1 heure
      });


      // Retirer le mot de passe avant de retourner l'objet utilisateur
      const { password: etudiantPassword, ...etudiantSansMotDePasse } = etudiant.dataValues;


      res.status(200).json({
          token,
          etudiant: etudiantSansMotDePasse
      });

      
      
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur', error });
  }

};

/*logout*/
exports.logout = async (req, res) => {
  try {
    // Utilisateur authentifié via JWT
    const etudiantId = req.user.id;

    // Récupérer l'étudiant connecté
    const etudiant = await Etudiant.findByPk(etudiantId);

    if (!etudiant) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mise à jour du statut à false pour indiquer que l'utilisateur est hors ligne
    await etudiant.update({ status: false });

    // Effacer le cookie contenant le token
    res.clearCookie('token');

    res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

/*creer un etudiant*/
exports.createEtudiant = async (req, res) => {
  try {
    const { nom, email, mention_id, matricule, sexe, date_nais, lieu_nais, situation_matri, password, username } = req.body;

    // Vérifier si l'email ou le matricule existe déjà
    const existingEtudiant = await Etudiant.findOne({ where: { [Op.or]: [{ email }, { matricule }, { username }] } });
    if (existingEtudiant) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'étudiant
    const etudiant = await Etudiant.create({
      nom,
      email,
      mention_id,
      matricule,
      sexe,
      date_nais,
      lieu_nais,
      situation_matri,
      password: hashedPassword,
      username
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès', etudiant });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
};

/*consulter profil*/
exports.getProfil = async (req, res) => {
    try {
        // Utilisateur authentifié via JWT
        const etudiantId = req.user.id;

        // Récupérer les informations de l'étudiant connecté
        const etudiant = await Etudiant.findByPk(etudiantId, {
            attributes: { exclude: ['password'] }, // Exclure le mot de passe
        });

        if (!etudiant) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }

        res.status(200).json({ etudiant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

/* Fonction pour mettre à jour la photo de profil */
exports.updatePhoto = async (req, res) => {
  try {
    const etudiantId = req.user.id;
    const etudiant = await Etudiant.findByPk(etudiantId);
    
    if (!etudiant) {
      return res.status(404).json({ error: 'Étudiant non trouvé' });
    }

    // Mettre à jour le chemin de la photo dans la base de données
    etudiant.photo = `../uploads/${req.file.filename}`;
    await etudiant.save();

    res.status(200).json({ message: 'Photo mise à jour avec succès', photo: etudiant.photo });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
};

/*Fonction pour récupérer la liste de tous les utilisateurs */
exports.getAllUsers = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs sans inclure le mot de passe
    const utilisateurs = await Etudiant.findAll({
      attributes: { exclude: ['password'] } // Exclure les mots de passe
    });

    res.status(200).json({ utilisateurs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
  }
};
