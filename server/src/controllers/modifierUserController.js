const { Personnel } = require('../models'); // Importez le modèle User
const path = require('path'); // Ajoutez cela au début pour utiliser path

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Vérifiez si l'utilisateur existe
    const user = await Personnel.findByPk(id); // Utilisez 'findByPk' avec Sequelize
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mettre à jour les informations de l'utilisateur
    user.nom = req.body.nom;
    user.prenom = req.body.prenom;
    user.nomUtilisateur = req.body.nomUtilisateur;
    user.dateNaissance = req.body.dateNaissance;
    user.role = req.body.role;
    user.situationMatrimoniale = req.body.situationMatrimoniale;
    user.situationProfessionnelle = req.body.situationProfessionnelle;
    user.posteOccupe = req.body.posteOccupe;
    user.contact = req.body.contact;
    user.email = req.body.email;
    user.adresse = req.body.adresse;

    // Si une photo de profil est téléchargée, gérez-le ici
    if (req.file) {
      // Inclure le chemin complet vers le dossier "uploads"
      const profileImagePath = path.join('uploads', req.file.filename);
      user.photoProfil = profileImagePath; // Enregistrez le chemin complet dans la base de données
    }

    // Enregistrer les modifications
    await user.save();

    return res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};
