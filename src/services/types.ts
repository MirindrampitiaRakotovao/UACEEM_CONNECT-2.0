export interface Publication {
    id: number;
    titre: string;
    contenu: string;
    auteurId: number;
    date: string;
    // Champs supplémentaires comme les likes, fichiers attachés, etc.
  }
  
  export interface Commentaire {
    id: number;
    contenu: string;
    auteurId: number;
    publicationId: number;
    date: string;
  }
  
  export interface PublicationListProps {
    publications: Publication[];
    loading: boolean;
    error: string | null;
  }
  