// controllers/userController.js
const { Personnel } = require('../models'); // Importez le modèle User

// Fonction pour supprimer un utilisateur
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Chercher l'utilisateur par son ID
    const user = await Personnel.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Supprimer l'utilisateur
    await user.destroy();

    return res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
  }
};

module.exports = { deleteUser };
