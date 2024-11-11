// socket.js
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
    const utilisateur = socket.personnel; // Accéder aux informations de l'utilisateur
    console.log(`Utilisateur connecté: ${utilisateur.id}`);

    // Événement personnalisé pour les nouvelles publications
    socket.on('new_publication', (publicationData) => {
      console.log('Nouvelle publication reçue:', publicationData);
      // Ajouter l'ID de l'utilisateur à la publication
      publicationData.utilisateurId = utilisateur.id;
      io.emit('new_publication', publicationData);
    });

    // Gestion des messages
    socket.on('send_message', (messageData) => {
      if (!messageData.destinataireId) {
        return socket.emit('error', { message: 'Destinataire non spécifié' });
      }

      const messageComplet = {
        ...messageData,
        expediteurId: utilisateur.id,
        dateEnvoi: new Date()
      };

      io.to(messageData.destinataireId.toString()).emit('new_message', messageComplet);
    });

    // Marquage des messages comme lus
    socket.on('message_lu', (data) => {
      if (data.expediteurId) {
        io.to(data.expediteurId.toString()).emit('message_consulte', {
          messageId: data.messageId,
          lecteurId: utilisateur.id,
          dateLecture: new Date()
        });
      }
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