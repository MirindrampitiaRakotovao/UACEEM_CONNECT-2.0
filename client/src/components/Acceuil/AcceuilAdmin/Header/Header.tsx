import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Logo_ACEEM from '../../../../../public/assets/img/Logo ACEEM.png';
import { BellDot, MessageCircleMore, Search, Sun, Moon, LogOut } from 'lucide-react';
import HeaderIcon from '../../../HeaderIcon';
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
    viewed: boolean; // Changer 'viewed' en 'isRead' si nécessaire
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
    const [isMessagesDropdownOpen, setIsMessagesDropdownOpen] = useState(false); // Pour gérer l'ouverture du dropdown des messages
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/api/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUserProfile(res.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération du profil :', error);
                }
            }
        };
        fetchUserProfile();
    }, []);

    // Récupérer les notifications depuis l'API
    useEffect(() => {
        const fetchNotifications = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/api/notif/getNotifications', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    // Convertir le format de l'heure si nécessaire
                    const formattedNotifications = res.data.map(notification => ({
                        id: notification.id,
                        message: notification.message,
                        time: new Date(notification.createdAt).toLocaleTimeString(), // Ajustez le format selon vos besoins
                        viewed: notification.isRead,
                        creatorPhoto: notification.creatorPhoto // Ajout de creatorPhoto
                    }));
                    setNotifications(formattedNotifications);
                } catch (error) {
                    console.error('Erreur lors de la récupération des notifications :', error);
                }
            }
        };
        fetchNotifications();
    }, []);


    // Simule la récupération des messages (vous pouvez remplacer cela par une vraie API)
    useEffect(() => {
        const mockMessages = [
            { id: 1, sender: 'John Doe', message: 'Salut, comment ça va ?', time: '1m', viewed: false },
            { id: 2, sender: 'Jane Doe', message: 'On se voit demain ?', time: '5m', viewed: true },
        ];
        setMessages(mockMessages);
    }, []);

    const simulateProgress = () => {
        setLoadingProgress(20);
        setTimeout(() => setLoadingProgress(50), 500);
        setTimeout(() => setLoadingProgress(70), 1000);
        setTimeout(() => setLoadingProgress(100), 1500);
        setTimeout(() => setLoadingProgress(0), 2000);
    };

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.href = '/';
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.dropdown')) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', closeDropdown);
        return () => {
            document.removeEventListener('mousedown', closeDropdown);
        };
    }, []);

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
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                })
            ));
            setNotifications(notifications.map(notification => ({ ...notification, viewed: true })));
        } catch (error) {
            console.error('Erreur lors de la mise à jour des notifications :', error);
        }
    };

    const handleNotificationClick = async (notificationId: number) => {
        try {
            // Marquer la notification comme lue via l'API
            await axios.put(`http://localhost:5000/api/notif/${notificationId}/read`, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });
            // Mettre à jour l'état local
            setNotifications(notifications.map(notification =>
                notification.id === notificationId ? { ...notification, viewed: true } : notification
            ));
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la notification :', error);
        }
    };

    const goToUserProfile = () => {
        simulateProgress();
        navigate('/UserProfile');
    };

    useEffect(() => {
        const closeDropdown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.dropdown') && !target.closest('.notification-dropdown') && !target.closest('.message-dropdown')) {
                setIsDropdownOpen(false);
                setIsNotificationDropdownOpen(false);
                setIsMessagesDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', closeDropdown);
        return () => {
            document.removeEventListener('mousedown', closeDropdown);
        };
    }, []);

    return (
        <div className={`bg-white sticky top-0 flex items-center justify-between p-2 lg:px-5 shadow-md z-20 ${isDarkMode ? 'dark:bg-gray-900' : ''}`}>
            {/* Logo et Titre */}
            <div className="flex w-[30%] items-center">
                <img src={Logo_ACEEM} alt="Logo ACEEM" width={70} />
                <h1 className={`text-xl font-bold ml-3 md:inline-flex sm:hidden ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>UACEEM-CONNECT</h1>
            </div>

            {/* HeaderIcon au centre */}
            <div className="flex w-[30%] justify-center flex-grow">
                <HeaderIcon simulateProgress={simulateProgress} />
            </div>

            {/* Recherche et icônes de droite */}
            <div className="flex w-[30%] items-center justify-end">
                <div className={`flex items-center ml-2 p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <Search size={20} className={`text-gray-700 ${isDarkMode ? 'text-white' : ''}`} />
                    <input
                        type="text"
                        placeholder="Rechercher ..."
                        className={`hidden md:inline-flex bg-transparent ml-2 items-center outline-none flex-shrink ${isDarkMode ? 'text-white' : 'text-gray-700'}`}
                    />
                </div>

                <div className="flex space-x-5 ml-10">
                    {/* Icône Messages */}
                    <div className="relative message-dropdown">
                        <div className={`p-2 rounded-full cursor-pointer ${isDarkMode ? 'bg-gray-700' : ''}`} onClick={toggleMessagesDropdown}>
                            <MessageCircleMore size={25} className={`icones ${isDarkMode ? 'text-blue-900' : 'text-gray-700'}`} />

                            {/* Pastille pour le nombre de messages non lus */}
                            {messages.filter(message => !message.viewed).length > 0 && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                                    {messages.filter(message => !message.viewed).length}
                                </div>
                            )}
                        </div>

                        {/* Dropdown des messages */}
                        {isMessagesDropdownOpen && (
                            <div className={`absolute right-0 mt-2 w-80 shadow-lg rounded-lg py-2 z-50 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-black'}`}>
                                <div className="flex justify-between px-4 py-2">
                                    <h3 className="font-semibold">Messages</h3>
                                    <span className="text-sm text-gray-400">{messages.length} messages</span>
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                    {messages.map(message => (
                                        <div key={message.id} className={`px-4 py-2 ${message.viewed ? 'bg-gray-200' : 'bg-gray-300'} rounded-lg cursor-pointer`}>
                                            <strong>{message.sender}</strong>: {message.message}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Icône Notifications */}
                    <div className="relative notification-dropdown">
                        <div className={`p-2 rounded-full cursor-pointer ${isDarkMode ? 'bg-gray-700' : ''}`} onClick={toggleNotificationDropdown}>
                            <BellDot size={25} className={`icones ${isDarkMode ? 'text-blue-900' : 'text-gray-700'}`} />

                            {/* Pastille pour le nombre de notifications non lues */}
                            {notifications.filter(notification => !notification.viewed).length > 0 && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                                    {notifications.filter(notification => !notification.viewed).length}
                                </div>
                            )}
                        </div>

                        {/* Dropdown des notifications */}
                        {isNotificationDropdownOpen && (
                            <div className={`absolute right-0 mt-5 w-96 shadow-lg py-2 z-50 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-black'}`}>
                                <div className="flex justify-between px-6 py-4">
                                    <h3 className="font-semibold">Notifications</h3>
                                    <span className="text-sm text-gray-400">{notifications.length} notifications</span>
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="px-6 py-2 text-center text-gray-400">Aucune notification</div>
                                    ) : (
                                        notifications.map(notification => {
                                            // Construire l'URL complète pour la photo de profil
                                            const baseURL = 'http://localhost:5000/'; // Remplacez par l'URL de votre serveur
                                            const creatorPhotoURL = `${baseURL}${notification.creatorPhoto.replace(/\\/g, '/')}`;

                                            // Logger l'URL de la photo de profil pour vérification
                                            console.log(creatorPhotoURL);

                                            return (
                                                <div
                                                    key={notification.id}
                                                    className={`flex items-center px-6 py-4 my-2 ${notification.viewed
                                                        ? '' // Pas de background pour les notifications lues
                                                        : (isDarkMode ? 'bg-gray-700 bg-opacity-70 text-white' : 'bg-gray-200 text-black')}`} // Notifications non lues avec fond transparent
                                                    onClick={() => handleNotificationClick(notification.id)}
                                                >
                                                    {/* Afficher la photo de profil du créateur */}
                                                    <img
                                                        src={creatorPhotoURL}
                                                        alt="Creator"
                                                        className="w-12 h-12 rounded-full mr-4 object-cover" // Augmentation de la taille de la photo
                                                        style={{ aspectRatio: '1 / 1' }} // Assurer un aspect ratio
                                                    />
                                                    <div className="flex-1">
                                                        {notification.message}
                                                        <span className="text-xs ml-2">{notification.time}</span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                                <div className="px-6 py-4">
                                    <button onClick={markAllAsRead} className="text-blue-500 hover:underline">Marquer tout comme lu</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profil et menu déroulant */}
                    <div className="relative ml-10 flex sm:space-x-2 justify-end dropdown">
                        <div onClick={toggleDropdown} className="cursor-pointer">
                            {userProfile && userProfile.photoProfil ? (
                                <img
                                    src={`http://localhost:5000/${userProfile.photoProfil}`}
                                    alt="Photo de profil"
                                    className="w-12 h-12 rounded-full object-cover mt-1"
                                />
                            ) : (
                                <img
                                    src="default-profile.png"
                                    alt="Default Profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            )}
                        </div>

                        {isDropdownOpen && (
                            <div className={`absolute right-0 mt-20 w-64 shadow-lg rounded-lg py-2 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-black'}`}>
                                {/* Profil utilisateur */}
                                <div className={`flex items-center px-4 py-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} cursor-pointer`} onClick={goToUserProfile}>
                                    {userProfile && userProfile.photoProfil ? (
                                        <img
                                            src={`http://localhost:5000/${userProfile.photoProfil}`}
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full object-cover mr-3"
                                        />
                                    ) : (
                                        <img
                                            src="default-profile.png"
                                            alt="Default Profile"
                                            className="w-10 h-10 rounded-full object-cover mr-3"
                                        />
                                    )}
                                    <div>
                                        <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                                            {userProfile ? `${userProfile.nom} ${userProfile.prenom}` : 'Utilisateur'}
                                        </p>
                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {userProfile?.nomUtilisateur}
                                        </p>
                                    </div>
                                </div>

                                {/* Switch Thème + Texte */}
                                <div className="flex items-center ml-3 mt-3">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            id="toggleDarkMode"
                                            className="hidden"
                                            checked={isDarkMode}
                                            onChange={toggleDarkMode}
                                        />
                                        <label htmlFor="toggleDarkMode" className="flex items-center cursor-pointer">
                                            <div className="relative">
                                                <span className="block w-14 h-8 bg-gray-300 rounded-full shadow-inner dark:bg-gray-600"></span>
                                                <span className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ${isDarkMode ? 'translate-x-6 bg-gray-900' : 'bg-yellow-500'}`}>
                                                    {isDarkMode ? (
                                                        <Moon className="text-white p-1" />
                                                    ) : (
                                                        <Sun className="text-white p-1" />
                                                    )}
                                                </span>
                                            </div>
                                        </label>
                                    </div>

                                    <span className={`ml-4 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                                        {isDarkMode ? 'Mode sombre' : 'Mode clair'}
                                    </span>
                                </div>

                                {/* Bouton de déconnexion */}
                                <button
                                    onClick={handleLogout}
                                    className={`flex items-center w-full text-left px-4 py-2 ${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`}
                                >
                                    <LogOut className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
                                    Déconnexion
                                </button>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>

    );
};

export default Header;
