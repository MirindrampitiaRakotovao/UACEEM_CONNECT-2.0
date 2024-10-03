const Groupes = require('./groupes');
const Etudiants = require('./etudiants');
const Publications = require('./publications');
const Niveaux = require('./niveaux');
const Parcours = require('./parcours');
const Fichiers = require('./fichier');
const Mentions = require('./mentions');
const GroupePartages = require('./groupePartage');
const GroupePartageEtudiants = require('./groupePartageEtudiant')

// Associations entre groupes et étudiants
Groupes.hasMany(Etudiants, {
  foreignKey: 'groupes_id',
  as: 'etudiants',
});

Etudiants.belongsTo(Groupes, {
  foreignKey: 'groupes_id',
  as: 'groupe',
});

// Association many-to-many entre groupePartages et étudiants
GroupePartages.belongsToMany(Etudiants, { 
  through: GroupePartageEtudiants, 
  foreignKey: 'groupe_partage_id',
  otherKey: 'membre_id',
  as: 'etudiants'
});

Etudiants.belongsToMany(GroupePartages, { 
  through: GroupePartageEtudiants, 
  foreignKey: 'membre_id',
  otherKey: 'groupe_partage_id',
  as: 'groupesPartages'
});

// Association entre étudiants et publications
Etudiants.hasMany(Publications, { 
  foreignKey: 'etudiant_id' 
});

Publications.belongsTo(Etudiants, { 
  foreignKey: 'etudiant_id' 
});

// Association entre publications et fichiers
Publications.hasMany(Fichiers, {
  foreignKey: 'id_publication' 
});

Fichiers.belongsTo(Publications, {
  foreignKey: 'id_publication' 
});

// Associations avec niveaux, parcours et mentions
Niveaux.belongsTo(Parcours, { 
  as: 'parcours', foreignKey: 'parcours_id' 
});

Groupes.belongsTo(Niveaux, {
  as: 'niveaux', foreignKey: 'niveaux_id'
});

Parcours.belongsTo(Mentions, {
  as: 'mentions', foreignKey: 'mention_id'
});

module.exports = {
  Groupes,
  Etudiants,
  Publications,
  Fichiers,
  Niveaux,
  Parcours,
  Mentions,
  GroupePartages,
  GroupePartageEtudiants
};
