const Groupes = require('./groupes');
const Etudiants = require('./etudiants');
const Publications = require('./publications');
const Fichiers = require('./fichier');

Groupes.hasMany(Etudiants, {
  foreignKey: 'groupes_id',
  as: 'etudiants',
});

Etudiants.belongsTo(Groupes, {
  foreignKey: 'groupes_id',
  as: 'groupe',
});

Etudiants.hasMany(Publications, { 
  foreignKey: 'etudiant_id' 
});

Publications.belongsTo(Etudiants, { 
  foreignKey: 'etudiant_id' 
});

Publications.hasMany(Fichiers, {
   foreignKey: 'id_publication' 
});

Fichiers.belongsTo(Publications, {
   foreignKey: 'id_publication' 
});
