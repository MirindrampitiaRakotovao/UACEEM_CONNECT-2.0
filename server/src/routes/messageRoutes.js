const express = require('express');
const router = express.Router();
const { Message } = require('../models'); // Importez le modèle Message
const MessageController = require('../controllers/messageController');
const {uploadMultiple} = require('../middleware/uploads'); // Importer le middleware d'upload
const authMiddleware = require('../middleware/authMiddleware');
const { getIO } = require('../../socket'); // Importez getIO
module.exports = (io) => {
  const messageController = new MessageController(io);
  // Route pour envoyer un message avec fichiers
  router.post('/messages', 
    authMiddleware.authenticate, 
    uploadMultiple('fichiers', 5), // Limiter à 5 fichiers maximum
    messageController.envoyerMessage.bind(messageController)
  );
  // Route pour récupérer les messages d'un destinataire spécifique
  router.get('/messages/:destinataireId', 
    authMiddleware.authenticate, 
    messageController.recupererMessages.bind(messageController)
  );

  // Nouvelle route pour marquer un message comme lu
  router.patch('/messages/:messageId/lu',
    authMiddleware.authenticate,
    async (req, res) => {
      try {
        const { messageId } = req.params;
        const utilisateurId = req.personnel.id;

        // Mettre à jour le statut du message
        const message = await Message.findOne({
          where: {
            id: messageId,
            destinataireId: utilisateurId
          }
        });

        if (!message) {
          return res.status(404).json({
            message: 'Message non trouvé ou vous n\'êtes pas le destinataire'
          });
        }

        // Mettre à jour le message
        await message.update({
          statut: 'lu',
          dateLecture: new Date()
        });

        // Émettre l'événement via Socket.IO
        const io = getIO();
        io.to(message.expediteurId.toString()).emit('messageConsulte', {
          messageId: message.id,
          dateLecture: new Date(),
          lecteurId: utilisateurId
        });

        res.json({
          message: 'Message marqué comme lu',
          data: message
        });

      } catch (error) {
        console.error('Erreur lors du marquage du message:', error);
        res.status(500).json({
          message: 'Erreur lors du marquage du message comme lu',
          error: error.message
        });
      }
    }
  );

  //Recuperer les conversations 
  router.get('/conversations', 
    authMiddleware.authenticate, 
    messageController.recupererConversations.bind(messageController)
);
  return router;
};