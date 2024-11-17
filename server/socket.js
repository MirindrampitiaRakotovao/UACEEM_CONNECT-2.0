const { Server } = require('socket.io');
const authMiddleware = require('./src/middleware/authMiddleware');
let io;
const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    }
  });
  // Utiliser le middleware d'authentification
  io.use(authMiddleware.authenticateSocket);
  io.on('connection', (socket) => {
    const utilisateur = socket.personnel;
    console.log(`Utilisateur connecté: ${utilisateur.id}`);
    // Événement personnalisé pour les nouvelles publications
    socket.on('new_publication', (publicationData) => {
      // Validation des données
      if (!publicationData || !publicationData.contenu) {
        return socket.emit('error', { message: 'Données de publication invalides' });
      }
      const publicationComplete = {
        ...publicationData,
        utilisateurId: utilisateur.id,
        dateCreation: new Date()
      };
      // Diffuser à tous les utilisateurs connectés
      io.emit('new_publication', publicationComplete);
    });
    // Gestion des messages
    socket.on('send_message', async (messageData) => {
      // Validation robuste des données
      if (!messageData.destinataireId || !messageData.contenu) {
        return socket.emit('error', { 
          message: 'Données de message incomplètes',
          details: {
            destinataireId: !!messageData.destinataireId,
            contenu: !!messageData.contenu
          }
        });
      }
      const messageComplet = {
        ...messageData,
        expediteurId: utilisateur.id,
        dateEnvoi: new Date(),
        statut: 'envoyé'
      };
      try {
        // Envoyer le message au destinataire spécifique
        io.to(messageData.destinataireId.toString()).emit('new_message', messageComplet);
        
        // Optionnel : Sauvegarder le message en base de données
        // await saveMessageToDatabase(messageComplet);
      } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        socket.emit('message_error', { 
          messageId: messageData.id, 
          message: 'Échec de l\'envoi du message' 
        });
      }
    });
    // Marquage des messages comme lus
    socket.on('message_lu', (data) => {
      if (!data.messageId || !data.expediteurId) {
        return socket.emit('error', { message: 'Données de lecture invalides' });
      }
      io.to(data.expediteurId.toString()).emit('message_consulte', {
        messageId: data.messageId,
        lecteurId: utilisateur.id,
        dateLecture: new Date()
      });
    });
    // Gestion des erreurs de socket
    socket.on('error', (error) => {
      console.error('Erreur de socket:', error);
    });
    socket.on('disconnect', () => {
      console.log(`Utilisateur déconnecté: ${utilisateur.id}`);
    });
  });
  return io;
};
const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO n\'est pas initialisé !');
  }
  return io;
};
module.exports = { initSocket, getIO };