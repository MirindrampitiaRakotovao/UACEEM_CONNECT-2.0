// EmploiDuTempsController.js
const { EmploiDuTemps, Personnel, Enseignement } = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'votre_clé_secrète_pour_jwt';

class EmploiDuTempsController {
  // Middleware de vérification du token
  verifyToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: 'Token non fourni' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Token invalide' });
    }
  }

  // Middleware de vérification admin
  checkAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès réservé à l\'administrateur' });
    }
    next();
  }

 // EmploiDuTempsController.js
async getDonneesFormulaire(req, res) {
  try {
    console.log('Début de getDonneesFormulaire');
    
    // Vérification du token et du rôle
    if (!req.headers.authorization) {
      console.log('Pas de token fourni');
      return res.status(401).json({ message: 'Token non fourni' });
    }
    
    const token = req.headers.authorization.split(' ')[1];
    console.log('Token extrait:', token);
    
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
      console.log('Token décodé:', decoded);
    } catch (tokenError) {
      console.log('Erreur de décodage du token:', tokenError);
      return res.status(403).json({ message: 'Token invalide', error: tokenError.message });
    }

    if (decoded.role !== 'admin') {
      console.log('Utilisateur non admin:', decoded.role);
      return res.status(403).json({ message: 'Accès réservé à l\'administrateur' });
    }

    // Récupération des enseignements avec les professeurs
    console.log('Début de la requête Enseignement.findAll');
    const enseignements = await Enseignement.findAll({
      attributes: [
        'id',
        'nomMatiere',
        'niveau',
        'mention',
        'anneeUniversitaire',
        'semestre',
        'typeUE',
        'coursmagistraux',
        'travauxDiriges',
        'volumeHoraireTotal',
        'credits',
        'coefficient'
      ],
      include: [{
        model: Personnel,
        as: 'personnel',
        attributes: ['id', 'nom', 'prenom', 'email'],
        required: false
      }],
      raw: false,
      nest: true
    });

    console.log('Enseignements récupérés:', enseignements.length);

    // Structurer les données
    const enseignementsStructures = {};
    enseignements.forEach(ens => {
      if (!enseignementsStructures[ens.mention]) {
        enseignementsStructures[ens.mention] = {};
      }
      if (!enseignementsStructures[ens.mention][ens.niveau]) {
        enseignementsStructures[ens.mention][ens.niveau] = [];
      }

      enseignementsStructures[ens.mention][ens.niveau].push({
        id: ens.id,
        nomMatiere: ens.nomMatiere,
        semestre: ens.semestre,
        anneeUniversitaire: ens.anneeUniversitaire,
        professeur: ens.personnel ? {
          id: ens.personnel.id,
          nom: ens.personnel.nom,
          prenom: ens.personnel.prenom,
          email: ens.personnel.email
        } : null,
        typeUE: ens.typeUE,
        coursmagistraux: ens.coursmagistraux,
        travauxDiriges: ens.travauxDiriges,
        volumeHoraireTotal: ens.volumeHoraireTotal,
        credits: ens.credits,
        coefficient: ens.coefficient
      });
    });

    // Préparation des données de formulaire
    const donneesFormulaire = {
      enseignements: enseignementsStructures,
      couleurs: [
        'bg-[#FFAA00]',
        'bg-blue-500',
        'bg-green-500',
        'bg-purple-500',
        'bg-red-500',
        'bg-indigo-500',
        'bg-pink-500'
      ],
      jours: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
      heures: Array.from({ length: 11 }, (_, i) => i + 8)
    };

    console.log('Données à envoyer:', {
      nombreEnseignements: enseignements.length,
      mentions: Object.keys(enseignementsStructures),
      structure: Object.keys(donneesFormulaire)
    });

    return res.status(200).json({
      message: 'Données récupérées avec succès',
      data: donneesFormulaire
    });

  } catch (error) {
    console.error('Erreur détaillée:', error);
    return res.status(500).json({
      message: 'Erreur serveur',
      error: error.toString(),
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
    // Lister tous les emplois du temps (accessible à l'admin et aux professeurs)
    async lister(req, res) {
      try {
        if (!['admin', 'professeur'].includes(req.user.role)) {
          return res.status(403).json({ message: 'Accès non autorisé' });
        }
    
        let where = {};
        let order = [
          ['mention', 'ASC'],
          ['niveau', 'ASC'],
          ['jour', 'ASC'],
          ['heureDebut', 'ASC']
        ];
        
        // Si c'est un professeur, ne montrer que ses cours
        if (req.user.role === 'professeur') {
          where.personnelId = req.user.id;
        }
    
        const emploisDuTemps = await EmploiDuTemps.findAll({
          where,
          include: [{
            model: Personnel,
            as: 'professeur',
            attributes: ['nom', 'prenom']
          }],
          order
        });
    
        // Regrouper par mention et niveau
        const emploisGroupes = emploisDuTemps.reduce((acc, emploi) => {
          if (!acc[emploi.mention]) {
            acc[emploi.mention] = {};
          }
          if (!acc[emploi.mention][emploi.niveau]) {
            acc[emploi.mention][emploi.niveau] = [];
          }
          acc[emploi.mention][emploi.niveau].push(emploi);
          return acc;
        }, {});
    
        return res.status(200).json({
          message: 'Liste des emplois du temps récupérée avec succès',
          data: emploisGroupes
        });
      } catch (error) {
        console.error('Erreur:', error);
        return res.status(500).json({
          message: 'Erreur serveur',
          error: error.message
        });
      }
    }
    
      // Créer un emploi du temps (admin uniquement)
      async creer(req, res) {
        try {
          if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès réservé à l\'administrateur' });
          }
          const {
            nomMatiere,
            jour,
            heureDebut,
            heureFin,
            salle,
            couleur,
            mention,
            niveau,
            parcours,
            semestre
          } = req.body;
          // Rechercher l'enseignement avec le professeur associé
          const enseignement = await Enseignement.findOne({
            where: { 
              nomMatiere,
              mention,
              niveau,
              semestre
            }
          });
          if (!enseignement) {
            return res.status(400).json({
              message: 'Enseignement non trouvé'
            });
          }
          // Vérifier si un professeur est associé
          if (!enseignement.personnelId) {
            return res.status(400).json({
              message: 'Aucun professeur associé à cet enseignement'
            });
          }
          // Récupérer l'ID du professeur
          const personnelId = enseignement.personnelId;

          const conflit = await EmploiDuTemps.findOne({
            where: {
              [Op.or]: [
                {
                  personnelId,
                  jour,
                  [Op.or]: [
                    {
                      heureDebut: {
                        [Op.between]: [heureDebut, heureFin]
                      }
                    },
                    {
                      heureFin: {
                        [Op.between]: [heureDebut, heureFin]
                      }
                    }
                  ]
                },
                {
                  salle,
                  jour,
                  [Op.or]: [
                    {
                      heureDebut: {
                        [Op.between]: [heureDebut, heureFin]
                      }
                    },
                    {
                      heureFin: {
                        [Op.between]: [heureDebut, heureFin]
                      }
                    }
                  ]
                }
              ]
            }
          });
          if (conflit) {
            return res.status(400).json({
              message: 'Conflit d\'horaire détecté'
            });
          }
          // Créer l'emploi du temps
          const nouvelEmploi = await EmploiDuTemps.create({
            nomMatiere,
            personnelId, 
            jour,
            heureDebut,
            heureFin,
            salle,
            couleur,
            mention,
            niveau,
            parcours,
            semestre
          });
          // Récupérer l'emploi du temps complet avec les détails du professeur
          const emploiComplet = await EmploiDuTemps.findOne({
            where: { id: nouvelEmploi.id },
            include: [{
              model: Personnel,
              as: 'professeur',
              attributes: ['id', 'nom', 'prenom', 'titre']
            }]
          });
          return res.status(201).json({
            message: 'Emploi du temps créé avec succès',
            data: emploiComplet
          });
        } catch (error) {
          console.error('Erreur:', error);
          return res.status(500).json({
            message: 'Erreur serveur',
            error: error.message
          });
        }
      }
      
      // Modifier un emploi du temps (admin uniquement)

async modifier(req, res) {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès réservé à l\'administrateur' });
    }

    const { id } = req.params;
    const {
      nomMatiere,
      mention, // Nouveau champ mention
      jour,
      heureDebut,
      heureFin,
      salle,
      couleur
    } = req.body;

    // Récupérer l'emploi du temps existant
    const emploiDuTemps = await EmploiDuTemps.findByPk(id);
    if (!emploiDuTemps) {
      return res.status(404).json({ message: 'Emploi du temps non trouvé' });
    }

    // Vérifier les conflits si les horaires ou salle sont modifiés
    if (heureDebut || heureFin || jour || salle || nomMatiere || mention) {
      const conflit = await EmploiDuTemps.findOne({
        where: {
          id: { [Op.ne]: id },  // Ne pas tenir compte de cet emploi du temps
          [Op.or]: [
            // Conflit sur le même professeur et même jour
            {
              personnelId: emploiDuTemps.personnelId,
              jour: jour || emploiDuTemps.jour,
              [Op.or]: [
                {
                  heureDebut: {
                    [Op.between]: [
                      heureDebut || emploiDuTemps.heureDebut,
                      heureFin || emploiDuTemps.heureFin
                    ]
                  }
                },
                {
                  heureFin: {
                    [Op.between]: [
                      heureDebut || emploiDuTemps.heureDebut,
                      heureFin || emploiDuTemps.heureFin
                    ]
                  }
                }
              ]
            },
            // Conflit sur la salle et le jour
            {
              salle: salle || emploiDuTemps.salle,
              jour: jour || emploiDuTemps.jour,
              [Op.or]: [
                {
                  heureDebut: {
                    [Op.between]: [
                      heureDebut || emploiDuTemps.heureDebut,
                      heureFin || emploiDuTemps.heureFin
                    ]
                  }
                },
                {
                  heureFin: {
                    [Op.between]: [
                      heureDebut || emploiDuTemps.heureDebut,
                      heureFin || emploiDuTemps.heureFin
                    ]
                  }
                }
              ]
            }
          ]
        }
      });

      if (conflit) {
        return res.status(400).json({
          message: 'Conflit d\'horaire détecté'
        });
      }
    }

    // Mise à jour de l'emploi du temps
    await emploiDuTemps.update({
      nomMatiere: nomMatiere || emploiDuTemps.nomMatiere,  // Mettre à jour le nom de la matière
      mention: mention || emploiDuTemps.mention,  // Mettre à jour la mention
      jour: jour || emploiDuTemps.jour,
      heureDebut: heureDebut || emploiDuTemps.heureDebut,
      heureFin: heureFin || emploiDuTemps.heureFin,
      salle: salle || emploiDuTemps.salle,
      couleur: couleur || emploiDuTemps.couleur
    });

    // Récupérer l'emploi du temps mis à jour avec les informations du professeur
    const emploiMisAJour = await EmploiDuTemps.findOne({
      where: { id },
      include: [{
        model: Personnel,
        as: 'professeur',
        attributes: ['nom', 'prenom']
      }]
    });

    return res.status(200).json({
      message: 'Emploi du temps mis à jour avec succès',
      data: emploiMisAJour
    });
  } catch (error) {
    console.error('Erreur:', error);
    return res.status(500).json({
      message: 'Erreur serveur',
      error: error.message
    });
  }
}

        // Supprimer un emploi du temps (admin uniquement)
  async supprimer(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès réservé à l\'administrateur' });
      }

      const { id } = req.params;
      const emploiDuTemps = await EmploiDuTemps.findByPk(id);

      if (!emploiDuTemps) {
        return res.status(404).json({ message: 'Emploi du temps non trouvé' });
      }

      await emploiDuTemps.destroy();

      return res.status(200).json({
        message: 'Emploi du temps supprimé avec succès'
      });
    } catch (error) {
      console.error('Erreur:', error);
      return res.status(500).json({
        message: 'Erreur serveur',
        error: error.message
      });
    }
  }

  // Filtrer les emplois du temps
  async filtrer(req, res) {
    try {
      if (!['admin', 'professeur'].includes(req.user.role)) {
        return res.status(403).json({ message: 'Accès non autorisé' });
      }

      const { mention, niveau } = req.query;
      let where = {};

      if (mention) where.mention = mention;
      if (niveau) where.niveau = niveau;
      where.parcours = 'DROIT'; // Ajout du filtre parcours par défaut

      // Si c'est un professeur, ajouter la restriction sur personnelId
      if (req.user.role === 'professeur') {
        where.personnelId = req.user.id;
      }

      const emploisDuTemps = await EmploiDuTemps.findAll({
        where,
        include: [{
          model: Personnel,
          as: 'professeur',
          attributes: ['nom', 'prenom']
        }],
        order: [
          ['jour', 'ASC'],
          ['heureDebut', 'ASC']
        ]
      });

      return res.status(200).json({
        message: 'Emplois du temps filtrés récupérés avec succès',
        data: emploisDuTemps
      });
    } catch (error) {
      console.error('Erreur:', error);
      return res.status(500).json({
        message: 'Erreur serveur',
        error: error.message
      });
    }
  }

  // Obtenir les statistiques (admin uniquement)
  async getStatistiques(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès réservé à l\'administrateur' });
      }

      const stats = await EmploiDuTemps.findAll({
        attributes: [
          'mention',
          'niveau',
          [sequelize.fn('COUNT', sequelize.col('id')), 'total']
        ],
        where: {
          parcours: 'DROIT' // Filtre sur le parcours par défaut
        },
        group: ['mention', 'niveau']
      });

      return res.status(200).json({
        message: 'Statistiques récupérées avec succès',
        data: stats
      });
    } catch (error) {
      console.error('Erreur:', error);
      return res.status(500).json({
        message: 'Erreur serveur',
        error: error.message
      });
    }
  }
}

// Export de l'instance du contrôleur
module.exports = new EmploiDuTempsController();