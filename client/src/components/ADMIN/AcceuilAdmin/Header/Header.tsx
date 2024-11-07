import { BellDot, MessageCircleMore, Search, Power, Plus, Menu, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import { useTheme } from '../../../../context/ThemeContext.tsx';


interface UserProfile {
    nom: string;
    prenom: string;
    photoProfil: string;
    nomUtilisateur: string;
    role: string;
}

interface Notification {
    id: number;
    message: string;
    time: string;
    viewed: boolean;
    creatorPhoto: string;
}

interface Message {
    id: number;
    sender: string;
    message: string;
    time: string;
    viewed: boolean;
    avatar: string;
    isOnline?: boolean;
}

const Header = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
    const [isMessagesDropdownOpen, setIsMessagesDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/api/profile', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUserProfile(res.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération du profil :', error);
                }
            }
        };
        fetchUserProfile();
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/api/notif/getNotifications', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const formattedNotifications = res.data.map(notification => ({
                        id: notification.id,
                        message: notification.message,
                        time: new Date(notification.createdAt).toLocaleTimeString(),
                        viewed: notification.isRead,
                        creatorPhoto: notification.creatorPhoto
                    }));
                    setNotifications(formattedNotifications);
                } catch (error) {
                    console.error('Erreur lors de la récupération des notifications :', error);
                }
            }
        };
        fetchNotifications();
    }, []);

    useEffect(() => {
        const mockMessages: Message[] = [
            {
                id: 1,
                sender: "Emma Thompson",
                message: "Pouvez-vous examiner le dernier design que j'ai envoyé ? 🎨",
                time: "À l'instant",
                viewed: false,
                avatar: "https://randomuser.me/api/portraits/women/12.jpg",
                isOnline: true
            },
            {
                id: 2,
                sender: "Lucas Martin",
                message: "La réunion d'équipe est confirmée pour 14h demain 📅",
                time: "5m",
                viewed: false,
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                isOnline: true
            },
            {
                id: 3,
                sender: "Sophie Chen",
                message: "J'ai terminé l'intégration du nouveau module ✨",
                time: "30m",
                viewed: true,
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                isOnline: false
            },
            {
                id: 4,
                sender: "Alexandre Dubois",
                message: "Les retours clients sont très positifs ! 🎉",
                time: "2h",
                viewed: true,
                avatar: "https://randomuser.me/api/portraits/men/55.jpg",
                isOnline: true
            },
            {
                id: 5,
                sender: "Marie Lambert",
                message: "Fichiers du projet mis à jour sur le drive 📁",
                time: "4h",
                viewed: true,
                avatar: "https://randomuser.me/api/portraits/women/67.jpg",
                isOnline: false
            }
        ];
        setMessages(mockMessages);
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/login';
    };

    const toggleNotificationDropdown = () => {
        setIsNotificationDropdownOpen(prev => !prev);
        setIsMessagesDropdownOpen(false);
    };

    const toggleMessagesDropdown = () => {
        setIsMessagesDropdownOpen(prev => !prev);
        setIsNotificationDropdownOpen(false);
    };

    const handleMessageClick = (messageId: number) => {
        navigate(`/MessagesList`);
    };

    const markAllAsRead = async () => {
        try {
            await Promise.all(notifications.map(notification =>
                axios.put(`http://localhost:5000/api/notif/${notification.id}/read`, {}, {
                    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
                })
            ));
            setNotifications(notifications.map(notification => ({ ...notification, viewed: true })));
        } catch (error) {
            console.error('Erreur lors de la mise à jour des notifications :', error);
        }
    };

    const handleNotificationClick = async (notificationId: number) => {
        try {
            await axios.put(`http://localhost:5000/api/notif/${notificationId}/read`, {}, {
                headers: { Authorization: `Bearer ${Cookies.get('token')}` }
            });
            setNotifications(notifications.map(notification =>
                notification.id === notificationId ? { ...notification, viewed: true } : notification
            ));
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la notification :', error);
        }
    };
    return (
        <div className={`fixed top-0 w-full z-50 ${isDarkMode
            ? 'bg-gradient-to-r from-[#233044] to-[#252b53] text-white'
            : 'bg-gradient-to-r from-white to-gray-100 text-gray-800'
            }`}>
            <div className="max-w-7xl mx-auto">
                <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo et bouton mobile */}
                            <div className="flex items-center">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="lg:hidden -ml-2 inline-flex items-center justify-center rounded-md p-2 
                                    ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}"
                                >
                                    <Menu className="h-6 w-6" />
                                </button>
                                <div className="hidden lg:flex items-center space-x-8">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigate('')}
                                        className={`flex items-center px-4 py-2 rounded-md transition-all duration-300
                                        ${isDarkMode
                                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'}`}
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        <span className="text-md">Nouvelle publication</span>
                                    </motion.button>
                                </div>
                            </div>

                            {/* Barre de recherche */}
                            <div className="flex-1 max-w-2xl ml-8">
                                <div className="relative">
                                    <motion.div
                                        animate={{
                                            scale: isSearchFocused ? 1.02 : 1,
                                            boxShadow: isSearchFocused ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
                                        }}
                                        className={`relative rounded-md overflow-hidden
                                        ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Rechercher..."
                                            onFocus={() => setIsSearchFocused(true)}
                                            onBlur={() => setIsSearchFocused(false)}
                                            className={`w-full pl-12 pr-4 py-2 text-sm focus:outline-none
                                            ${isDarkMode
                                                    ? 'bg-gray-900 text-white placeholder-gray-400'
                                                    : 'bg-gray-200 text-gray-900 placeholder-gray-500'}`}
                                        />
                                        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5
                                            ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}
                                        />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Actions de droite */}
                            <div className="flex items-center space-x-6">

                                {/* Notifications */}
                                <div className="relative">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggleNotificationDropdown}
                                        className={`p-2 rounded-full relative
                                    ${isDarkMode
                                                ? 'hover:bg-gray-700 text-gray-300'
                                                : 'hover:bg-gray-100 text-gray-700'}`}
                                    >
                                        <BellDot className="h-6 w-6" />
                                        {notifications.filter(n => !n.viewed).length > 0 && (
                                            <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center
                                            bg-red-500 text-white text-xs font-bold rounded-full">
                                                {notifications.filter(n => !n.viewed).length}
                                            </span>
                                        )}
                                    </motion.button>

                                    <AnimatePresence>
                                        {isNotificationDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className={`absolute right-0 mt-3 w-96 rounded-xl shadow-lg overflow-hidden
                                            ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                                            >
                                                <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                                    <div className="flex justify-between items-center">
                                                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                            Notifications
                                                        </h3>
                                                        <button
                                                            onClick={markAllAsRead}
                                                            className="text-sm text-indigo-600 hover:text-indigo-500"
                                                        >
                                                            Tout marquer comme lu
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="max-h-96 overflow-y-auto">
                                                    {notifications.map((notification) => (
                                                        <motion.div
                                                            key={notification.id}
                                                            whileHover={{ backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' }}
                                                            className={`p-4 cursor-pointer
                                                        ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                                                        ${!notification.viewed && (isDarkMode ? 'bg-gray-700/50' : 'bg-indigo-50/50')}`}
                                                            onClick={() => handleNotificationClick(notification.id)}
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <img
                                                                    src={`http://localhost:5000/${notification.creatorPhoto.replace(/\\/g, '/')}`}
                                                                    alt="Creator"
                                                                    className="w-10 h-10 rounded-full object-cover"
                                                                />
                                                                <div>
                                                                    <p className={`text-sm font-medium
                                                                    ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}
                                                                    ${!notification.viewed && 'font-semibold'}`}>
                                                                        {notification.message}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {notification.time}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                {/* Messages */}
                                <div className="relative">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggleMessagesDropdown}
                                        className={`p-2 rounded-full relative ${isDarkMode
                                            ? 'hover:bg-gray-700 text-gray-300'
                                            : 'hover:bg-gray-100 text-gray-700'}`}
                                    >
                                        <MessageCircleMore className="h-6 w-6" />
                                        {messages.filter(m => !m.viewed).length > 0 && (
                                            <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center
                bg-red-500 text-white text-xs font-bold rounded-full">
                                                {messages.filter(m => !m.viewed).length}
                                            </span>
                                        )}
                                    </motion.button>

                                    <AnimatePresence>
                                        {isMessagesDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                onClick={() => handleMessageClick(messages.id)}
                                                className={`absolute right-0 mt-3 w-96 rounded-xl shadow-lg overflow-hidden
                    ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                                            >
                                                <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                                    <div className="flex justify-between items-center">
                                                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                            Messages
                                                        </h3>
                                                        <span className="text-xs text-blue-500 cursor-pointer hover:text-blue-600">
                                                            Voir tous les messages
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="max-h-96 overflow-y-auto">
                                                    {messages.map((message) => (
                                                        <motion.div
                                                            key={message.id}
                                                            whileHover={{ backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' }}
                                                            className={`p-4 cursor-pointer border-b
                                ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}
                                ${!message.viewed && (isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50/30')}`}
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <div className="relative">
                                                                    <img
                                                                        src={message.avatar}
                                                                        alt={message.sender}
                                                                        className="w-12 h-12 rounded-full object-cover"
                                                                    />
                                                                    {message.isOnline && (
                                                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                                            border-2 border-white rounded-full">
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex justify-between items-baseline">
                                                                        <p className={`font-medium truncate
                                            ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}
                                            ${!message.viewed && 'font-semibold'}`}>
                                                                            {message.sender}
                                                                        </p>
                                                                        <span className={`text-xs flex-shrink-0 ml-2
                                            ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                                            {message.time}
                                                                        </span>
                                                                    </div>
                                                                    <p className={`text-sm truncate mt-1
                                        ${isDarkMode
                                                                            ? message.viewed ? 'text-gray-400' : 'text-gray-300'
                                                                            : message.viewed ? 'text-gray-500' : 'text-gray-700'}`}>
                                                                        {message.message}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Bouton de déconnexion */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleLogout}
                                    className="p-2 rounded-full bg-blue-900 hover:bg-blue-800 text-white"
                                >
                                    <Power className="h-4 w-4" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu mobile */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`lg:hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
                        >
                            <div className="px-4 py-3">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('')}
                                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg
                                ${isDarkMode
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'}`}
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Nouvelle publication
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Header;