import { Archive, Bookmark, BookOpenText, CalendarRange, House, LibraryBig, MessageSquareReply, Moon, Settings, Shield, Sun, Users } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import logo_sombre from '../../../../public/assets/img/Logo Konnektea Bleu.png';
import logo from '../../../../public/assets/img/Logo Konnektea Blanc.png';
import { useTheme } from '../../../context/ThemeContext';


interface UserProfile {
    nomUtilisateur: string;
    photoProfil: string;
    role: string;
}

const SidebarProfesseur = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [loadingProgress, setLoadingProgress] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const [activeIcon, setActiveIcon] = useState(() => localStorage.getItem('activeIcon') || 'house');
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isExpanded, setIsExpanded] = useState(true);

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

        const handleResize = () => {
            setIsExpanded(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const goToUserProfile = () => {
        navigate('/UserProfile');
    };

    const handleIconClick = (id: string) => {
        setActiveIcon(id);
        localStorage.setItem('activeIcon', id);
    
        // Navigation logic
        switch (id) {

            
            case 'cours':
                navigate('/courseList');
                break;
            
            case 'house':
                navigate('/acceuilAdmin');
                break;

            case 'forums':
                navigate('/forumProfesseur');
                break;

            case 'calendar':
                navigate('/EdtList');
                break;

            case 'feedback':
                navigate('/FeedbackList');
                break;

            case 'shield':
                navigate('/signalementList');
                break;

            case 'bookmark':
                navigate('/FavorisList');
                break;

            case 'archive':
                navigate('/ArchiveList');
                break;

            case 'settings':
                navigate('/ParametreList');
                break;
            // Other navigation cases can be added here
            default:
                break;
        }
    };
    

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`flex flex-col h-screen transition-all duration-300 ease-in-out ${
            isExpanded ? 'w-72' : 'w-20'
        } ${
            isDarkMode 
                ? 'bg-gradient-to-b from-[#2A3A53] to-[#252b53] text-white' 
                : 'bg-gradient-to-b from-white to-gray-100 text-gray-800'
        }`}>
            {/* Toggle button for mobile */}
            <button 
                className="md:hidden absolute top-4 right-4 z-50"
                onClick={toggleSidebar}
            >
                {isExpanded ? '✕' : '☰'}
            </button>

            {/* Logo Header */}
            <div className='flex items-center p-6 mb-6'>
                <img 
                    src={isDarkMode ? logo : logo_sombre} 
                    alt="KONEKTEA Logo" 
                    className="w-10 h-10 object-contain"
                />
                {isExpanded && (
                    <h1 className={`font-black text-2xl ml-2 tracking-wider ${
                        isDarkMode ? 'text-[#F3F5FA]' : 'text-[#2A3A53]'
                    }`}>
                        KONEKTEA <span className="text-[#FFAA00]">.</span>
                    </h1>
                )}
            </div>

            {/* Navigation Menu */}
            <div className="flex-grow space-y-2 px-4">
                {[
                    { icon: House, label: 'Accueil', id: 'house' },
                    { icon: BookOpenText, label: 'Gestion des cours', id: 'cours' },
                    { icon: LibraryBig, label: 'Forums', id: 'forums' },
                    { icon: CalendarRange, label: 'Emploi du temps', id: 'calendar' },
                    { icon: MessageSquareReply, label: 'Feed-back', id: 'feedback' },
                    { icon: Shield, label: 'Signalements', id: 'shield' },
                    { icon: Bookmark, label: 'Favoris', id: 'bookmark' },
                    { icon: Archive, label: 'Archive', id: 'archive' },
                    { icon: Settings, label: 'Paramètres', id: 'settings' },
                ].map(({ icon: Icon, label, id }) => (
                    <div
                        key={id}
                        onClick={() => handleIconClick(id)}
                        className={`flex items-center cursor-pointer p-3 rounded-xl transition-all duration-300 ease-in-out
                            ${activeIcon === id 
                                ? 'bg-[#FFAA00] text-black shadow-lg transform scale-105' 
                                : `hover:bg-${isDarkMode ? 'white/10' : 'gray-200'} hover:translate-x-2`}`}
                    >
                        <Icon 
                            size={18} 
                            className={activeIcon === id 
                                ? 'text-black' 
                                : `${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} 
                        />
                        {isExpanded && (
                            <span className={`ml-4 font-medium text-xs ${
                                activeIcon === id 
                                    ? 'text-black' 
                                    : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                                {label}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* User Profile Section */}
            <div className="mt-auto pt-4 border-t border-white/20 px-4 pb-4">
                <div className={`flex items-center justify-between p-3 rounded-xl ${
                    isDarkMode 
                        ? 'bg-white/5 backdrop-blur-sm' 
                        : 'bg-gray-100'
                }`}>
                    <div className="flex items-center space-x-3">
                        {userProfile && userProfile.photoProfil ? (
                            <img
                                src={`http://localhost:5000/${userProfile.photoProfil}`}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover border-2 border-[#FFAA00] cursor-pointer"
                                onClick={goToUserProfile}
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                                <Users size={20} className="text-white" />
                            </div>
                        )}
                        {isExpanded && (
                            <div>
                                <p className={`text-xs font-medium ${
                                    isDarkMode ? 'text-white' : 'text-gray-800'
                                }`}>
                                    {userProfile?.nomUtilisateur || 'Utilisateur'}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {userProfile?.role || 'role'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full transition-colors ${
                            isDarkMode 
                                ? 'hover:bg-white/10' 
                                : 'hover:bg-gray-200'
                        }`}
                    >
                        {isDarkMode ? (
                            <Sun size={18} className="text-white" />
                        ) : (
                            <Moon size={18} className="text-gray-800" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidebarProfesseur;