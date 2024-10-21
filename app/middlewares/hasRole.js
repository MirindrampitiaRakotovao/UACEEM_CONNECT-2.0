// Vérifier si l'utilisateur a l'un des rôles spécifiés
const hasRole = (roles) => {
    return (req, res, next) => {
      if (req.user && roles.includes(req.user.role)) {
        return next(); // Si le rôle est correct, continuer
      }
      console.warn(`Accès refusé pour l'utilisateur ${req.user?.username || 'inconnu'}.`);
      return res.status(403).json({ message: 'Accès refusé. Rôle insuffisant.' });
    };
  };
  
  module.exports = hasRole;
  