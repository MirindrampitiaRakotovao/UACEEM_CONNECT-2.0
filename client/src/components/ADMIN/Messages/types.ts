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
  id: number;
  sender: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
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