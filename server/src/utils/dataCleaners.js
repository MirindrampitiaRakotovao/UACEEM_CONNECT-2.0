// utils/dataCleaners.js
/**
 * Nettoie et normalise une chaîne de texte
 * @param {string} text - Texte à nettoyer
 * @returns {string} Texte nettoyé
 */
exports.cleanText = (text) => {
    if (typeof text !== 'string') return '';
    return text
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/['']/g, "'")
        .toLowerCase();
};
/**
 * Extrait les informations d'un enseignant à partir de son nom complet
 * @param {string} nomComplet - Nom complet de l'enseignant
 * @returns {Object} Objet contenant le nom et le titre
 */
exports.extractEnseignantInfos = (nomComplet) => {
    const titresPossibles = [
        'Dr', 'Pr', 'Professeur', 'Docteur', 
        'Mme', 'M.', 'Mlle'
    ];
    // Extraction du titre
    const titreTrouve = titresPossibles.find(titre => 
        nomComplet.startsWith(titre)
    );
    const nom = titreTrouve 
        ? nomComplet.replace(titreTrouve, '').trim() 
        : nomComplet;
    return {
        nom: nom || 'Enseignant Non Défini',
        titre: titreTrouve || 'Enseignant'
    };
};
/**
 * Normalise un code (supprime les caractères spéciaux, met en majuscules)
 * @param {string} code - Code à normaliser
 * @returns {string} Code normalisé
 */
exports.normaliserCode = (code) => {
    return code
        .replace(/[^a-zA-Z0-9-]/g, '')
        .toUpperCase()
        .trim();
};
/**
 * Formate un volume horaire
 * @param {string|number} volume - Volume à formater
 * @returns {number} Volume formaté
 */
exports.formaterVolume = (volume) => {
    // Convertit différents formats de volume
    if (typeof volume === 'string') {
        // Remplace les virgules par des points
        volume = volume.replace(',', '.');
    }
    
    const volumeNumeric = parseFloat(volume);
    return isNaN(volumeNumeric) ? 0 : volumeNumeric;
};
/**
 * Vérifie si une valeur est vide ou nulle
 * @param {*} value - Valeur à vérifier
 * @returns {boolean} Indique si la valeur est vide
 */
exports.isEmptyOrNull = (value) => {
    return value === null || 
           value === undefined || 
           value === '' || 
           (Array.isArray(value) && value.length === 0) ||
           (typeof value === 'object' && Object.keys(value).length === 0);
};
/**
 * Convertit une valeur en nombre entier
 * @param {*} value - Valeur à convertir
 * @param {number} [defaultValue=0] - Valeur par défaut
 * @returns {number} Nombre converti
 */
exports.toInteger = (value, defaultValue = 0) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
};
/**
 * Convertit une valeur en nombre décimal
 * @param {*} value - Valeur à convertir
 * @param {number} [defaultValue=0] - Valeur par défaut
 * @returns {number} Nombre converti
 */
exports.toFloat = (value, defaultValue = 0) => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? defaultValue : parsed;
};
// Exportation de toutes les fonctions
module.exports = {
    cleanText: exports.cleanText,
    extractEnseignantInfos: exports.extractEnseignantInfos,
    normaliserCode: exports.normaliserCode,
    formaterVolume: exports.formaterVolume,
    isEmptyOrNull: exports.isEmptyOrNull,
    toInteger: exports.toInteger,
    toFloat: exports.toFloat
};