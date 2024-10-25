import React from 'react';
import { Home, Settings, User, Bell } from 'lucide-react'; // Assurez-vous d'importer vos icônes

const SidebareRowIcon = ({ isDarkMode }) => {
    return (
        <div className="flex flex-col space-y-2 mt-4">
            <div className={`flex items-center p-2 rounded-lg hover:bg-gray-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                <Home className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
                <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Accueil</span>
            </div>
            <div className={`flex items-center p-2 rounded-lg hover:bg-gray-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                <User className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
                <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Profil</span>
            </div>
            <div className={`flex items-center p-2 rounded-lg hover:bg-gray-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                <Settings className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
                <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Réglages</span>
            </div>
            <div className={`flex items-center p-2 rounded-lg hover:bg-gray-300 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                <Bell className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
                <span className={`ml-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Notifications</span>
            </div>
        </div>
    );
};

export default SidebareRowIcon;
