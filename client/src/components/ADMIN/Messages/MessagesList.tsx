import { Check, Mail, Clock, Sun, Moon, Menu, Search, MessageSquarePlus } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import ConversationMiniWindow from './ConversationMiniWindow.tsx';
import { useTheme } from '../../../context/ThemeContext.tsx';
import NewMessageModal from './NewMessageModal.tsx';
import apiService from '../../../services/api.ts';


interface User {
    id: string;
    nom: string;
    prenom: string;
    photoProfil: string;
    email: string;
}
interface Conversation {
    id: string;
    interlocuteur: User;
    dernierMessage: {
        id: string;
        contenu: string;
        dateEnvoi: string;
    };
    messagesNonLus: number;
}
const MessageList: React.FC = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const handleNewMessageClick = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(false);
    };
    const handleCloseMiniWindow = () => {
        setSelectedUser(null);
    };
    const fetchConversations = async () => {
        try {
            const response = await apiService.get('/conversations');
            const conversationsData = response.conversations || (response.data && response.data.conversations);
            if (conversationsData && conversationsData.length > 0) {
                setConversations(conversationsData);
            } else {
                console.error('Aucune conversation trouvée', response);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des conversations:', error);
        }
    };
    useEffect(() => {
        fetchConversations();
    }, []);
    const filteredConversations = conversations.filter(conversation => {
        const sender = conversation.interlocuteur?.nom || '';
        const preview = conversation.dernierMessage?.contenu || '';
        return sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            preview.toLowerCase().includes(searchQuery.toLowerCase());
    });
    const handleMessageClick = (conversation: Conversation) => {
        navigate(`/MessagesView/${conversation.id}`, {
            state: {
                conversation: conversation
            }
        });
    };
    const handleQuickMessageClick = (user: User) => {
        setSelectedUser(user);
    };
    const totalNonLus = conversations.reduce((acc, curr) => acc + curr.messagesNonLus, 0);
    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-all duration-300`}>
            {/* Header */}
            <div className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm shadow-sm -z-0`}>
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <h1 className="text-sm font-medium">Messagerie</h1>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleNewMessageClick}
                                className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition duration-200`}
                            >
                                <MessageSquarePlus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal de nouveau message */}
            {isModalOpen && (
                <NewMessageModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSelectUser={handleSelectUser}
                />
            )}
            {/* Mini-fenêtre de conversation */}
            {selectedUser && (
                <ConversationMiniWindow
                    user={selectedUser}
                    onClose={handleCloseMiniWindow}
                />
            )}
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
                {/* Search Bar */}
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Rechercher des messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg ${isDarkMode ? 'bg-gray-800 text-white placeholder-gray-400 focus:bg-gray-700' : 'bg-white text-gray-800 placeholder-gray-400'} shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none transition duration-200`}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm transition duration-200`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total conversations</p>
                                <p className="text-lg font-medium">{conversations.length}</p>
                            </div>
                            <div className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                                <Mail className="w-4 h-4 text-blue-500" />
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm transition duration-200`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Messages non lus</p>
                                <p className="text-lg font-medium">{totalNonLus}</p>
                            </div>
                            <div className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                                <Clock className="w-4 h-4 text-purple-500" />
                            </div>
                            </div>
                    </motion.div>
                </div>
                {/* Messages List */}
                <div className="space-y-2">
                    {filteredConversations.map((conversation, index) => (
                        <motion.div
                            key={conversation.id}
                            initial={{ opacity: 0, translateY: 20 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            onClick={() => handleMessageClick(conversation)}
                            className={`group relative p-3 rounded-lg cursor-pointer ${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} ${conversation.messagesNonLus > 0 ? 'ring-1 ring-blue-500' : ''} transition duration-200 shadow-sm`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <img
                                        src={`http://localhost:5000/${conversation.interlocuteur.photoProfil?.replace(/\\/g, '/')}`}
                                        alt={`${conversation.interlocuteur.nom} ${conversation.interlocuteur.prenom}`}
                                        className="w-12 h-12 rounded-full object-cover ring-1 ring-offset-2 ring-blue-500"
                                    />
                                    {conversation.messagesNonLus > 0 && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full">
                                            {conversation.messagesNonLus}
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className={`text-sm font-medium truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                            {conversation.interlocuteur.nom} {conversation.interlocuteur.prenom}
                                        </h3>
                                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {new Date(conversation.dernierMessage.dateEnvoi).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {conversation.dernierMessage.contenu}
                                    </p>
                                    <div className="absolute top-1/2 right-3 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-200">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleQuickMessageClick(conversation.interlocuteur);
                                            }}
                                            className={`p-1 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                                        >
                                            <MessageSquarePlus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default MessageList;