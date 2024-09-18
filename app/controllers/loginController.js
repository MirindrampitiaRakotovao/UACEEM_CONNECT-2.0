const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Etudiants = require('../models/etudiants');

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_key';

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Trouver l'étudiant avec le nom d'utilisateur
        const etudiant = await Etudiants.findOne({ where: { username } });

        if (!etudiant) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérification du mot de passe
        const validPassword = await bcrypt.compare(password, etudiant.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { id: etudiant.id, username: etudiant.username, role:etudiant.role }, 
            JWT_SECRET, 
            { expiresIn: '1h' });

        // Retirer le mot de passe avant de retourner l'objet utilisateur
        const { password: etudiantPassword, ...etudiantSansMotDePasse } = etudiant.dataValues;


        res.status(200).json({
            token,
            etudiant: etudiantSansMotDePasse
        });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur', error });
    }

};
