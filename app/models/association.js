const Groupes = require('./groupes');
const Etudiants = require('./etudiants');
const Publications = require('./publications');
const Niveaux = require('./niveaux');
const Parcours = require('./parcours');
const Fichiers = require('./fichier');
const Mentions = require('./mentions');
const GroupePartages = require('./groupePartage');
const GroupePartageEtudiants = require('./groupePartageEtudiant');
const Reactions = require('./reactions');
const Commentaires = require('./commentaires');
const MessagePrivee = require('./messagePrivees');

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
// Une publication peut avoir plusieurs fichiers
Publications.hasMany(Fichiers, {
  foreignKey: 'id_publication',
  as: 'fichiers',
  onDelete: 'CASCADE',
});

// Un fichier appartient à une publication
Fichiers.belongsTo(Publications, {
  foreignKey: 'id_publication',
  as: 'publication',
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

//Relation entre reaction et publication
// Une publication peut avoir plusieurs réactions
Publications.hasMany(Reactions, { 
  foreignKey: 'publication_id' 
});

Reactions.belongsTo(Publications, {
  foreignKey: 'publication_id' 
});

// Un étudiant peut avoir plusieurs réactions
Etudiants.hasMany(Reactions, { 
  foreignKey: 'etudiant_id' 
});

Reactions.belongsTo(Etudiants, { 
  foreignKey: 'etudiant_id' 
});


// association entre commentaire et publication
Commentaires.belongsTo(Publications, { 
  foreignKey: 'publication_id' 
});

Commentaires.belongsTo(Etudiants, { 
  foreignKey: 'etudiant_id' 
});

//reaction et commentaire
Reactions.belongsTo(Commentaires, {
  foreignKey: 'commentaire_id',
});

//commentaire et reponse aux commentaire
Commentaires.hasMany(Commentaires, {
   as: 'reponses', 
   foreignKey: 'parent_id' 
  });

Commentaires.belongsTo(Commentaires, {
   as: 'parent',
    foreignKey: 'parent_id' 
  });

//Commentaire et etudiant
Commentaires.belongsTo(Etudiants, {
  foreignKey: 'etudiant_id' 
});
Etudiants.hasMany(Commentaires, {
  foreignKey: 'etudiant_id' 
});

// Association dans MessagePrivee
MessagePrivee.belongsTo(Etudiants, {
  as: 'expediteur', 
  foreignKey: 'expediteur_id' 
});
MessagePrivee.belongsTo(Etudiants, {
  as: 'destinataire', 
  foreignKey: 'destinataire_id' 
});

Etudiants.hasMany(MessagePrivee, {
   foreignKey: 'expediteur_id', 
   as: 'sentMessages' 
});

Etudiants.hasMany(MessagePrivee, { 
  foreignKey: 'destinataire_id', 
  as: 'receivedMessages' 
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
  GroupePartageEtudiants,
  Reactions,
  Commentaires,
  MessagePrivee,
};


