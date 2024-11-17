const { Message, Personnel, sequelize } = require('../models');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs').promises;
const mime = require('mime-types');
const { Op } = require('sequelize');
const { getIO } = require('../../socket'); // Assurez-vous du chemin correct
class MessageController {
  constructor() {
    // Pas besoin de passer io au constructeur
    this.setupSocketEvents();
  }
  // Configuration des événements socket
  setupSocketEvents() {
    try {
      const io = getIO(); // Récupérer l'instance de Socket.IO
      io.on('connection', (socket) => {
        console.log('Nouvelle connexion Socket.IO établie');
        // Événement d'enregistrement de l'utilisateur
        socket.on('register', (utilisateurId) => {
          console.log(`Utilisateur ${utilisateurId} enregistré`);
          socket.join(utilisateurId.toString());
          socket.utilisateurId = utilisateurId;
        });
        // Écouter les nouveaux messages via socket
        socket.on('envoyerMessage', async (donneesMessage) => {
          try {
            // Vérifier que l'utilisateur est authentifié
            if (!socket.utilisateurId) {
              throw new Error('Utilisateur non authentifié');
            }
            const expediteurId = socket.utilisateurId;
            const message = await this.creerMessageSocket(expediteurId, donneesMessage);
            // Émettre le message au destinataire
            io.to(donneesMessage.destinataireId.toString()).emit('nouveauMessage', message);
            
            console.log('Message envoyé avec succès');
          } catch (erreur) {
            console.error('Erreur lors de l\'envoi du message socket:', erreur);
            socket.emit('erreurMessage', {
              message: 'Échec de l\'envoi du message',
              erreur: erreur.message
            });
          }
        });
        // Gestion de la lecture des messages
        socket.on('messageLu', async (messageId) => {
          try {
            const utilisateurId = socket.utilisateurId;
            const message = await Message.findByPk(messageId);
            if (message && message.destinataireId === utilisateurId) {
              await Message.update(
                {
                  statut: 'lu',
                  dateLecture: new Date()
                },
                {
                  where: { id: messageId }
                }
              );
              // Notifier l'expéditeur
              io.to(message.expediteurId.toString()).emit('messageConsulte', messageId);
            }
          } catch (erreur) {
            console.error('Erreur lors de la mise à jour du message:', erreur);
          }
        });
        socket.on('disconnect', () => {
          console.log('Utilisateur déconnecté du système de messagerie');
        });
        // Gestion des erreurs de socket
        socket.on('error', (erreur) => {
          console.error('Erreur de socket:', erreur);
        });
      });
    } catch (erreur) {
      console.error('Erreur lors de la configuration des événements Socket.IO:', erreur);
    }
  }
  // Méthode privée pour détecter le type de message
  async _detecterTypeMesage(contenu, fichiers) {
    if (!contenu && (!fichiers || fichiers.length === 0)) {
      throw new Error('Aucun contenu à envoyer');
    }
    if (fichiers && fichiers.length > 0) {
      const typesImages = ['image/jpeg', 'image/png', 'image/gif'];
      const typesDocuments = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      const premierFichier = fichiers[0];
      const mimeType = premierFichier.mimetype;
      if (typesImages.includes(mimeType)) return 'image';
      if (typesDocuments.includes(mimeType)) return 'document';
      if (mimeType.startsWith('audio/')) return 'vocal';
      
      return 'multimedia';
    }
    if (contenu && typeof contenu === 'string') {
      return 'texte';
    }
    throw new Error('Type de message non reconnu');
  }
  // Méthode pour sauvegarder les fichiers

  // Création de message via socket
  async creerMessageSocket(expediteurId, donneesMessage) {
    const { contenu, destinataireId, fichiers } = donneesMessage;
    // Vérifier le destinataire
    const destinataire = await Personnel.findByPk(destinataireId);
    if (!destinataire) {
      throw new Error('Destinataire non trouvé');
    }
    // Sauvegarder les fichiers si présents
    const fichiersSauvegardes = fichiers 
      ? await this._sauvegarderFichiers(fichiers) 
      : [];
    // Détecter le type de message
    const type = await this._detecterTypeMesage(contenu, fichiersSauvegardes);
    // Créer le message
    const message = await Message.create({
      id: uuidv4(),
      type,
      contenu: contenu || null,
      fichiers: fichiersSauvegardes.length > 0
        ? fichiersSauvegardes.map(f => f.chemin)
        : null,
      metadonneesFichiers: fichiersSauvegardes.length > 0
        ? fichiersSauvegardes
        : null,
      statut: 'envoye',
      expediteurId,
      destinataireId,
      dateEnvoi: new Date()
    });
    // Récupérer les détails de l'expéditeur
    const expediteur = await Personnel.findByPk(expediteurId, {
      attributes: ['id', 'nom', 'prenom', 'email']
    });
    return {
      ...message.toJSON(),
      expediteur: expediteur.toJSON()
    };
  }
  // Méthode principale d'envoi de message (REST)
  async envoyerMessage(req, res) {
    try {
      const { contenu, destinataireId } = req.body;
      const expediteurId = req.personnel.id;
      const fichiers = req.files;
      // Créer le message
      const message = await this.creerMessageSocket(expediteurId, {
        contenu,
        destinataireId,
        fichiers
      });
      // Émettre le message via Socket.IO
      try {
        const io = getIO();
        io.to(destinataireId.toString()).emit('nouveauMessage', message);
        console.log('Message émis via socket');
      } catch (socketError) {
        console.error('Erreur lors de l\'émission socket:', socketError);
      }
      res.status(201).json({
        message: 'Message envoyé avec succès',
        data: message
      });
    } catch (erreur) {
      console.error('Erreur complète lors de l\'envoi:', erreur);
      res.status(500).json({
        message: 'Erreur lors de l\'envoi du message',
        erreur: erreur.message
      });
    }
  }

  // Méthode pour uploader des fichiers
  async uploadFichiers(req, res) {
    try {
        console.log('Début de uploadFichiers');
        console.log('Body:', req.body);
        console.log('Files:', req.files);
        
        const expediteurId = req.personnel.id;
        const destinataireId = req.body.destinataireId;
        const fichiers = req.files;

        // Vérification plus détaillée des fichiers
        if (!fichiers) {
            console.log('req.files est undefined');
            throw new Error('Aucun fichier n\'a été reçu');
        }

        if (!Array.isArray(fichiers)) {
            console.log('req.files n\'est pas un tableau');
            throw new Error('Format de fichiers invalide');
        }

        if (fichiers.length === 0) {
            console.log('req.files est un tableau vide');
            throw new Error('Aucun fichier n\'a été uploadé');
        }

        // Vérifier que le destinataire existe
        const destinataire = await Personnel.findByPk(destinataireId);
        if (!destinataire) {
            throw new Error('Destinataire non trouvé');
        }

        // Déterminer le type de message en fonction de l'extension du premier fichier
        const determinerType = (fichier) => {
            console.log('Détermination du type pour:', fichier);
            const mimeType = fichier.mimetype.toLowerCase();
            if (mimeType.startsWith('image/')) return 'image';
            if (mimeType.startsWith('video/')) return 'multimedia';
            if (mimeType.startsWith('audio/')) return 'vocal';
            if (mimeType.startsWith('application/') || mimeType.startsWith('text/')) return 'document';
            return 'multimedia';
        };

        const type = determinerType(fichiers[0]);
        console.log('Type déterminé:', type);

        // Préparer les données des fichiers
        const fichiersData = fichiers.map(fichier => ({
            nom: fichier.originalname,
            nomFichier: fichier.filename,
            chemin: fichier.path,
            taille: fichier.size,
            type: fichier.mimetype,
            dateUpload: new Date().toISOString()
        }));

        console.log('Données des fichiers préparées:', fichiersData);

        // Créer le message
        const message = await Message.create({
            id: uuidv4(),
            contenu: null,
            type,
            fichiers: fichiersData.map(f => f.chemin),
            metadonneesFichiers: fichiersData,
            statut: 'envoye',
            expediteurId,
            destinataireId,
            dateEnvoi: new Date()
        });

        // Récupérer les détails de l'expéditeur
        const expediteur = await Personnel.findByPk(expediteurId, {
            attributes: ['id', 'nom', 'prenom', 'email']
        });

        console.log('Message créé avec succès:', message.id);

        // Émettre le message via Socket.IO
        const io = getIO();
        io.to(destinataireId.toString()).emit('nouveauMessage', {
            ...message.toJSON(),
            expediteur: expediteur.toJSON()
        });

        res.status(201).json({
            message: 'Fichiers uploadés et message créé avec succès',
            data: {
                ...message.toJSON(),
                expediteur: expediteur.toJSON()
            }
        });
    } catch (erreur) {
        console.error('Erreur détaillée lors de l\'upload des fichiers:', erreur);
        res.status(500).json({
            message: 'Erreur lors de l\'upload des fichiers',
            erreur: erreur.message,
            details: erreur.stack
        });
    }
}


  // Méthode pour récupérer les messages
  async recupererMessages(req, res) {
    try {
      const { destinataireId } = req.params;
      const utilisateurId = req.personnel.id;
      
      const messages = await Message.findAll({
        where: {
          [Op.or]: [
            {
              expediteurId: utilisateurId,
              destinataireId: destinataireId
            },
            {
              expediteurId: destinataireId,
              destinataireId: utilisateurId
            }
          ]
        },
        order: [['dateEnvoi', 'ASC']],
        include: [
          {
            model: Personnel,
            as: 'expediteur',
            attributes: ['id', 'nom', 'prenom']
          }
        ]
      });
      
      res.json(messages);
    } catch (erreur) {
      res.status(500).json({
        message: 'Erreur lors de la récupération des messages',
        erreur: erreur.message
      });
    }
  }
  // Méthode pour marquer un message comme lu
  async marquerMessageCommeLu(req, res) {
    try {
      const { messageId } = req.params;
      const utilisateurId = req.personnel.id;
      const message = await Message.findOne({
        where: {
          id: messageId,
          destinataireId: utilisateurId
        }
      });
      if (!message) {
        return res.status(404).json({
          message: 'Message non trouvé ou non autorisé'
        });
      }
      await message.update({
        statut: 'lu',
        dateLecture: new Date()
      });
      // Émettre un événement de message lu via Socket.IO
      try {
        const io = getIO();
        io.to(message.expediteurId.toString()).emit('messageConsulte', messageId);
      } catch (socketError) {
        console.error('Erreur lors de l\'émission de l\'événement de message lu:', socketError);
      }
      res.json({
        message: 'Message marqué comme lu',
        data: message
      });
    } catch (erreur) {
      console.error('Erreur lors du marquage du message:', erreur);
      res.status(500).json({
        message: 'Erreur lors du marquage du message comme lu',
        erreur: erreur.message
      });
    }
  }
  // Méthode pour récupérer les conversations de l'utilisateur
  async recupererConversations(req, res) {
    try {
        const utilisateurId = req.personnel.id;
        const conversations = await Message.findAll({
            where: {
                [Op.or]: [
                    { expediteurId: utilisateurId },
                    { destinataireId: utilisateurId }
                ]
            },
            include: [
                {
                    model: Personnel,
                    as: 'expediteur',
                    attributes: ['id', 'nom', 'prenom', 'photoProfil', 'email']
                },
                {
                    model: Personnel,
                    as: 'destinataire',
                    attributes: ['id', 'nom', 'prenom', 'photoProfil', 'email']
                }
            ],
            order: [['dateEnvoi', 'DESC']],
            attributes: [
                'id',
                'contenu',
                'dateEnvoi',
                'statut',
                'expediteurId',
                'destinataireId'
            ]
        });
        // Créer un objet pour stocker les conversations uniques
        const conversationsUniques = new Map();
        conversations.forEach(message => {
            // Déterminer l'ID de l'interlocuteur
            const interlocuteurId = 
                message.expediteurId === utilisateurId 
                    ? message.destinataireId 
                    : message.expediteurId;
            
            // Si la conversation n'existe pas encore, la créer
            if (!conversationsUniques.has(interlocuteurId)) {
                const interlocuteur = 
                    message.expediteurId === utilisateurId 
                        ? message.destinataire 
                        : message.expediteur;
                
                conversationsUniques.set(interlocuteurId, {
                    interlocuteur: {
                        id: interlocuteur.id,
                        nom: interlocuteur.nom,
                        prenom: interlocuteur.prenom,
                        photoProfil: interlocuteur.photoProfil,
                        email: interlocuteur.email
                    },
                    dernierMessage: message,
                    messagesNonLus: 0
                });
            }
        });
        // Compter les messages non lus par conversation
        const messagesNonLus = await Message.findAll({
            where: {
                destinataireId: utilisateurId,
                statut: 'non_lu'
            },
            attributes: [
                'expediteurId',
                [sequelize.fn('COUNT', sequelize.col('id')), 'nombreMessagesNonLus']
            ],
            group: ['expediteurId']
        });
        // Mettre à jour les messages non lus
        messagesNonLus.forEach(result => {
            const interlocuteurId = result.expediteurId;
            const nombreMessagesNonLus = parseInt(result.get('nombreMessagesNonLus'));
            
            if (conversationsUniques.has(interlocuteurId)) {
                conversationsUniques.get(interlocuteurId).messagesNonLus = nombreMessagesNonLus;
            }
        });
        // Convertir la Map en tableau et trier par date du dernier message
        const conversationsFormattees = Array.from(conversationsUniques.values())
            .sort((a, b) => new Date(b.dernierMessage.dateEnvoi) - new Date(a.dernierMessage.dateEnvoi));
        res.json({
            conversations: conversationsFormattees,
            total: conversationsFormattees.length
        });
    } catch (erreur) {
        console.error('Erreur lors de la récupération des conversations:', erreur);
        res.status(500).json({
            message: 'Erreur lors de la récupération des conversations',
            erreur: erreur.message
        });
    }
}
}
module.exports = MessageController;