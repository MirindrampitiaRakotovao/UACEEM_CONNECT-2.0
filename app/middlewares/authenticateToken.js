const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_key';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: 'Accès refusé, aucun token fourni' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

module.exports = authenticateToken;
