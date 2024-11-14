export interface EmploiDuTemps {
    id: string;
    nomMatiere: string;
    personnelId: string;
    jour: string;
    heureDebut: string;
    heureFin: string;
    salle: string;
    couleur: string;
    mention: string;
    niveau: string;
    parcours: string;
    semestre: string,
    anneeUniversitaire: string,
    professeur?: {
      nom: string;
      prenom: string;
    };
  }
  
  export interface NouvelEmploiDuTemps {
    nomMatiere?: string;
    personnelId?: string;
    jour?: string;
    heureDebut?: string;
    heureFin?: string;
    salle?: string;
    couleur?: string;
    mention?: string;
    niveau?: string;
    parcours?: string;
    semestre?: number;
    anneeUniversitaire?: string;
    statut?: string;
  }

  export interface DonneesFormulaire {
    enseignements: {
      [mention: string]: {
        [niveau: string]: Array<{
          nomMatiere: string;
          semestre: number;
          anneeUniversitaire: string;
          professeur: {
            id: string;
            nom: string;
            prenom: string;
          };
        }>;
      };
    };
    couleurs: string[];
    jours: string[];
    heures: number[];
  }