const { Forum, ForumReponse, ForumReaction, Personnel } = require('../models');
const { getIO } = require('../../socket');
const { Op } = require('sequelize');

class ForumController {
  // Créer un nouveau forum
  async creerForum(req, res) {
    try {
      const { titre, contenu, categorie, motsCles } = req.body;
      const fichiers = req.files;
      const auteurId = req.personnel.id;

      // Validation de base
      if (!titre || titre.trim().length < 3) {
        return res.status(400).json({
          message: 'Le titre doit contenir au moins 3 caractères'
        });
      }

      if (!contenu || contenu.trim().length < 10) {
        return res.status(400).json({
          message: 'Le contenu doit contenir au moins 10 caractères'
        });
      }

      // Traitement des fichiers
      const pieceJointes = fichiers ? fichiers.map(file => ({
        nom: file.filename,
        chemin: file.path,
        type: file.mimetype,
        taille: file.size
      })) : [];

      // Traitement des mots-clés
      let motsClesTraites = [];
      try {
        motsClesTraites = typeof motsCles === 'string' 
          ? JSON.parse(motsCles) 
          : (Array.isArray(motsCles) ? motsCles : []);
      } catch (error) {
        console.error('Erreur parsing mots-clés:', error);
        motsClesTraites = [];
      }

      // Créer le forum
      const forum = await Forum.create({
        titre: titre.trim(),
        contenu: contenu.trim(),
        categorie: categorie || 'Général',
        motsCles: motsClesTraites,
        pieceJointes,
        auteurId
      });

      // Charger les informations de l'auteur
      const forumAvecAuteur = await Forum.findByPk(forum.id, {
        include: [{
          model: Personnel,
          as: 'auteur',
          attributes: ['id', 'nom', 'prenom', 'photoProfil']
        }]
      });

      // Émettre un événement socket.io
      const io = getIO();
      if (io) {
        io.emit('nouveauForum', forumAvecAuteur);
      }

      res.status(201).json({
        message: 'Forum créé avec succès',
        forum: forumAvecAuteur
      });
    } catch (erreur) {
      console.error('Erreur lors de la création du forum:', erreur);
      res.status(500).json({
        message: 'Erreur lors de la création du forum',
        erreur: erreur.message
      });
    }
  }

  // Récupérer tous les forums
  async recupererForums(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limite = parseInt(req.query.limite) || 10;
      const offset = (page - 1) * limite;

      const forums = await Forum.findAndCountAll({
        include: [
          {
            model: Personnel,
            as: 'auteur',
            attributes: ['id', 'nom', 'prenom', 'photoProfil']
          },
          {
            model: ForumReponse,
            as: 'reponses',
            separate: true,
            limit: 3,
            order: [['createdAt', 'DESC']],
            include: [{
              model: Personnel,
              as: 'auteur',
              attributes: ['id', 'nom', 'prenom', 'photoProfil']
            }]
          }
        ],
        order: [['createdAt', 'DESC']],
        limit: limite,
        offset: offset
      });

      res.json({
        forums: forums.rows,
        pagination: {
          total: forums.count,
          pages: Math.ceil(forums.count / limite),
          pageActuelle: page,
          limitParPage: limite
        }
      });
    } catch (erreur) {
      res.status(500).json({
        message: 'Erreur lors de la récupération des forums',
        erreur: erreur.message
      });
    }
  }

  // Récupérer un forum spécifique
  async recupererForum(req, res) {
    try {
      const { id } = req.params;
      const forum = await Forum.findByPk(id, {
        include: [
          {
            model: Personnel,
            as: 'auteur',
            attributes: ['id', 'nom', 'prenom', 'photoProfil']
          },
          {
            model: ForumReponse,
            as: 'reponses',
            include: [{
              model: Personnel,
              as: 'auteur',
              attributes: ['id', 'nom', 'prenom', 'photoProfil']
            }],
            order: [['createdAt', 'ASC']]
          }
        ]
      });

      if (!forum) {
        return res.status(404).json({ 
          message: 'Forum non trouvé' 
        });
      }

      res.json(forum);
    } catch (erreur) {
      res.status(500).json({
        message: 'Erreur lors de la récupération du forum',
        erreur: erreur.message
      });
    }
  }

  // Ajouter une réponse à un forum
  async ajouterReponse(req, res) {
    try {
      const { forumId } = req.params;
      const { contenu } = req.body;
      const auteurId = req.personnel.id;

      if (!contenu || contenu.trim().length < 1) {
        return res.status(400).json({
          message: 'Le contenu de la réponse est requis'
        });
      }

      const forum = await Forum.findByPk(forumId);
      if (!forum) {
        return res.status(404).json({ 
          message: 'Forum non trouvé' 
        });
      }

      const reponse = await ForumReponse.create({
        forumId,
        auteurId,
        contenu: contenu.trim()
      });

      // Charger les informations de l'auteur
      const reponseAvecAuteur = await ForumReponse.findByPk(reponse.id, {
        include: [{
          model: Personnel,
          as: 'auteur',
          attributes: ['id', 'nom', 'prenom', 'photoProfil']
        }]
      });

      // Notification en temps réel
      const io = getIO();
      if (io) {
        io.to(forum.auteurId.toString()).emit('nouvelleReponse', {
          forum: forumId,
          reponse: reponseAvecAuteur
        });
      }

      res.status(201).json({
        message: 'Réponse ajoutée avec succès',
        reponse: reponseAvecAuteur
      });
    } catch (erreur) {
      res.status(500).json({
        message: 'Erreur lors de l\'ajout de la réponse',
        erreur: erreur.message
      });
    }
  }

  // Réagir à un forum ou une réponse
  async reagir(req, res) {
    try {
      const { type } = req.body;
      const utilisateurId = req.personnel.id;
      const { forumId, reponseId } = req.params;

      // Vérifier si la réaction existe déjà
      const reactionExistante = await ForumReaction.findOne({
        where: {
          utilisateurId,
          [Op.or]: [
            { forumId: forumId || null },
            { reponseId: reponseId || null }
          ]
        }
      });

      if (reactionExistante) {
        return res.status(400).json({
          message: 'Vous avez déjà réagi à ce contenu'
        });
      }

      const reaction = await ForumReaction.create({
        type,
        utilisateurId,
        forumId: forumId || null,
        reponseId: reponseId || null
      });

      // Mettre à jour le compteur de réactions
      if (forumId) {
        await Forum.increment('nombreReactions', {
          where: { id: forumId }
        });
      } else if (reponseId) {
        await ForumReponse.increment('nombreReactions', {
          where: { id: reponseId }
        });
      }

      res.status(201).json({
        message: 'Réaction ajoutée avec succès',
        reaction
      });
    } catch (erreur) {
      res.status(500).json({
        message: 'Erreur lors de l\'ajout de la réaction',
        erreur: erreur.message
      });
    }
  }

  // Supprimer une réaction
  async supprimerReaction(req, res) {
    try {
      const utilisateurId = req.personnel.id;
      const { forumId, reponseId } = req.params;

      const reaction = await ForumReaction.findOne({
        where: {
          utilisateurId,
          [Op.or]: [
            { forumId: forumId || null },
            { reponseId: reponseId || null }
          ]
        }
      });

      if (!reaction) {
        return res.status(404).json({ 
          message: 'Réaction non trouvée' 
        });
      }

      await reaction.destroy();

      // Décrémenter le compteur de réactions
      if (forumId) {
        await Forum.decrement('nombreReactions', {
          where: { id: forumId }
        });
      } else if (reponseId) {
        await ForumReponse.decrement('nombreReactions', {
          where: { id: reponseId }
        });
      }

      res.json({ 
        message: 'Réaction supprimée avec succès' 
      });
    } catch (erreur) {
      res.status(500).json({
        message: 'Erreur lors de la suppression de la réaction',
        erreur: erreur.message
      });
    }
  }
}

module.exports = new ForumController();