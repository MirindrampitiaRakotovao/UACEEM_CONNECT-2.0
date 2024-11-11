// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'votre_clé_secrète_pour_jwt';

const authMiddleware = {
  // Middleware pour les requêtes HTTP
  authenticate: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(403).json({ message: 'Token manquant, accès refusé' });
    }
    
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.personnel = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
  },

  // Middleware pour Socket.IO
  authenticateSocket: (socket, next) => {
    const token = 
      socket.handshake.auth.token || 
      socket.handshake.headers.authorization?.split(' ')[1] || 
      socket.handshake.query.token;

    if (!token) {
      return next(new Error('Token manquant, accès refusé'));
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      socket.personnel = decoded; // Stocker les infos de l'utilisateur dans le socket
      
      // Joindre automatiquement la room personnelle de l'utilisateur
      socket.join(decoded.id.toString());
      
      console.log(`Socket authentifié pour l'utilisateur: ${decoded.id}`);
      next();
    } catch (error) {
      console.error('Erreur d\'authentification socket:', error);
      return next(new Error('Token invalide ou expiré'));
    }
  },

  // Middleware pour les rôles
  authorizeRoles: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.personnel.role)) {
        return res.status(403).json({ message: 'Accès refusé : rôle insuffisant' });
      }
      next();
    };
  },

  // Méthode utilitaire pour vérifier un token
  verifyToken: (token) => {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      throw new Error('Token invalide ou expiré');
    }
  },

  // Générer un token (utile pour les tests ou la réémission)
  generateToken: (userData) => {
    return jwt.sign(
      userData,
      SECRET_KEY,
      { expiresIn: '24h' }
    );
  }
};

module.exports = authMiddleware;