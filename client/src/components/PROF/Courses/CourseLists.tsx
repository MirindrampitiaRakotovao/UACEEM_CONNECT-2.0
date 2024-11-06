import { FaPlus, FaSearch, FaFilter, FaTimes, FaDollarSign, FaBookOpen, FaChalkboardTeacher, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

import { useTheme } from '../../../context/ThemeContext';


const SkeletonCard = ({ isDarkMode }) => (
  <div className={`rounded-xl p-4 shadow animate-pulse ${isDarkMode ? 'bg-[#2A3A53]' : 'bg-white'}`}>
    <div className={`h-32 rounded-lg mb-4 ${isDarkMode ? 'bg-[#252b53]' : 'bg-gray-200'}`}></div>
    <div className={`h-4 rounded w-3/4 mb-2 ${isDarkMode ? 'bg-[#252b53]' : 'bg-gray-200'}`}></div>
    <div className={`h-3 rounded w-1/2 mb-4 ${isDarkMode ? 'bg-[#252b53]' : 'bg-gray-200'}`}></div>
    <div className="flex justify-between mb-4">
      <div className={`h-3 rounded w-1/4 ${isDarkMode ? 'bg-[#252b53]' : 'bg-gray-200'}`}></div>
      <div className={`h-3 rounded w-1/4 ${isDarkMode ? 'bg-[#252b53]' : 'bg-gray-200'}`}></div>
    </div>
    <div className="flex gap-2">
      <div className={`h-8 rounded flex-1 ${isDarkMode ? 'bg-[#252b53]' : 'bg-gray-200'}`}></div>
      <div className={`h-8 rounded flex-1 ${isDarkMode ? 'bg-[#252b53]' : 'bg-gray-200'}`}></div>
    </div>
  </div>
);

const CourseLists = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useTheme();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const courses = [
    {
      id: 1,
      title: "Introduction à React",
      instructor: "Jean Dupont",
      level: "Débutant",
      rating: 4.8,
      enrolled: 1234,
      price: 49.99
    },
    {
      id: 2,
      title: "JavaScript Avancé",
      instructor: "Marie Martin",
      level: "Intermédiaire", 
      rating: 4.5,
      enrolled: 856,
      price: 69.99
    },
    {
      id: 3,
      title: "Node.js pour Débutants",
      instructor: "Pierre Paul",
      level: "Débutant",
      rating: 4.7,
      enrolled: 2341,
      price: 39.99
    },
    {
      id: 4,
      title: "TypeScript Fondamentaux",
      instructor: "Sarah Johnson",
      level: "Débutant",
      rating: 4.6,
      enrolled: 1567,
      price: 54.99
    },
    {
      id: 5,
      title: "Vue.js Masterclass",
      instructor: "David Chen",
      level: "Avancé",
      rating: 4.9,
      enrolled: 987,
      price: 79.99
    },
    {
      id: 6,
      title: "GraphQL & Apollo",
      instructor: "Emma Wilson",
      level: "Intermédiaire",
      rating: 4.4,
      enrolled: 654,
      price: 59.99
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? ' text-white' : ' text-gray-800'}`}>
      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-4 sm:p-6 mb-6 shadow-lg ${
              isDarkMode ? 'bg-[#2A3A53] text-white' : 'bg-white text-[#2A3A53]'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">Mes Cours</h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Créez et gérez vos contenus pédagogiques</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg shadow hover:shadow-md transition-all duration-300 ${
                  isDarkMode ? 'bg-[#FFAA00] text-black' : 'bg-[#2A3A53] text-white'
                }`}
              >
                <FaPlus size={12} />
                Nouveau cours
              </motion.button>
            </div>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex gap-3 mb-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative flex-1"
            >
              <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={12} />
              <input
                type="text"
                placeholder="Rechercher un cours..."
                className={`w-full pl-8 pr-3 py-2 text-sm rounded-lg border-0 focus:ring-2 focus:ring-[#FFAA00] transition-all duration-200 ${
                  isDarkMode ? 'bg-[#2A3A53] text-white' : 'bg-white text-gray-900'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg shadow hover:shadow-md transition-all duration-300 ${
                isDarkMode ? 'bg-[#2A3A53] text-white' : 'bg-white text-gray-700'
              }`}
            >
              <FaFilter className="text-[#FFAA00]" size={12} />
              <span>Filtres</span>
            </motion.button>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              [...Array(6)].map((_, index) => <SkeletonCard key={index} isDarkMode={isDarkMode} />)
            ) : (
              courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className={`group rounded-xl overflow-hidden shadow hover:shadow-md transition-all duration-300 ${
                    isDarkMode ? 'bg-[#2A3A53]' : 'bg-white'
                  }`}
                >
                  <div className="relative h-36">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2A3A53] to-[#252b53] group-hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FaBookOpen className="text-[#FFAA00] text-3xl opacity-20" />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-1 bg-[#FFAA00] text-black rounded-full text-xs">
                      {course.level}
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className={`text-base font-bold mb-2 group-hover:text-[#FFAA00] transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {course.title}
                    </h2>
                    <div className="flex items-center gap-1 mb-3 text-sm">
                      <FaChalkboardTeacher className="text-[#FFAA00]" size={12} />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{course.instructor}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1 text-sm">
                        <FaStar className="text-[#FFAA00]" size={12} />
                        <span className="font-semibold">{course.rating.toFixed(1)}</span>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>({course.enrolled})</span>
                      </div>
                      <span className="text-lg font-bold text-[#FFAA00]">${course.price}</span>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-[#FFAA00] text-black text-sm py-2 rounded-lg hover:shadow transition-all duration-300"
                      >
                        Éditer
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 text-sm py-2 rounded-lg transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-[#252b53] text-white hover:bg-[#2A3A53]' 
                            : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Aperçu
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`w-full max-w-lg rounded-xl shadow-2xl ${isDarkMode ? 'bg-[#2A3A53]' : 'bg-white'}`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Créer un nouveau cours</h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsModalOpen(false)}
                      className={isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}
                    >
                      <FaTimes size={14} />
                    </motion.button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className={`text-xs font-medium block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Titre du cours
                      </label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 text-sm rounded-lg border-0 focus:ring-2 focus:ring-[#FFAA00] transition-all duration-200 ${
                          isDarkMode ? 'bg-[#252b53] text-white' : 'bg-gray-50 text-gray-900'
                        }`}
                        placeholder="Entrez le titre du cours"
                      />
                    </div>
                    <div>
                      <label className={`text-xs font-medium block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Description
                      </label>
                      <textarea
                        className={`w-full px-3 py-2 text-sm rounded-lg border-0 focus:ring-2 focus:ring-[#FFAA00] transition-all duration-200 ${
                          isDarkMode ? 'bg-[#252b53] text-white' : 'bg-gray-50 text-gray-900'
                        }`}
                        rows="3"
                        placeholder="Décrivez votre cours"
                      ></textarea>
                    </div>
                    <div>
                      <label className={`text-xs font-medium block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Prix
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaDollarSign size={12} />
                        </span>
                        <input
                          type="number"
                          className={`w-full pl-8 pr-3 py-2 text-sm rounded-lg border-0 focus:ring-2 focus:ring-[#FFAA00] transition-all duration-200 ${
                            isDarkMode ? 'bg-[#252b53] text-white' : 'bg-gray-50 text-gray-900'
                          }`}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-[#FFAA00] text-black rounded-lg hover:bg-[#FFB52E] transition-colors"
                    >
                      Créer le cours
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

export default CourseLists;