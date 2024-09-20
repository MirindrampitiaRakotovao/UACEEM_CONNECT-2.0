const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_key';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(403).json({ message: 'Accès refusé, aucun token fourni' });
    } 

    try {
        const user = jwt.verify(token, JWT_SECRET); 
        req.user = user; 
        next(); 
      } catch (error) {
        return res.status(403).json({ message: 'Token invalide' });
      }
};

module.exports = authenticateToken;
