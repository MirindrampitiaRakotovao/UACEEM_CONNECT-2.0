// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'votre_clé_secrète_pour_jwt';

const authMiddleware = {
  authenticate: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Attente du token dans le header Authorization: Bearer <token>
    
    if (!token) {
      return res.status(403).json({ message: 'Token manquant, accès refusé' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.personnel = decoded; // Ajouter les infos de l'utilisateur au req
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
  },

  authorizeRoles: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.personnel.role)) {
        return res.status(403).json({ message: 'Accès refusé : rôle insuffisant' });
      }
      next();
    };
  }
};

module.exports = authMiddleware;
