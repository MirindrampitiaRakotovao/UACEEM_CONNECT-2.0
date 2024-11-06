import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Phone, Video, MoreHorizontal, Send, Paperclip, Mic, Smile, Image, Filter, Star, Pin, Plus } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.tsx';

// Types
interface Message {
    id: number;
    text: string;
    sent: boolean;
    time: string;
    isRead: boolean;
    hasAttachment: boolean;
    attachment?: {
        type: string;
        url: string;
        name: string;
    };
    hasReactions?: string[];
}

interface Contact {
    id: number;
    name: string;
    avatar: string;
    role: string;
    isOnline: boolean;
    lastMessage: string;
    unreadCount: number;
    lastSeen: string;
    isStarred: boolean;
    isPinned: boolean;
    status: string;
    isArchived: boolean;
    messages: Message[];
}

const MessagesList = () => {
    const { isDarkMode } = useTheme();
    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const [messageInput, setMessageInput] = useState('');
    const [filterOption, setFilterOption] = useState<'all' | 'unread' | 'starred' | 'archived'>('all');
    const [chatView, setChatView] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');

    // Données simulées enrichies
    const mockContacts: Contact[] = [
        {
            id: 1,
            name: "Emma Thompson",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            role: "Designer UI/UX",
            isOnline: true,
            lastMessage: "Le nouveau design est prêt ! 🎨",
            unreadCount: 3,
            lastSeen: "il y a 2m",
            isStarred: true,
            isPinned: true,
            isArchived: false,
            status: "En train d'écrire...",
            messages: [
                {
                    id: 1,
                    text: "Bonjour ! Voici les dernières maquettes du projet.",
                    sent: false,
                    time: "09:30",
                    isRead: true,
                    hasAttachment: true,
                    attachment: {
                        type: 'image',
                        url: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742',
                        name: 'dashboard-v1.png'
                    }
                },
                {
                    id: 2,
                    text: "Super ! J'aime beaucoup l'approche minimaliste 👌",
                    sent: true,
                    time: "09:32",
                    isRead: true,
                    hasAttachment: false,
                    hasReactions: ['👍']
                },
                {
                    id: 3,
                    text: "J'ai aussi préparé une version alternative",
                    sent: false,
                    time: "09:35",
                    isRead: true,
                    hasAttachment: true,
                    attachment: {
                        type: 'image',
                        url: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742',
                        name: 'dashboard-v2.png'
                    }
                }
            ]
        },
        {
            id: 2,
            name: "Lucas Martin",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            role: "Développeur Frontend",
            isOnline: true,
            lastMessage: "PR merged sur develop 🚀",
            unreadCount: 1,
            lastSeen: "il y a 5m",
            isStarred: false,
            isPinned: true,
            isArchived: false,
            status: "En réunion",
            messages: [
                {
                    id: 1,
                    text: "Hey, j'ai terminé l'intégration du nouveau composant",
                    sent: false,
                    time: "10:15",
                    isRead: true,
                    hasAttachment: false
                },
                {
                    id: 2,
                    text: "Voici une capture d'écran",
                    sent: false,
                    time: "10:16",
                    isRead: true,
                    hasAttachment: true,
                    attachment: {
                        type: 'image',
                        url: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742',
                        name: 'component.png'
                    }
                }
            ]
        },
        {
            id: 3,
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            role: "Product Owner",
            isOnline: false,
            lastMessage: "Planning poker à 14h 📅",
            unreadCount: 0,
            lastSeen: "il y a 1h",
            isStarred: true,
            isPinned: false,
            isArchived: true,
            status: "En pause déjeuner",
            messages: [/* Messages similaires */]
        },
        // Ajoutez plus de contacts avec des données similaires...
    ];

    // Fonctions de filtrage et de recherche
    const filterContacts = (contacts: Contact[]) => {
        let filtered = contacts;

        // Filtre par option
        switch (filterOption) {
            case 'unread':
                filtered = filtered.filter(contact => contact.unreadCount > 0);
                break;
            case 'starred':
                filtered = filtered.filter(contact => contact.isStarred);
                break;
            case 'archived':
                filtered = filtered.filter(contact => contact.isArchived);
                break;
        }

        // Filtre par recherche
        if (searchQuery) {
            filtered = filtered.filter(contact =>
                contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    // Fonction de gestion des archives
    const handleArchive = (contactId: number, event: React.MouseEvent) => {
        event.stopPropagation();
        // Logique d'archivage
        // Dans une vraie application, vous feriez un appel API ici
    };
    return (
        <div className={`min-h-screen ml-6`}>
            <div className="max-w-[1800px] mx-auto p-3">
                {/* En-tête compact avec filtres */}
                <div className={`mb-4 rounded-lg p-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <h1 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Messages
                            <span className="ml-2 text-xs text-gray-500">
                                ({mockContacts.length})
                            </span>
                        </h1>
                        <div className="flex items-center space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setChatView(chatView === 'grid' ? 'list' : 'grid')}
                                className={`p-1.5 rounded-md text-xs ${isDarkMode
                                    ? 'bg-gray-700 text-gray-300'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                {chatView === 'grid' ? 'Liste' : 'Grille'}
                            </motion.button>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Rechercher..."
                                    className={`w-48 py-1.5 px-3 text-xs rounded-md pl-8 ${isDarkMode
                                        ? 'bg-gray-700 text-white placeholder-gray-400'
                                        : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                                        }`}
                                />
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                            </div>
                        </div>
                    </div>

                    {/* Filtres compacts */}
                    <div className="flex space-x-2 mt-3">
                        {[
                            { key: 'all', label: 'Tous' },
                            { key: 'unread', label: 'Non lus' },
                            { key: 'starred', label: 'Favoris' },
                            { key: 'archived', label: 'Archivés' }
                        ].map((filter) => (
                            <motion.button
                                key={filter.key}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setFilterOption(filter.key as any)}
                                className={`px-3 py-1 rounded-full text-xs ${filterOption === filter.key
                                    ? isDarkMode
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white'
                                    : isDarkMode
                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {filter.label}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Grille des conversations avec taille réduite */}
                <div className={`grid ${chatView === 'grid'
                    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'
                    : 'grid-cols-1 gap-2'
                    }`}>
                    {filterContacts(mockContacts).map((contact) => (
                        <motion.div
                            key={contact.id}
                            layoutId={`chat-${contact.id}`}
                            onClick={() => setSelectedChat(contact.id)}
                            whileHover={{ scale: 1.02 }}
                            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'
                                } rounded-lg shadow-sm overflow-hidden cursor-pointer relative ${chatView === 'grid' ? 'p-4' : 'p-3'
                                }`}
                        >
                            {/* Indicateurs d'état */}
                            <div className="absolute top-2 right-2 flex items-center space-x-1">
                                {contact.isPinned && (
                                    <Pin className="text-yellow-500" size={12} />
                                )}
                                {contact.isStarred && (
                                    <Star className="text-blue-500" size={12} />
                                )}
                            </div>

                            <div className={`flex ${chatView === 'grid' ? 'flex-col items-center' : 'items-center space-x-3'}`}>
                                <div className="relative">
                                    <img
                                        src={contact.avatar}
                                        alt={contact.name}
                                        className={`object-cover ${chatView === 'grid'
                                            ? 'w-14 h-14 rounded-lg mb-2'
                                            : 'w-10 h-10 rounded-lg'
                                            }`}
                                    />
                                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 
                                        ${isDarkMode ? 'border-gray-800' : 'border-white'}
                                        ${contact.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                                    />
                                </div>

                                <div className={`${chatView === 'grid' ? 'text-center w-full' : 'flex-1'}`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                            {contact.name}
                                        </h3>
                                        <span className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                            {contact.lastSeen}
                                        </span>
                                    </div>

                                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                        {contact.role}
                                    </p>

                                    <div className="flex items-center justify-between mt-1">
                                        <p className={`text-xs truncate ${isDarkMode ? 'text-gray-500' : 'text-gray-500'
                                            }`}>
                                            {contact.status}
                                        </p>
                                        {contact.unreadCount > 0 && (
                                            <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                                {contact.unreadCount}
                                            </span>
                                        )}
                                    </div>

                                    <p className={`text-xs truncate mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                        {contact.lastMessage}
                                    </p>

                                    {/* Actions rapides */}
                                    <div className={`mt-2 flex items-center justify-center space-x-2 ${chatView === 'grid' ? '' : 'justify-end'
                                        }`}>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            <Phone size={14} className="text-gray-400" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            <Video size={14} className="text-gray-400" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => handleArchive(contact.id, e)}
                                            className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            {contact.isArchived ? (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="text-blue-500 text-xs"
                                                >
                                                    Archivé
                                                </motion.span>
                                            ) : (
                                                <MoreHorizontal size={14} className="text-gray-400" />
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* Modal de chat amélioré */}
                <AnimatePresence>
                    {selectedChat && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
                        >
                            <motion.div
                                className={`w-full max-w-3xl h-[75vh] rounded-xl overflow-hidden shadow-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    }`}
                                layoutId={`chat-${selectedChat}`}
                            >
                                {/* En-tête du chat compact */}
                                <div className={`p-3 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
                                    }`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="relative">
                                                <img
                                                    src={mockContacts.find(c => c.id === selectedChat)?.avatar}
                                                    alt="Contact"
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 
                                                    ${isDarkMode ? 'border-gray-900' : 'border-white'}
                                                    ${mockContacts.find(c => c.id === selectedChat)?.isOnline
                                                        ? 'bg-green-500'
                                                        : 'bg-gray-400'
                                                    }`}
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'
                                                        }`}>
                                                        {mockContacts.find(c => c.id === selectedChat)?.name}
                                                    </h3>
                                                    {mockContacts.find(c => c.id === selectedChat)?.isStarred && (
                                                        <Star size={12} className="text-blue-500" />
                                                    )}
                                                </div>
                                                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                    }`}>
                                                    {mockContacts.find(c => c.id === selectedChat)?.status}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                                                    }`}
                                            >
                                                <Phone size={14} />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                                                    }`}
                                            >
                                                <Video size={14} />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSelectedChat(null)}
                                                className="p-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                                            >
                                                <span className="text-xs">×</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>

                                {/* Zone des messages */}
                                <div className={`flex-1 overflow-y-auto p-4 h-[calc(75vh-8rem)] ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    }`}>
                                    {mockContacts.find(c => c.id === selectedChat)?.messages.map((message, index) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`flex ${message.sent ? 'justify-end' : 'justify-start'} mb-2`}
                                        >
                                            {!message.sent && (
                                                <img
                                                    src={mockContacts.find(c => c.id === selectedChat)?.avatar}
                                                    alt="Avatar"
                                                    className="w-6 h-6 rounded-lg mr-2 self-end"
                                                />
                                            )}
                                            <div className={`max-w-[60%] ${message.sent
                                                ? 'bg-blue-500 text-white rounded-l-lg rounded-tr-lg'
                                                : isDarkMode
                                                    ? 'bg-gray-700 text-white rounded-r-lg rounded-tl-lg'
                                                    : 'bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg'
                                                } p-2 shadow-sm text-sm`}>
                                                <p className="text-xs">{message.text}</p>
                                                {message.hasAttachment && message.attachment && (
                                                    <div className="mt-1">
                                                        {message.attachment.type === 'image' && (
                                                            <div className="relative group">
                                                                <img
                                                                    src={message.attachment.url}
                                                                    alt="Attachment"
                                                                    className="rounded-md max-w-full h-auto cursor-pointer"
                                                                />
                                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-md flex items-center justify-center">
                                                                    <span className="text-white opacity-0 group-hover:opacity-100 text-xs">
                                                                        Voir l'image
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-[10px] opacity-70">{message.time}</span>
                                                    {message.hasReactions && (
                                                        <div className="flex space-x-0.5">
                                                            {message.hasReactions.map((reaction, i) => (
                                                                <motion.span
                                                                    key={i}
                                                                    whileHover={{ scale: 1.2 }}
                                                                    className="text-xs cursor-pointer"
                                                                >
                                                                    {reaction}
                                                                </motion.span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Zone de saisie compacte */}
                                <div className={`p-3 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
                                    }`}>
                                    <div className="flex items-center space-x-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                                                }`}
                                        >
                                            <Plus size={14} />
                                        </motion.button>
                                        <div className={`flex-1 rounded-lg relative ${isDarkMode ? 'bg-gray-700' : 'bg-white'
                                            }`}>
                                            <input
                                                type="text"
                                                value={messageInput}
                                                onChange={(e) => setMessageInput(e.target.value)}
                                                placeholder="Message..."
                                                className={`w-full py-2 px-3 rounded-lg text-xs focus:outline-none ${isDarkMode
                                                    ? 'bg-gray-700 text-white placeholder-gray-400'
                                                    : 'bg-white text-gray-900 placeholder-gray-500'
                                                    }`}
                                            />
                                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-1"
                                                >
                                                    <Image size={14} className="text-gray-400" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-1"
                                                >
                                                    <Smile size={14} className="text-gray-400" />
                                                </motion.button>
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                        >
                                            <Send size={14} />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MessagesList;
