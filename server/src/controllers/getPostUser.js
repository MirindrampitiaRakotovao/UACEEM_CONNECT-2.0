// controllers/postController.js
const { Publication, ReactionPublication, Commentaire, Personnel } = require('../models');

const getUserPosts = async (req, res) => {
  try {
    const userId = req.personnel.id; // Récupérez l'ID de l'utilisateur à partir du token
    const posts = await Publication.findAll({
      where: { auteurId: userId },
      include: [
        {
          model: ReactionPublication,
          as: 'reactions',
          attributes: ['id'], // Inclut les ID des réactions
        },
        {
          model: Commentaire,
          as: 'commentaires',
          attributes: ['id', 'text', 'auteurId'], // Inclut les ID et le texte des commentaires
        },
        {
          model: Personnel, // Inclure le modèle User pour récupérer les informations de l'auteur
          as: 'auteur', // Assurez-vous que le nom de l'association dans le modèle Publication est correct
          attributes: ['id', 'nomUtilisateur', 'photoProfil'], // Inclut les champs nécessaires
        },
      ],
    });

    // Ajoutez le nombre de réactions à chaque publication
    const postsWithCounts = posts.map(post => {
      const postJson = post.toJSON();
      return {
        ...postJson,
        reactionCount: postJson.reactions.length, // Compte des réactions
        commentaireCount: postJson.commentaires.length, // Compte des commentaires
        nomUtilisateur: postJson.auteur.nomUtilisateur, // Ajout du nom d'utilisateur
        photoProfil: postJson.auteur.photoProfil, // Ajout de la photo de profil
      };
    });

    res.status(200).json(postsWithCounts);
  } catch (error) {
    console.error('Erreur lors de la récupération des posts :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = {
  getUserPosts,
};
