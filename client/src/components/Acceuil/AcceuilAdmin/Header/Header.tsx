import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BellDot, MessageCircleMore, Search, Power, Plus, Menu } from 'lucide-react';
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
}

interface Message {
    id: number;
    sender: string;
    message: string;
    time: string;
    viewed: boolean;
}

const Header = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
    const [isMessagesDropdownOpen, setIsMessagesDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        const mockMessages = [
            { id: 1, sender: 'John Doe', message: 'Salut, comment ça va ?', time: '1m', viewed: false },
            { id: 2, sender: 'Jane Doe', message: 'On se voit demain ?', time: '5m', viewed: true },
        ];
        setMessages(mockMessages);
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/login';
    };

    const toggleNotificationDropdown = () => {
        setIsNotificationDropdownOpen(prev => !prev);
    };

    const toggleMessagesDropdown = () => {
        setIsMessagesDropdownOpen(prev => !prev);
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
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 z-20 w-full ${isDarkMode ? 'bg-gradient-to-r from-[#2A3A53] to-[#252b53] shadow-md text-white' : 'bg-[#FFFFFF] text-[#243063]'}`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <div className="lg:w-1/4 flex items-center space-x-4 lg:-ml-52">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('')}
                            className={`hidden lg:flex items-center px-4 py-2 rounded-lg shadow-sm ${
                                isDarkMode ? 'bg-[#3B4A63] text-white' : 'bg-[#F3F5FA] text-[#243063]'
                            }`}
                        >
                            <Plus className="mr-2" size={20} />
                            <span className="hidden xl:inline">Ajouter une nouvelle publication</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2"
                        >
                            <Menu size={24} />
                        </motion.button>
                    </div>

                    <div className="flex-grow flex justify-start">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative w-full lg:w-2/3"
                        >
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className={`w-full pl-10 pr-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 transition duration-300 ${
                                    isDarkMode ? 'bg-[#435470] text-white' : 'bg-[#F3F5FA] text-[#243063]'
                                }`}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        </motion.div>
                    </div>

                    <div className="lg:w-1/4 flex items-center justify-end space-x-4 lg:space-x-10 relative">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative cursor-pointer"
                            onClick={toggleMessagesDropdown}
                        >
                            <MessageCircleMore className={`${isDarkMode ? 'text-white' : 'text-[#243063]'}`} size={24} />
                            {messages.filter(m => !m.viewed).length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {messages.filter(m => !m.viewed).length}
                                </span>
                            )}
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative cursor-pointer"
                            onClick={toggleNotificationDropdown}
                        >
                            <BellDot className={`${isDarkMode ? 'text-white' : 'text-[#243063]'}`} size={24} />
                            {notifications.filter(n => !n.viewed).length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notifications.filter(n => !n.viewed).length}
                                </span>
                            )}
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className={`p-2 rounded-full shadow-md transition duration-300 ${
                                isDarkMode ? 'bg-[#FFB347] text-white' : 'bg-[#EDB640] text-white'
                            }`}
                        >
                            <Power size={20} />
                        </motion.button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`lg:hidden ${isDarkMode ? 'bg-[#2A3A53]' : 'bg-white'} shadow-md`}
                    >
                        <div className="container mx-auto px-4 py-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('')}
                                className={`w-full flex items-center px-4 py-2 rounded-lg shadow-sm mb-2 ${
                                    isDarkMode ? 'bg-[#3B4A63] text-white' : 'bg-[#F3F5FA] text-[#243063]'
                                }`}
                            >
                                <Plus className="mr-2" size={20} />
                                Ajouter une nouvelle publication
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isNotificationDropdownOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-4 mt-2 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 max-w-[calc(100vw-2rem)] sm:right-80"
                >
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.map(notification => (
                            <motion.div
                                key={notification.id}
                                whileHover={{ backgroundColor: "#f3f4f6" }}
                                className="p-4 border-b cursor-pointer"
                                onClick={() => handleNotificationClick(notification.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <img src={`http://localhost:5000/${notification.creatorPhoto.replace(/\\/g, '/')}`} alt="Creator" className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <p className={`font-medium ${notification.viewed ? 'text-gray-500' : 'font-bold'}`}>
                                            {notification.message}
                                        </p>
                                        <p className="text-sm text-gray-400">{notification.time}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <button onClick={markAllAsRead} className="w-full text-center p-4 text-blue-500 hover:bg-gray-100">
                        Marquer tout comme lu
                    </button>
                </motion.div>
            )}

            {isMessagesDropdownOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-4 mt-2 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 max-w-[calc(100vw-2rem)] sm:right-80"
                >
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-semibold">Messages</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {messages.map(message => (
                            <motion.div
                                key={message.id}
                                whileHover={{ backgroundColor: "#f3f4f6" }}
                                className="p-4 border-b cursor-pointer"
                            >
                                <div className="flex items-center space-x-3">
                                    <img src="http://localhost:5000/images/default-profile.png" alt="Sender" className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <p className={`font-medium ${message.viewed ? 'text-gray-500' : 'font-bold'}`}>
                                            {message.sender}: {message.message}
                                        </p>
                                        <p className="text-sm text-gray-400">{message.time}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <button className="w-full text-center p-4 text-blue-500 hover:bg-gray-100">
                        Voir tous les messages
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Header;