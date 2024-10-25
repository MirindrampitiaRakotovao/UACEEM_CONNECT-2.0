import { House, Shield, Users } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Import du hook pour le mode sombre

interface HeaderIconProps {
    simulateProgress: () => void; // Ajout de la prop simulateProgress
}

const HeaderIcon = ({ simulateProgress }: HeaderIconProps) => {
    const navigate = useNavigate();
    const location = useLocation(); // Hook to get the current location
    const { isDarkMode } = useTheme(); // Utilisation du contexte de thème

    // Récupérer l'icône active du localStorage ou définir "house" par défaut
    const [activeIcon, setActiveIcon] = useState(() => localStorage.getItem('activeIcon') || 'house');

    // Gérer le clic sur une icône et stocker l'icône active dans localStorage
    const handleIconClick = (icon: string) => {
        setActiveIcon(icon);
        localStorage.setItem('activeIcon', icon); // Stocker l'icône active dans le localStorage

        simulateProgress(); // Appeler simulateProgress avant de naviguer

        // Rediriger vers la page correspondante en fonction de l'icône cliquée
        switch (icon) {
            case 'house':
                navigate('/acceuilAdmin');
                break;
            case 'users':
                navigate('/userlist');
                break;
            case 'shield':
                navigate('/signalementList');
                break;
            default:
                break;
        }
    };

    // Utilisation de useEffect pour mettre à jour l'icône active en fonction de la route
    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath.includes('acceuilAdmin')) {
            setActiveIcon('house');
        } else if (currentPath.includes('userlist')) {
            setActiveIcon('users');
        } else if (currentPath.includes('signalementList')) {
            setActiveIcon('shield');
        }
    }, [location.pathname]);

    return (
        <div className="flex flex-col items-center">
            <div className={`flex items-center space-x-40 md:space-x-32 sm:space-x-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {/* House Icon */}
                <div
                    onClick={() => handleIconClick('house')}
                    className={`cursor-pointer md:px-10 sm:p-2 md:hover:bg-gray-100 rounded-xl text-center mx-auto 
                        ${activeIcon === 'house' 
                            ? `${isDarkMode ? 'text-blue-300 border-b-2 border-blue-300' : 'text-blue-800 border-b-2 border-blue-800'}` 
                            : `${isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-800'}`}`}
                >
                    <House size={25} />
                </div>

                {/* Users Icon */}
                <div
                    onClick={() => handleIconClick('users')}
                    className={`cursor-pointer md:px-10 sm:p-2 md:hover:bg-gray-100 rounded-xl text-center mx-auto 
                        ${activeIcon === 'users' 
                            ? `${isDarkMode ? 'text-blue-300 border-b-2 border-blue-300' : 'text-blue-800 border-b-2 border-blue-800'}` 
                            : `${isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-800'}`}`}
                >
                    <Users size={25} />
                </div>

                {/* Shield Icon */}
                <div
                    onClick={() => handleIconClick('shield')}
                    className={`cursor-pointer md:px-10 sm:p-2 md:hover:bg-gray-100 rounded-xl text-center mx-auto 
                        ${activeIcon === 'shield' 
                            ? `${isDarkMode ? 'text-blue-300 border-b-2 border-blue-300' : 'text-blue-800 border-b-2 border-blue-800'}` 
                            : `${isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-800'}`}`}
                >
                    <Shield size={25} />
                </div>
            </div>
        </div>
    );
};

export default HeaderIcon;
