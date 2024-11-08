import { ChevronRight, Check, Mail, Clock, Star, Sun, Moon, MessageSquare, Archive, Inbox, Menu, Search, Bell, Users, Paperclip, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { useTheme } from '../../context/ThemeContext';


interface Message {
    id: number;
    sender: string;
    preview: string;
    timestamp: string;
    avatar: string;
    unread?: boolean;
}
const MessageList: React.FC = () => {
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const messages: Message[] = [
        {
          id: 1,
          sender: 'John Anderson',
          preview: 'Hey, I\'ve reviewed the project proposal you sent. Let\'s discuss the details tomorrow.',
          timestamp: '2h ago',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          unread: true,
        },
        {
          id: 2,
          sender: 'Jane Smith',
          preview: 'Let\'s catch up this weekend. It’s been a while!',
          timestamp: '1d ago',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        {
          id: 3,
          sender: 'Alice Johnson',
          preview: 'I sent you the documents you requested. Please check your email.',
          timestamp: '3d ago',
          avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
          unread: true,
        },
        {
          id: 4,
          sender: 'Michael Brown',
          preview: 'Are we still on for the meeting next week?',
          timestamp: '5d ago',
          avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        },
        {
          id: 5,
          sender: 'Chris Evans',
          preview: 'Just wanted to share this article with you. It might interest you.',
          timestamp: '1w ago',
          avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        },
        {
          id: 6,
          sender: 'Emma Watson',
          preview: 'I loved the movie we watched last night! We should do it again.',
          timestamp: '1w ago',
          avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
          unread: true,
        },
        {
          id: 7,
          sender: 'Sophia Turner',
          preview: 'Can you send me the latest updates on the project?',
          timestamp: '2w ago',
          avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
        },
        {
          id: 8,
          sender: 'Robert Downey',
          preview: 'Don’t forget about the deadline next Friday!',
          timestamp: '2w ago',
          avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
        },
        {
          id: 9,
          sender: 'Natalie Portman',
          preview: 'I’ll be in town next month. Let’s meet up!',
          timestamp: '3w ago',
          avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
        },
        {
          id: 10,
          sender: 'Tom Holland',
          preview: 'Can you help me with the presentation for tomorrow?',
          timestamp: '3w ago',
          avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
          unread: true,
        },
      ];
      
    const statsData = [
        {
            label: 'Messages',
            value: '24',
            icon: Mail,
            color: 'bg-blue-500',
            bgColor: 'bg-blue-50'
        },
        {
            label: 'Non lus',
            value: '3',
            icon: Bell,
            color: 'bg-red-500',
            bgColor: 'bg-red-50'
        },
        {
            label: 'Contacts',
            value: '42',
            icon: Users,
            color: 'bg-green-500',
            bgColor: 'bg-green-50'
        },
        {
            label: 'Pièces',
            value: '12',
            icon: Paperclip,
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50'
        },
    ];
    const filteredMessages = messages.filter(message =>
        message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleMessageClick = (message: Message) => {
        navigate(`/MessagesView/${message.id}`, { 
            state: { 
                message: message 
            } 
        });
    };
    return (
        <div className={`min-h-screen p-3 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} md:p-6 lg:p-8`}>
            {/* Mobile Header */}
            <div className="md:hidden mb-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-bold">Messages</h1>
                </div>
                <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-500' : 'bg-gray-100 text-gray-600'}`}
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
            {/* Search Bar */}
            <div className="mb-4 relative">
                <input
                    type="text"
                    placeholder="Rechercher des messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-white text-gray-800 placeholder-gray-400'} shadow-sm focus:ring-2 focus:ring-blue-500 outline-none`}
                />
                <Search className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            {/* Contenu principal */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Statistiques (visible sur md et plus) */}
                <div className="hidden md:flex flex-col gap-4 h-fit">
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, translateX: -20 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1
                            }}
                            className={`
                                rounded-xl p-3 flex items-center 
                                ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
                                shadow-md hover:shadow-lg 
                                transition-all duration-300 
                                space-x-3
                            `}
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className={`
                                p-2 rounded-lg 
                                ${isDarkMode ? 'bg-gray-700' : stat.bgColor}
                            `}>
                                <stat.icon className={`
                                    w-4 h-4 
                                    ${stat.color.replace('bg-', 'text-')}
                                `} />
                            </div>
                            <div className="flex-grow">
                                <p className={`
                                    text-xs font-medium mb-0.5
                                    ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                                `}>
                                    {stat.label}
                                </p>
                                <p className={`
                                    text-base font-bold
                                    ${isDarkMode ? 'text-white' : 'text-gray-800'}
                                `}>
                                    {stat.value}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* Liste des messages */}
                <div className="md:col-span-2">
                    <div className={`rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                        {filteredMessages.map((message, index) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, translateY: 10 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                onClick={() => handleMessageClick(message)}
                                className={`
                                    flex items-center p-3 border-b 
                                    ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' 
                                        : 'border-gray-100 hover:bg-gray-50'
                                        } 
                                        cursor-pointer 
                                        ${message.unread ? 'bg-blue-50/30' : ''}
                                    `}
                                >
                                    {/* Avatar */}
                                    <div className="relative mr-3">
                                        <div className={`w-8 h-8 rounded-full ring-1 ${message.unread ? 'ring-blue-400/50 animate-pulse' : `${isDarkMode ? 'ring-gray-700' : 'ring-gray-200'}`}`}>
                                            <img src={message.avatar} alt={message.sender} className="w-full h-full object-cover rounded-full" />
                                        </div>
                                        {message.unread && (
                                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-3 h-3 flex items-center justify-center">
                                                <Check className="w-2 h-2" />
                                            </div>
                                        )}
                                    </div>
                                    {/* Contenu du message */}
                                    <div className="flex-grow overflow-hidden">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className={`text-xs font-medium truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                                {message.sender}
                                            </h3>
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <Clock className="w-3 h-3" />
                                                <span className="text-xs">{message.timestamp}</span>
                                            </div>
                                        </div>
                                        <p className={`
                                            text-xs truncate 
                                            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                                        `}>
                                            {message.preview}
                                        </p>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 ml-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    export default MessageList;