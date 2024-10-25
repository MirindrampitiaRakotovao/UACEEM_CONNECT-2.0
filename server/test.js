const bcrypt = require('bcrypt');

const motDePassePlain = 'mirantoniaina'; // Remplacez par le mot de passe clair
const motDePasseHashé = '$2b$10$7rSk9RXi4XozEQu6MICeC..MV0SCzb0SsS5PKukFSEghLNVBL5pay'; // Hash du mot de passe

bcrypt.compare(motDePassePlain, motDePasseHashé, (err, result) => {
  if (err) {
    console.error('Erreur:', err);
    return;
  }
  console.log('Mot de passe valide:', result);
});
