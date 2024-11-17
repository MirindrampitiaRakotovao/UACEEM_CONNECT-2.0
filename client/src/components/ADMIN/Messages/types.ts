export type MessageType = 'text' | 'voice' | 'image' | 'file';
export interface Message {
  id: number;
  type: MessageType;
  content: string;
  timestamp: string;
  isMe: boolean;
  metadata?: {
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    voiceDuration?: number;
    imageUrl?: string;
  };
}
export interface Conversation {
  id?: string;
  interlocuteur?: {
    id: string;
    nom: string;
    prenom: string;
    photoProfil?: string;
  };
  destinataire?: {
    id: string;
    nom: string;
    prenom: string;
    photoProfil?: string;
  };
  expediteur?: {
    id: string;
    nom: string;
    prenom: string;
    photoProfil?: string;
  };
  messages?: Message[];
  dernierMessage?: {
    contenu: string;
    dateEnvoi: string;
  };
  messagesNonLus?: number;
}
  export interface ConversationListProps {
    conversations: Conversation[];
    selectedConversation: Conversation | null;
    onSelectConversation: (conversation: Conversation) => void;
    isDarkMode: boolean;
    searchTerm?: string; // Rendre le searchTerm optionnel
  }
  export interface ConversationSidebarProps {
    isDarkMode: boolean;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    conversations: Conversation[];
    selectedConversation: Conversation | null;
    onSelectConversation: (conversation: Conversation) => void;
  }

  export interface User {
    id: string;
    nom: string;
    prenom: string;
    nomUtilisateur: string;
    email?: string;
  }