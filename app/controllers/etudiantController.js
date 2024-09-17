const Etudiant = require('../models/etudiants');

const createEtudiant = async (req, res) => {
  try {
    const { nom, email, mention_id, matricule, sexe, date_nais, lieu_nais, situation_matri, password, username } = req.body;

    // Vérifier si l'email ou le matricule existe déjà
    const existingEtudiant = await Etudiant.findOne({ where: { [Op.or]: [{ email }, { matricule }, { username }] } });
    if (existingEtudiant) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'étudiant
    const etudiant = await Etudiant.create({
      nom,
      email,
      mention_id,
      matricule,
      sexe,
      date_nais,
      lieu_nais,
      situation_matri,
      password: hashedPassword,
      username
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès', etudiant });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
};

module.exports = { createEtudiant };
