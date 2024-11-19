import { BellDot, MessageCircleMore, Search, Power, Plus, Menu, ChevronDown, UserCircle, Settings, HelpCircle, Moon, Sun } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import { useTheme } from '../../../../context/ThemeContext';


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
    type?: 'system' | 'message' | 'update';
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

const Header: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
    const [isMessagesDropdownOpen, setIsMessagesDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const notificationRef = useRef<HTMLDivElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationDropdownOpen(false);
            }
            if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
                setIsMessagesDropdownOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch user profile
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
                    console.error('Profile fetch error:', error);
                }
            }
        };
        fetchUserProfile();
    }, []);

    // Fetch notifications
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
                        creatorPhoto: notification.creatorPhoto,
                        type: notification.type || 'system'
                    }));
                    setNotifications(formattedNotifications);
                } catch (error) {
                    console.error('Notifications fetch error:', error);
                }
            }
        };
        fetchNotifications();
    }, []);

    // Logout handler
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/login';
    };

    // Notification handlers
    const toggleNotificationDropdown = () => {
        setIsNotificationDropdownOpen(prev => !prev);
        setIsMessagesDropdownOpen(false);
        setIsProfileDropdownOpen(false);
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
            console.error('Notifications mark as read error:', error);
        }
    };

    // Search handler
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Render notification icon with color based on type
    const getNotificationIcon = (type: string) => {
        const iconColors = {
            system: 'text-blue-500',
            message: 'text-green-500',
            update: 'text-yellow-500'
        };
        return iconColors[type] || 'text-gray-500';
    };

    return (
        <header className={`fixed top-0 w-full z-50 shadow-sm transition-colors duration-300 
            ${isDarkMode
                ? 'bg-gradient-to-r from-[#233044] to-[#252b53] text-white'
                : 'bg-gradient-to-r from-white to-gray-100 text-gray-800'
            }`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Create New Post */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/create-post')}
                        className={`flex items-center px-3 py-2 rounded-md transition-all
                            ${isDarkMode
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                            }`}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="text-sm">Nouvelle publication</span>
                    </motion.button>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl mx-8">
                        <form onSubmit={handleSearch} className="relative">
                            <motion.div
                                animate={{
                                    scale: isSearchFocused ? 1.02 : 1,
                                    boxShadow: isSearchFocused
                                        ? '0 4px 6px rgba(0, 0, 0, 0.1)'
                                        : 'none'
                                }}
                                className={`rounded-full overflow-hidden transition-all
                                ${isDarkMode
                                        ? 'bg-gray-800 border border-gray-700'
                                        : 'bg-gray-50 border border-gray-200'
                                    }`}
                            >
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                    className={`w-full pl-12 pr-4 py-2 text-sm focus:outline-none rounded-full
                                    ${isDarkMode
                                            ? 'bg-gray-900 text-white placeholder-gray-400'
                                            : 'bg-white text-gray-900 placeholder-gray-500'
                                        }`}
                                />
                                <Search
                                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5
                                    ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                                />
                            </motion.div>
                        </form>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Notification Dropdown */}
                        <div className="relative" ref={notificationRef}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleNotificationDropdown}
                                className={`p-2 rounded-full relative transition
                                ${isDarkMode
                                        ? 'hover:bg-gray-700 text-gray-300'
                                        : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                            >
                                <BellDot className="h-5 w-5" />
                                {notifications.filter(n => !n.viewed).length > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center 
                                    bg-red-500 text-white text-xs font-bold rounded-full">
                                        {notifications.filter(n => !n.viewed).length}
                                    </span>
                                )}
                            </motion.button>

                            {/* Notification Dropdown Content */}
                            <AnimatePresence>
                                {isNotificationDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className={`absolute right-0 mt-3 w-96 rounded-xl shadow-lg 
                                        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                                    >
                                        {/* Dropdown Header */}
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

                                        {/* Notification List */}
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <motion.div
                                                    key={notification.id}
                                                    whileHover={{ backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' }}
                                                    className={`p-4 cursor-pointer ${isDarkMode
                                                        ? 'hover:bg-gray-700'
                                                        : 'hover:bg-gray-50'} 
                                                    ${!notification.viewed && (isDarkMode
                                                            ? 'bg-gray-700/50'
                                                            : 'bg-indigo-50/50')}`}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className="relative">
                                                            <img
                                                                src={`http://localhost:5000/${notification.creatorPhoto.replace(/\\/g, '/')}`}
                                                                alt="Creator"
                                                                className="w-10 h-10 rounded-full object-cover"
                                                            />
                                                            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${getNotificationIcon(notification.type || 'system')}`} />
                                                        </div>
                                                        <div>
                                                            <p className={`text-sm font-medium ${isDarkMode
                                                                ? 'text-gray-200'
                                                                : 'text-gray-900'} 
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

                        {/* Messages Dropdown */}
                        <div className="relative" ref={messagesRef}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    setIsMessagesDropdownOpen(prev => !prev);
                                    setIsNotificationDropdownOpen(false);
                                    setIsProfileDropdownOpen(false);
                                }}
                                className={`p-2 rounded-full relative transition
                                ${isDarkMode
                                        ? 'hover:bg-gray-700 text-gray-300'
                                        : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                            >
                                <MessageCircleMore className="h-5 w-5" />
                                {messages.filter(m => !m.viewed).length > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center 
                                    bg-red-500 text-white text-xs font-bold rounded-full">
                                        {messages.filter(m => !m.viewed).length}
                                    </span>
                                )}
                            </motion.button>

                            {/* Messages Dropdown Content */}
                            <AnimatePresence>
                                {isMessagesDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className={`absolute right-0 mt-3 w-96 rounded-xl shadow-lg 
                                        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                                    >
                                        {/* Dropdown Header */}
                                        <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                            <div className="flex justify-between items-center">
                                                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    Messages
                                                </h3>
                                                <span
                                                    onClick={() => navigate('/messages')}
                                                    className="text-xs text-blue-500 cursor-pointer hover:text-blue-600"
                                                >
                                                    Voir tous les messages
                                                </span>
                                            </div>
                                        </div>

                                        {/* Messages List */}
                                        <div className="max-h-96 overflow-y-auto">
                                            {messages.map((message) => (
                                                <motion.div
                                                    key={message.id}
                                                    whileHover={{ backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' }}
                                                    onClick={() => navigate(`/messages/${message.id}`)}
                                                    className={`p-4 cursor-pointer border-b transition
                                                    ${isDarkMode
                                                            ? 'border-gray-700 hover:bg-gray-700'
                                                            : 'border-gray-100 hover:bg-gray-50'} 
                                                    ${!message.viewed && (isDarkMode
                                                            ? 'bg-gray-700/50'
                                                            : 'bg-blue-50/30')}`}
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
                                                                border-2 border-white rounded-full" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-baseline">
                                                                <p className={`font-medium truncate ${isDarkMode
                                                                    ? 'text-gray-200'
                                                                    : 'text-gray-900'} 
                                                                    ${!message.viewed && 'font-semibold'}`}>
                                                                    {message.sender}
                                                                </p>
                                                                <span className={`text-xs flex-shrink-0 ml-2 ${isDarkMode
                                                                    ? 'text-gray-400'
                                                                    : 'text-gray-500'}`}>
                                                                    {message.time}
                                                                </span>
                                                            </div>
                                                            <p className={`text-sm truncate mt-1 ${isDarkMode
                                                                ? message.viewed
                                                                    ? 'text-gray-400'
                                                                    : 'text-gray-300'
                                                                : message.viewed
                                                                    ? 'text-gray-500'
                                                                    : 'text-gray-700'}`}>
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

                        {/* Profile Dropdown */}
                        <div className={` ${isDarkMode ? '' : ''}`}>
                            <motion.button
                                whileHover={{ backgroundColor: isDarkMode ? '#B91C1C' : '#FEE2E2' }}
                                onClick={handleLogout}
                                className={` flex items-center px-4 py-2 text-sm transition 
                                                    ${isDarkMode
                                        ? 'text-red-400'
                                        : 'text-red-600'}`}
                            >
                                <Power className="h-4 w-4 mr-3" />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`lg:hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}
                        >
                            <div className="px-4 py-3 space-y-2">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/create-post')}
                                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition
                                    ${isDarkMode
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'}`}
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Nouvelle publication
                                </motion.button>

                                {/* Additional mobile menu items */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/messages')}
                                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition
                                    ${isDarkMode
                                            ? 'hover:bg-gray-700 text-gray-300'
                                            : 'hover:bg-gray-100 text-gray-700'}`}
                                >
                                    <MessageCircleMore className="w-5 h-5 mr-2" />
                                    Messages
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => navigate('/notifications')}
                                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition
                                    ${isDarkMode
                                            ? 'hover:bg-gray-700 text-gray-300'
                                            : 'hover:bg-gray-100 text-gray-700'}`}
                                >
                                    <BellDot className="w-5 h-5 mr-2" />
                                    Notifications
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;