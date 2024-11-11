'use strict';
const fs = require('fs');
const path = require('path');
const { Enseignement } = require('../models');
class ImportController {
  // Méthode statique pour l'importation CSV
  static async importCSV(req, res) {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier n\'a été téléchargé' });
    }
    try {
      // Lire le contenu du fichier directement
      const contenuFichier = fs.readFileSync(req.file.path, 'utf-8');
      
      // Séparer les lignes
      const lignes = contenuFichier
        .split('\n')
        .map(ligne => ligne.trim())
        .filter(ligne => ligne.length > 0);
      // Extraire les informations générales
      const infosGenerales = this.extraireInfosGenerales(lignes);
      
      // Extraire les matières
      const matieres = this.extraireMatieres(lignes, infosGenerales);
      
      // Importer les matières
      const resultats = await this.importerMatieres(matieres);
      
      // Supprimer le fichier temporaire
      fs.unlinkSync(req.file.path);
      return res.status(200).json({
        message: 'Importation terminée',
        total: matieres.length,
        details: {
          inseres: resultats.length,
          erreurs: matieres.length - resultats.length
        }
      });
    } catch (error) {
      console.error('Erreur lors de l\'importation:', error);
      
      // Supprimer le fichier temporaire en cas d'erreur
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(500).json({
        message: 'Erreur lors de l\'importation',
        erreur: error.message
      });
    }
  }
  // Méthode statique pour extraire les informations générales
  static extraireInfosGenerales(lignes) {
    const infos = {
      anneeUniversitaire: '2023-2024',
      niveau: 'Licence 1',
      mention: 'Économie'
    };
    for (const ligne of lignes) {
      if (ligne.includes('UNIVERSITE')) {
        const matchNiveau = ligne.match(/Licence\s*(\d+)/i);
        if (matchNiveau) {
          infos.niveau = `Licence ${matchNiveau[1]}`;
        }
      }
    }
    return infos;
  }
  // Méthode statique pour extraire les matières
  static extraireMatieres(lignes, infosGenerales) {
    const matieres = [];
    let semestreActuel = null;
    let typeUEActuel = null;
    for (const ligne of lignes) {
      // Détection du semestre
      if (ligne.includes('SEMESTRE 1')) {
        semestreActuel = 1;
        continue;
      }
      if (ligne.includes('SEMESTRE 2')) {
        semestreActuel = 2;
        continue;
      }
      // Détection du type d'UE
      if (ligne.includes('UE FONDAMENTALES')) {
        typeUEActuel = 'Fondamentale';
        continue;
      }
      if (ligne.includes('UE DECOUVERTE')) {
        typeUEActuel = 'Découverte';
        continue;
      }
      if (ligne.includes('UE DE METHODOLOGIE')) {
        typeUEActuel = 'Méthodologie';
        continue;
      }
      // Extraction des matières
      const matiere = this.extraireMatiere(ligne, semestreActuel, typeUEActuel, infosGenerales);
      if (matiere) {
        matieres.push(matiere);
      }
    }
    return matieres;
  }
  // Méthode statique pour extraire une matière
  static extraireMatiere(ligne, semestre, typeUE, infosGenerales) {
    // Regex pour différents formats de fichiers
    const regexes = [
      /^(.*?),(\d+),(\d+),,(\d+),(\d+),([\d.]+),([\d.]+),(.*?)$/,
      /^(.*?);(\d+);(\d+);;(\d+);(\d+);([\d.]+);([\d.]+);(.*?)$/
    ];
    let correspondance = null;
    for (const regex of regexes) {
      correspondance = ligne.match(regex);
      if (correspondance) break;
    }
    if (!correspondance) return null;
    // Séparer le nom de l'enseignant
    const [nomEnseignant, prenomEnseignant] = this.separerNomEnseignant(correspondance[8].trim());
    return {
      nomMatiere: correspondance[1].trim(),
      coursmagistraux: parseInt(correspondance[2], 10) || 0,
      travauxDiriges: parseInt(correspondance[3], 10) || 0,
      volumeHoraireTotal: parseInt(correspondance[4], 10) || 0,
      credits: parseFloat(correspondance[6]) || 0,
      coefficient: parseFloat(correspondance[7]) || 1,
      nomEnseignant: nomEnseignant,
      prenomEnseignant: prenomEnseignant,
      semestre: semestre || 1,
      typeUE: typeUE || 'Fondamentale',
      ...infosGenerales
    };
  }
  // Méthode statique pour séparer le nom et le prénom
  static separerNomEnseignant(nomComplet) {
    const parties = nomComplet.split(' ');
    if (parties.length <= 1) return [nomComplet, null];
    
    const nomEnseignant = parties[parties.length - 1].toUpperCase();
    const prenomEnseignant = parties.slice(0, -1).join(' ');
    
    return [nomEnseignant, prenomEnseignant];
  }
  // Méthode statique pour importer les matières
  static async importerMatieres(matieres) {
    const resultats = [];
    
    for (const matiere of matieres) {
      try {
        const enseignement = await Enseignement.create(matiere);
        resultats.push(enseignement);
      } catch (error) {
        console.error(`Erreur lors de l'importation de ${matiere.nomMatiere}:`, error.message);
      }
    }
    
    return resultats;
  }
}
module.exports = ImportController;