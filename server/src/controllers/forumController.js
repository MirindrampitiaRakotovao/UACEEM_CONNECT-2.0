  const {
    Forum,
    ForumReponse,
    ForumReaction,
    Personnel,
    sequelize
  } = require('../models');
  const { getIO } = require('../../socket');
  const { Op } = require('sequelize');
  const fs = require('fs').promises;
  const path = require('path');
  const { body, validationResult } = require('express-validator');
  class ForumController {
    // Validations pour la création de forum
    validationCreerForum() {
      return [
        body('titre')
          .trim()
          .isLength({ min: 3, max: 255 }).withMessage('Le titre doit contenir entre 3 et 255 caractères')
          .matches(/^[a-zA-Z0-9\s\-_.,!?]+$/).withMessage('Le titre contient des caractères non autorisés'),

        body('contenu')
          .trim()
          .isLength({ min: 10, max: 10000 }).withMessage('Le contenu doit contenir entre 10 et 10000 caractères')
          .matches(/^[a-zA-Z0-9\s\-_.,!?]+$/).withMessage('Le contenu contient des caractères non autorisés'),

        body('categorie')
          .optional()
          .isIn(['Général', 'Technique', 'Académique', 'Social']).withMessage('Catégorie invalide'),

        body('motsCles')
          .optional()
          .custom((value) => {
            if (Array.isArray(value) && value.length <= 10) {
              return true;
            }
            throw new Error('Les mots-clés doivent être un tableau de 10 éléments maximum');
          })
      ];
    }
    // Middleware de gestion des erreurs de validation
    handleValidationErrors(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Supprimer les fichiers téléchargés en cas d'erreur de validation
        if (req.files) {
          Object.keys(req.files).forEach(key => {
            req.files[key].forEach(file => {
              try {
                fs.unlink(file.path);
              } catch (error) {
                console.error(`Erreur de suppression du fichier : ${file.path}`);
              }
            });
          });
        }
        return res.status(400).json({
          message: 'Erreurs de validation',
          errors: errors.array()
        });
      }
      next();
    }
    // Créer un nouveau forum
    async creerForum(req, res) {
      const transaction = await sequelize.transaction();
      try {
        const { titre, contenu, categorie, motsCles } = req.body;
        const auteurId = req.personnel.id;
        // Gestion des fichiers
        let pieceJointes = [];
        let audio = null;
        if (req.files) {
          // Validation des fichiers
          if (req.files.fichiers && req.files.fichiers.length > 5) {
            return res.status(400).json({
              message: 'Maximum 5 pièces jointes autorisées'
            });
          }
          // Pièces jointes
          if (req.files.fichiers) {
            pieceJointes = req.files.fichiers.map(file => ({
              nom: file.filename,
              chemin: file.path,
              type: file.mimetype,
              taille: file.size
            }));
          }
          // Audio
          if (req.files.audio && req.files.audio[0]) {
            const audioFile = req.files.audio[0];
            if (audioFile.size > 10 * 1024 * 1024) { // 10 Mo max
              return res.status(400).json({
                message: 'Fichier audio trop volumineux (max 10 Mo)'
              });
            }
            audio = {
              nom: audioFile.filename,
              chemin: audioFile.path,
              type: audioFile.mimetype,
              taille: audioFile.size
            };
          }
        }
        // Traitement des mots-clés
        const motsClesTraites = Array.isArray(motsCles)
          ? motsCles
          : (typeof motsCles === 'string'
            ? JSON.parse(motsCles)
            : []);
        // Création du forum
        const forum = await Forum.create({
          titre: titre.trim(),
          contenu: contenu.trim(),
          categorie: categorie || 'Général',
          motsCles: motsClesTraites,
          pieceJointes: JSON.stringify(pieceJointes),
          audio: audio ? JSON.stringify(audio) : null,
          auteurId
        }, { transaction });
        // Charger les informations de l'auteur
        const forumAvecAuteur = await Forum.findByPk(forum.id, {
          include: [{
            model: Personnel,
            as: 'auteur',
            attributes: ['id', 'nom', 'prenom', 'photoProfil']
          }],
          transaction
        });
        // Émettre un événement socket.io
        const io = getIO();
        if (io) {
          io.emit('nouveauForum', forumAvecAuteur);
        }
        await transaction.commit();
        res.status(201).json({
          message: 'Forum créé avec succès',
          forum: forumAvecAuteur
        });
      } catch (erreur) {
        await transaction.rollback();
        console.error('Erreur lors de la création du forum:', erreur);
        res.status(500).json({
          message: 'Erreur lors de la création du forum',
          erreur: erreur.message
        });
      }
    }
    // Récupérer les forums avec filtres et pagination
    async recupererForums(req, res) {
      try {
        const page = parseInt(req.query.page) || 1;
        const limite = parseInt(req.query.limite) || 10;
        const offset = (page - 1) * limite;
        const search = req.query.search || '';
        const categorie = req.query.categorie;
        // Construction des conditions de recherche
        const whereCondition = {
          ...(search ? {
            [Op.or]: [
              { titre: { [Op.iLike]: `%${search}%` } },
              { contenu: { [Op.iLike]: `%${search}%` } }
            ]
          } : {}),
          ...(categorie ? { categorie } : {})
        };
        const { count, rows: forums } = await Forum.findAndCountAll({
          where: whereCondition,
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
          forums,
          pagination: {
            total: count,
            pages: Math.ceil(count / limite),
            pageActuelle: page,
            limitParPage: limite
          }
        });
      } // Suite du code précédent
    catch (erreur) {
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
          },
          {
            model: ForumReaction,
            as: 'reactions',
            include: [{
              model: Personnel,
              as: 'utilisateur',
              attributes: ['id', 'nom', 'prenom']
            }]
          }
        ]
      });
      if (!forum) {
        return res.status(404).json({ message: 'Forum non trouvé' });
      }
      // Calculer les statistiques de réactions
      const reactions = {
        likes: forum.reactions.filter(r => r.type === 'like').length,
        dislikes: forum.reactions.filter(r => r.type === 'dislike').length
      };
      const forumAvecStats = {
        ...forum.toJSON(),
        reactions
      };
      res.json(forumAvecStats);
    } catch (erreur) {
      res.status(500).json({
        message: 'Erreur lors de la récupération du forum',
        erreur: erreur.message
      });
    }
  }
  // Validation pour l'ajout de réponse
  validationAjouterReponse() {
    return [
      body('contenu')
        .trim()
        .isLength({ min: 1, max: 1000 }).withMessage('La réponse doit contenir entre 1 et 1000 caractères')
        .matches(/^[a-zA-Z0-9\s\-_.,!?]+$/).withMessage('Contenu de réponse invalide')
    ];
  }
  // Ajouter une réponse à un forum
  async ajouterReponse(req, res) {
    const transaction = await sequelize.transaction();
    try {
      // Vérifier les erreurs de validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Erreurs de validation',
          errors: errors.array()
        });
      }
      const { forumId } = req.params;
      const { contenu } = req.body;
      const auteurId = req.personnel.id;
      // Vérifier l'existence du forum
      const forum = await Forum.findByPk(forumId, { transaction });
      if (!forum) {
        return res.status(404).json({ message: 'Forum non trouvé' });
      }
      // Créer la réponse
      const reponse = await ForumReponse.create({
        forumId,
        auteurId,
        contenu: contenu.trim()
      }, { transaction });
      // Charger les informations complètes de la réponse
      const reponseComplete = await ForumReponse.findByPk(reponse.id, {
        include: [{
          model: Personnel,
          as: 'auteur',
          attributes: ['id', 'nom', 'prenom', 'photoProfil']
        }],
        transaction
      });
      // Notification en temps réel
      const io = getIO();
      if (io) {
        io.to(forum.auteurId.toString()).emit('nouvelleReponse', {
          forum: forumId,
          reponse: reponseComplete
        });
      }
      await transaction.commit();
      res.status(201).json({
        message: 'Réponse ajoutée avec succès',
        reponse: reponseComplete
      });
    } catch (erreur) {
      await transaction.rollback();
      console.error('Erreur lors de l\'ajout de la réponse:', erreur);
      res.status(500).json({
        message: 'Erreur lors de l\'ajout de la réponse',
        erreur: erreur.message
      });
    }
  }
  // Validation pour la réaction
  validationReagir() {
    return [
      body('type')
        .isIn(['like', 'dislike']).withMessage('Type de réaction invalide')
    ];
  }
  // Réagir à un forum ou une réponse
  async reagir(req, res) {
    const transaction = await sequelize.transaction();
    try {
        // Vérifiez les erreurs de validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            await transaction.rollback();
            return res.status(400).json({
                message: 'Erreurs de validation',
                errors: errors.array()
            });
        }
        const { type } = req.body; 
        const utilisateurId = req.personnel?.id;
        // Vérification de l'authentification
        if (!utilisateurId) {
            await transaction.rollback();
            return res.status(401).json({ 
                message: 'Authentification requise' 
            });
        }
        const { forumId, reponseId } = req.params;
        // Validation des paramètres
        if (!forumId && !reponseId) {
            await transaction.rollback();
            return res.status(400).json({ 
                message: 'Forum ou réponse requis' 
            });
        }
        // Validation stricte du type de réaction
        const typesValides = ['reaction', 'partage'];
        if (!typesValides.includes(type)) {
            await transaction.rollback();
            return res.status(400).json({ 
                message: 'Type de réaction invalide' 
            });
        }
        // Recherche de la réaction existante
        const reactionExistante = await ForumReaction.findOne({
            where: {
                utilisateurId,
                forumId: forumId || null,
                reponseId: reponseId || null
            },
            transaction
        });
        let reaction;
        if (reactionExistante) {
            // Mettre à jour la réaction existante
            reaction = await reactionExistante.update(
                { type },
                { transaction }
            );
        } else {
            // Créer une nouvelle réaction
            reaction = await ForumReaction.create({
                type,
                utilisateurId,
                forumId: forumId || null,
                reponseId: reponseId || null
            }, { transaction });
        }
        // Mise à jour du compteur de réactions
        if (forumId) {
            await Forum.increment('nombreReactions', {
                where: { id: forumId },
                transaction
            });
        } else if (reponseId) {
            await ForumReponse.increment('nombreReactions', {
                where: { id: reponseId },
                transaction
            });
        }
        // Notification en temps réel
        try {
            const io = getIO();
            if (io) {
                io.emit('nouvelleReaction', {
                    forumId,
                    reponseId,
                    reaction
                });
            }
        } catch (socketError) {
            console.error('Erreur de notification socket:', socketError);
            // Ne pas arrêter le processus si la notification échoue
        }
        await transaction.commit();
        res.status(201).json({
            message: 'Réaction ajoutée avec succès',
            reaction
        });
    } catch (erreur) {
        await transaction.rollback();
        console.error('Erreur lors de l\'ajout de la réaction:', erreur);
        
        res.status(500).json({
            message: 'Erreur lors de l\'ajout de la réaction',
            erreur: erreur instanceof Error ? erreur.message : 'Erreur inconnue'
        });
    }
}
  // Supprimer une réaction
  async supprimerReaction(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const utilisateurId = req.personnel.id;
      const { forumId, reponseId } = req.params;
      const reaction = await ForumReaction.findOne({
        where: {
          utilisateurId,
          forumId: forumId || null,
        reponseId: reponseId || null
      }
    });
    // Vérifier si la réaction existe
    if (!reaction) {
      return res.status(404).json({ message: 'Réaction non trouvée' });
    }
    // Supprimer la réaction
    await reaction.destroy({ transaction });
    // Mise à jour du compteur de réactions
    if (forumId) {
      await Forum.decrement('nombreReactions', {
        where: { id: forumId },
        transaction
      });
    } else if (reponseId) {
      await ForumReponse.decrement('nombreReactions', {
        where: { id: reponseId },
        transaction
      });
    }
    // Notification en temps réel
    const io = getIO();
    if (io) {
      io.emit('reactionSupprimee', {
        forumId,
        reponseId,
        utilisateurId
      });
    }
    await transaction.commit();
    res.status(200).json({
      message: 'Réaction supprimée avec succès'
    });
  } catch (erreur) {
    await transaction.rollback();
    console.error('Erreur lors de la suppression de la réaction:', erreur);
    res.status(500).json({
      message: 'Erreur lors de la suppression de la réaction',
      erreur: erreur.message
    });
  }
  }

  // Supprimer un forum
  async supprimerForum(req, res) {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const utilisateurId = req.personnel.id;
        // Trouver le forum
        const forum = await Forum.findByPk(id, { transaction });
        
        // Vérifier si le forum existe
        if (!forum) {
            return res.status(404).json({ message: 'Forum non trouvé' });
        }
        // Vérifier les permissions de suppression
        if (forum.auteurId !== utilisateurId) {
            return res.status(403).json({
                message: 'Vous n\'êtes pas autorisé à supprimer ce forum'
            });
        }
        // Supprimer le forum
        await forum.destroy({ transaction });
        // Valider la transaction
        await transaction.commit();
        res.status(200).json({
            message: 'Forum supprimé avec succès'
        });
    } catch (erreur) {
        await transaction.rollback();
        console.error('Erreur lors de la suppression du forum:', erreur);
        res.status(500).json({
            message: 'Erreur lors de la suppression du forum',
            erreur: erreur.message
        });
    }
}
  }
  module.exports = new ForumController();