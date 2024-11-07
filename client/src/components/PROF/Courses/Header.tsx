import { Plus, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

import { useTheme } from '../../../context/ThemeContext'; // Assurez-vous que le chemin est correct


// Assurez-vous que le chemin est correct


// Assurez-vous que le chemin est correct


// Assurez-vous que le chemin est correct


// Assurez-vous que le chemin est correct
const Header = ({ setIsModalOpen }) => {
  const { isDarkMode } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg p-4 md:p-6 mb-6 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-[#2A3A53] to-[#252b53]' 
          : 'bg-gradient-to-b from-white to-gray-100'
      } shadow-md`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-col mb-4 md:mb-0">
          <h1 className={`text-2xl md:text-2xl font-bold flex items-center gap-4 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            <GraduationCap className="text-[#FFAA00]" size={24} />
            Mes Cours
          </h1>
          <p className={`text-sm font-sans mt-1 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Créez et gérez vos contenus pédagogiques
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg shadow transition-all duration-300 ${
            isDarkMode 
              ? 'bg-[#FFAA00] text-gray-900 hover:bg-[#FFB833]' 
              : 'bg-blue-900 text-white hover:bg-blue-800'
          }`}
        >
          <Plus size={16} />
          Nouveau cours
        </motion.button>
      </div>
    </motion.div>
  );
};
export default Header;