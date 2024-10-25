const { Server } = require('socket.io');

// Définir une fonction pour obtenir une instance de Socket.IO
let io;

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5173', // Autoriser cette origine (le frontend)
      methods: ['GET', 'POST'],
      credentials: true // Permet d'envoyer des cookies, si nécessaire
    }
  });

  io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté au serveur Socket.IO');

    // Événement personnalisé pour les nouvelles publications
    socket.on('new_publication', (publicationData) => {
      console.log('Nouvelle publication reçue:', publicationData);

      // Émettre l'événement à tous les clients connectés
      io.emit('new_publication', publicationData);
    });

    socket.on('user_connected', (data) => {
      console.log(`L'utilisateur ${data.nomUtilisateur} est connecté au serveur Socket.IO.`);
    });

    socket.on('disconnect', () => {
      console.log('Un utilisateur s\'est déconnecté du serveur Socket.IO');
    });
  });
};

// Fonction pour obtenir l'instance de Socket.IO
const getIO = () => {
  if (!io) {
    throw new Error('Socket.io n\'est pas initialisé !');
  }
  return io;
};

module.exports = { initSocket, getIO };
