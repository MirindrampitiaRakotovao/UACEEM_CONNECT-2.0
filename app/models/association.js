const Groupes = require('./groupes');
const Etudiants = require('./etudiants');
const Publications = require('./publications');
const Niveaux = require('./niveaux')
const Parcours = require('./parcours');
const Fichiers = require('./fichier');
const Mentions = require('./mentions');

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

Niveaux.belongsTo(Parcours, { 
  as: 'parcours', foreignKey: 'parcours_id' 
});

Groupes.belongsTo(Niveaux , {
  as: 'niveaux' , foreignKey: 'niveaux_id'
});

Parcours.belongsTo(Mentions , {
  as: 'mentions' , foreignKey: 'mention_id'
})