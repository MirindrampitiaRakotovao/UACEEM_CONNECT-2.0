const { Feedback, Personnel, Cours, Enseignement, Sequelize } = require('../models');
const { Op } = require('sequelize'); 

class FeedbackController {
  // Créer un feedback
  async createFeedback(req, res) {
    try {
        // Vérification de l'authentification et du rôle
        if (!req.personnel || !req.personnel.id || req.personnel.role !== 'etudiant') {
            return res.status(403).json({
                success: false,
                message: "Seuls les étudiants peuvent donner des feedbacks"
            });
        }

        const { coursId, notation, commentaire } = req.body;

        // Validation des données
        if (!coursId || !notation) {
            return res.status(400).json({
                success: false,
                message: "Le coursId et la notation sont requis"
            });
        }

        // Validation de la notation
        if (notation < 1 || notation > 5) {
            return res.status(400).json({
                success: false,
                message: "La notation doit être comprise entre 1 et 5"
            });
        }

        // Vérifier si le cours existe
        const cours = await Cours.findByPk(coursId);
        if (!cours) {
            return res.status(404).json({
                success: false,
                message: "Cours non trouvé"
            });
        }

        // Vérifier si l'étudiant a déjà donné un feedback
        const existingFeedback = await Feedback.findOne({
            where: {
                personnel_id: req.personnel.id,
                cours_id: coursId
            }
        });

        if (existingFeedback) {
            return res.status(400).json({
                success: false,
                message: "Vous avez déjà donné un feedback pour ce cours"
            });
        }

        // Créer le feedback
        const feedback = await Feedback.create({
            personnel_id: req.personnel.id,
            cours_id: coursId,
            notation,
            commentaire,
            date_publication: new Date()
        });

        // Récupérer le feedback avec les relations
        const feedbackWithRelations = await Feedback.findByPk(feedback.id, {
            include: [
                {
                    model: Personnel,
                    as: 'personnel',
                    attributes: ['id', 'nom', 'prenom', 'role']
                },
                {
                    model: Cours,
                    as: 'cours',
                    attributes: ['id', 'titre']
                }
            ]
        });

        return res.status(201).json({
            success: true,
            message: "Feedback créé avec succès",
            data: feedbackWithRelations
        });

    } catch (error) {
        console.error('Erreur création feedback:', error);
        return res.status(500).json({
            success: false,
            message: "Erreur lors de la création du feedback",
            error: error.message
        });
    }
  }

  async listCoursForFeedback(req, res) {
    try {
      console.log('Début de listCoursForFeedback');
      
      // Vérifiez si l'utilisateur est authentifié
      if (!req.personnel) {
        console.log('Utilisateur non authentifié');
        return res.status(401).json({ success: false, message: "Utilisateur non authentifié" });
      }
      
      // Vérifiez le rôle de l'utilisateur
      if (req.personnel.role !== 'etudiant') {
        console.log('Accès refusé : utilisateur non étudiant');
        return res.status(403).json({ success: false, message: "Seuls les étudiants peuvent accéder à cette liste" });
      }
      
      // Récupérer les cours avec les associations correctes
      const cours = await Cours.findAll({
        include: [{
          model: Enseignement, // Incluez le modèle Enseignement
          as: 'enseignement', // Alias défini dans l'association
          include: [{
            model: Personnel, // Incluez le modèle Personnel
            as: 'personnel', // Alias défini dans l'association
            attributes: ['id', 'nom', 'prenom'] // Attributs du Personnel
          }],
          attributes: [] // Pas besoin de retourner d'attributs de Enseignement ici
        }],
        attributes: ['id', 'titre'] // Attributs de Cours
      });
      
      console.log('Cours récupérés:', cours);
      
      // Mapper les données pour le retour
      const coursData = cours.map(c => ({
        coursId: c.id,
        titre: c.titre,
        professeur: c.enseignement && c.enseignement.personnel ? {
          id: c.enseignement.personnel.id,
          nom: c.enseignement.personnel.nom,
          prenom: c.enseignement.personnel.prenom
        } : null // Si professeur est null, renvoyez null
      }));
      
      return res.status(200).json({ success: true, data: coursData });
      
    } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
      return res.status(500).json({ success: false, message: "Erreur lors de la récupération des cours", error: error.message });
    }
  }

  // Obtenir les feedbacks d'un cours
  async getFeedbacksByCours(req, res) {
    try {
      const { coursId } = req.params;
      const { page = 1, limit = 10 } = req.query;

      // Vérifier si le cours existe
      const cours = await Cours.findByPk(coursId);
      if (!cours) {
        return res.status(404).json({
          success: false,
          message: "Cours non trouvé"
        });
      }

      // Récupérer les feedbacks avec pagination
      const feedbacks = await Feedback.findAndCountAll({
        where: { cours_id: coursId },
        include: [
          {
            model: Personnel,
            as: 'personnel',
            attributes: ['id', 'nom', 'prenom', 'role'],
            where: { role: 'etudiant' }
          }
        ],
        order: [['date_publication', 'DESC']],
        limit: parseInt(limit),
        offset: (page - 1) * parseInt(limit)
      });

      // Calculer la moyenne des notations
      const moyenne = await Feedback.findOne({
        where: { cours_id: coursId },
        attributes: [
          [sequelize.fn('AVG', sequelize.col('notation')), 'moyenne']
        ]
      });

      res.json({
        success: true,
        data: feedbacks.rows,
        moyenne: parseFloat(moyenne?.get('moyenne') || 0).toFixed(1),
        pagination: {
          totalItems: feedbacks.count,
          totalPages: Math.ceil(feedbacks.count / parseInt(limit)),
          currentPage: parseInt(page)
        }
      });

    } catch (error) {
      console.error('Erreur récupération feedbacks:', error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des feedbacks",
        error: error.message
      });
    }
  }

  // Obtenir un feedback spécifique
  async getFeedbackById(req, res) {
    try {
      const { id } = req.params;

      const feedback = await Feedback.findOne({
        where: { id },
        include: [
          {
            model: Personnel,
            as: 'personnel',
            attributes: ['id', 'nom', 'prenom', 'role']
          },
          {
            model: Cours,
            as: 'cours',
            attributes: ['id', 'titre']
          }
        ]
      });

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: "Feedback non trouvé"
        });
      }

      res.json({
        success: true,
        data: feedback
      });

    } catch (error) {
      console.error('Erreur récupération feedback:', error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération du feedback",
        error: error.message
      });
    }
  }

  // Modifier un feedback
  async updateFeedback(req, res) {
    try {
      // Vérification de l'authentification et du rôle
      if (!req.personnel || !req.personnel.id || req.personnel.role !== 'etudiant') {
        return res.status(403).json({
          success: false,
          message: "Seuls les étudiants peuvent modifier leurs feedbacks"
        });
      }

      const { id } = req.params;
      const { notation, commentaire } = req.body;

      // Validation de la notation
      if (notation && (notation < 1 || notation > 5)) {
        return res.status(400).json({
          success: false,
          message: "La notation doit être comprise entre 1 et 5"
        });
      }

      const feedback = await Feedback.findOne({
        where: {
          id,
          personnel_id: req.personnel.id
        }
      });

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: "Feedback non trouvé ou vous n'êtes pas autorisé à le modifier"
        });
      }

      await feedback.update({
        notation: notation || feedback.notation,
        commentaire: commentaire || feedback.commentaire
      });

      const updatedFeedback = await Feedback.findByPk(feedback.id, {
        include: [
          {
            model: Personnel,
            as: 'personnel',
            attributes: ['id', 'nom', 'prenom', 'role']
          },
          {
            model: Cours,
            as: 'cours',
            attributes: ['id', 'titre']
          }
        ]
      });

      res.json({
        success: true,
        message: "Feedback mis à jour avec succès",
        data: updatedFeedback
      });

    } catch (error) {
      console.error('Erreur modification feedback:', error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la modification du feedback",
        error: error.message
      });
    }
  }

  // Supprimer un feedback
  async deleteFeedback(req, res) {
    try {
      // Vérification de l'authentification et du rôle
      if (!req.personnel || !req.personnel.id || req.personnel.role !== 'etudiant') {
        return res.status(403).json({
          success: false,
          message: "Seuls les étudiants peuvent supprimer leurs feedbacks"
        });
      }

      const { id } = req.params;

      const feedback = await Feedback.findOne({
        where: {
          id,
          personnel_id: req.personnel.id
        }
      });

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: "Feedback non trouvé ou vous n'êtes pas autorisé à le supprimer"
        });
      }

      await feedback.destroy();

      res.json({
        success: true,
        message: "Feedback supprimé avec succès"
      });

    } catch (error) {
      console.error('Erreur suppression feedback:', error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression du feedback",
        error: error.message
      });
    }
  }

  // Obtenir les statistiques des feedbacks
  async getFeedbackStats(req, res) {
    try {
      const { coursId } = req.params;

      // Vérifier si le cours existe
      const cours = await Cours.findByPk(coursId);
      if (!cours) {
        return res.status(404).json({
          success: false,
          message: "Cours non trouvé"
        });
      }

      // Obtenir les statistiques
      const stats = await Feedback.findAll({
        where: { cours_id: coursId },
        attributes: [
          'notation',
          [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        include: [
          {
            model: Personnel,
            as: 'personnel',
            where: { role: 'etudiant' },
            attributes: []
          }
        ],
        group: ['notation'],
        order: [['notation', 'ASC']]
      });

      // Calculer la moyenne
      const moyenne = await Feedback.findOne({
        where: { cours_id: coursId },
        attributes: [
          [sequelize.fn('AVG', sequelize.col('notation')), 'moyenne']
        ],
        include: [
          {
            model: Personnel,
            as: 'personnel',
            where: { role: 'etudiant' },
            attributes: []
          }
        ]
      });

      res.json({
        success: true,
        data: {
          distribution: stats.reduce((acc, stat) => {
            acc[stat.notation] = parseInt(stat.get('count'));
            return acc;
          }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}),
          moyenne: parseFloat(moyenne?.get('moyenne') || 0).toFixed(1),
          totalFeedbacks: stats.reduce((acc, stat) => acc + parseInt(stat.get('count')), 0)
        }
      });

    } catch (error) {
      console.error('Erreur statistiques feedback:', error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des statistiques",
        error: error.message
      });
    }
  }

  async getFeedbacksByPersonnel(req, res) {
    try {
      // Vérification de l'authentification
      if (!req.personnel || !req.personnel.id) {
        return res.status(403).json({
          success: false,
          message: "Authentification requise"
        });
      }
      const { page = 1, limit = 10 } = req.query;
      // Vérifier si le personnel est un professeur
      if (req.personnel.role !== 'professeur') {
        return res.status(403).json({
          success: false,
          message: "Seuls les professeurs peuvent accéder à cette ressource"
        });
      }
      // Debug logs
      console.log('Personnel ID:', req.personnel.id);
      console.log('Personnel Role:', req.personnel.role);
      // Récupérer les enseignements du professeur connecté
      const enseignements = await Enseignement.findAll({
        where: { 
          personnelId: req.personnel.id 
        },
        include: [
          {
            model: Cours,
            as: 'cours',
            attributes: ['id']
          }
        ]
      });
      // Debug logs
      console.log('Enseignements trouvés:', enseignements.length);
      // Extraire les IDs des cours
      const coursIds = enseignements.flatMap(enseignement => 
        enseignement.cours ? enseignement.cours.map(cours => cours.id) : []
      );
      // Debug logs
      console.log('IDs des cours:', coursIds);
      // Si le professeur n'a pas de cours, renvoyer un message approprié
      if (coursIds.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Aucun cours trouvé pour ce professeur"
        });
      }
      // Récupérer les feedbacks pour les cours de ce professeur avec pagination
      const feedbacks = await Feedback.findAndCountAll({
        where: {
          cours_id: {
            [Op.in]: coursIds // Utilisez Op.in au lieu de sequelize.Op.in
          }
        },
        include: [
          {
            model: Personnel,
            as: 'personnel',
            attributes: ['id', 'nom', 'prenom', 'role']
          },
          {
            model: Cours,
            as: 'cours',
            attributes: ['id', 'titre']
          }
        ],
        order: [['date_publication', 'DESC']],
        limit: parseInt(limit),
        offset: (page - 1) * parseInt(limit)
      });
      // Calculer la moyenne des notations pour ces feedbacks
      const moyenne = await Feedback.findOne({
        where: {
          cours_id: {
            [Op.in]: coursIds // Utilisez Op.in au lieu de sequelize.Op.in
          }
        },
        attributes: [
          [Sequelize.fn('AVG', Sequelize.col('notation')), 'moyenne']
        ]
      });
      res.json({
        success: true,
        data: feedbacks.rows,
        moyenne: parseFloat(moyenne?.get('moyenne') || 0).toFixed(1),
        pagination: {
          totalItems: feedbacks.count,
          totalPages: Math.ceil(feedbacks.count / parseInt(limit)),
          currentPage: parseInt(page)
        }
      });
    } catch (error) {
      console.error('Erreur détaillée récupération feedbacks par professeur:', error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des feedbacks",
        error: error.message
      });
    }
  }

  async listAllFeedbacks(req, res) {
    try {
      // Vérifier si l'utilisateur est authentifié et a le rôle d'admin
      if (!req.personnel || req.personnel.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: "Seuls les administrateurs peuvent accéder à cette ressource"
        });
      }
      // Récupérer tous les feedbacks avec les relations nécessaires
      const feedbacks = await Feedback.findAll({
        include: [
          {
            model: Personnel,
            as: 'personnel',
            attributes: ['id', 'nom', 'prenom']
          },
          {
            model: Cours,
            as: 'cours',
            attributes: ['id', 'titre']
          }
        ],
        order: [['date_publication', 'DESC']]
      });
      return res.status(200).json({
        success: true,
        data: feedbacks
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des feedbacks:', error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des feedbacks",
        error: error.message
      });
    }
  }
  // Lister les feedbacks d'un étudiant (accessible uniquement par l'étudiant)
  async listFeedbacksByStudent(req, res) {
    try {
      
      if (!req.personnel || !req.personnel.id) {
        return res.status(403).json({
          success: false,
          message: "Authentification requise"
        });
      }
      const feedbacks = await Feedback.findAll({
        where: {
          personnel_id: req.personnel.id 
        },
        include: [
          {
            model: Cours,
            as: 'cours',
            attributes: ['id', 'titre']
          }
        ],
        order: [['date_publication', 'DESC']
        ]
      });
      return res.status(200).json({
        success: true,
        data: feedbacks
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des feedbacks de l\'étudiant:', error);
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des feedbacks",
        error: error.message
      });
    }
  }
}

module.exports = new FeedbackController();