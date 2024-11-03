import React, { useState, useEffect } from 'react';
import ModalFeedBack from './ModalFeedBack';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackItem {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  position: string;
  category: 'administration' | 'education';
}

const FeedbackList = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'administration' | 'education'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setFeedbacks([
        {
          id: 1,
          name: "Sophie Martin",
          position: "Étudiante en Master",
          rating: 4,
          date: "15 Nov 2023",
          comment: "L'administration pourrait améliorer la communication concernant les échéances importantes.",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          category: 'administration'
        },
        {
          id: 2,
          name: "Thomas Bernard",
          position: "Étudiant en Licence",
          rating: 5,
          date: "14 Nov 2023",
          comment: "Les professeurs sont très compétents et disponibles pour les étudiants.",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          category: 'education'
        },
        {
          id: 3,
          name: "Julie Dubois",
          position: "Étudiante en Doctorat",
          rating: 4,
          date: "13 Nov 2023",
          comment: "Excellente qualité d'enseignement, mais les ressources en ligne pourraient être améliorées.",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
          category: 'education'
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const SkeletonFeedback = () => (
    <div className={`animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
      rounded-lg shadow-xl p-6 mb-6 w-full`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="h-16 w-16 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
        <div className="flex-1 space-y-2 w-full sm:w-auto">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
      </div>
    </div>
  );

  const FeedbackCard = ({ feedback }: { feedback: FeedbackItem }) => (
    <motion.div
      layout
      whileHover={{ y: -5 }}
      onClick={() => setSelectedFeedback(feedback)}
      className={`cursor-pointer ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
        rounded-lg overflow-hidden shadow-xl transition-all duration-300 w-full`}
    >
      <div className={`h-2 w-full ${
        feedback.category === 'administration' ? 'bg-blue-500' : 'bg-green-500'
      }`}></div>
      
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <img
              src={feedback.avatar}
              alt={feedback.name}
              className="w-16 h-16 rounded-lg object-cover shadow-md"
            />
            <div>
              <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {feedback.name}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {feedback.position}
              </p>
            </div>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            feedback.category === 'administration'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {feedback.category === 'administration' ? 'Administration' : 'Enseignement'}
          </span>
        </div>

        <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {feedback.comment}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.292z" />
              </svg>
            ))}
          </div>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {feedback.date}
          </span>
        </div>
      </div>
    </motion.div>
  );

  const FeedbackDetail = ({ feedback }: { feedback: FeedbackItem }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl w-full`}
    >
      <div className="relative h-48">
        <div className={`absolute inset-0 ${
          feedback.category === 'administration' ? 'bg-blue-500' : 'bg-green-500'
        } rounded-t-lg opacity-90`}></div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFeedback(null);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 
            text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <img
              src={feedback.avatar}
              alt={feedback.name}
              className="w-32 h-32 rounded-lg object-cover border-4 border-white dark:border-gray-800 shadow-xl"
            />
            <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-sm font-bold
              shadow-lg ${feedback.category === 'administration' 
                ? 'bg-blue-500 text-white' 
                : 'bg-green-500 text-white'}`}
            >
              {feedback.rating}/5
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 px-4 sm:px-6 pb-6">
        <div className="text-center mb-8">
          <h2 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {feedback.name}
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {feedback.position}
          </p>
        </div>

        <div className={`p-4 sm:p-6 rounded-lg mb-6 ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Commentaire
          </h3>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {feedback.comment}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Catégorie
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              feedback.category === 'administration'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {feedback.category === 'administration' ? 'Administration' : 'Enseignement'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Date
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
            }`}>
              {feedback.date}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen w-full ${isDarkMode 
      ? 'bg-gray-900' 
      : 'bg-gray-100'}`}
    >
      <div className="max-w-[1920px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
          <div className="mb-4 lg:mb-0">
              <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Retours d'Expérience
              </h1>
              <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Découvrez les avis de notre communauté universitaire
              </p>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white
                bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 
                hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Partager mon expérience
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8">
            {['all', 'administration', 'education'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as typeof activeCategory)}
                className={`px-3 sm:px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeCategory === category
                    ? isDarkMode 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  } flex-1 sm:flex-none text-center`}
              >
                {category === 'all' ? 'Tous' : category === 'administration' ? 'Administration' : 'Enseignement'}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <motion.div 
            layout
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
              selectedFeedback ? 'w-full lg:w-2/3' : 'w-full'
            }`}
          >
            {loading ? (
              [...Array(3)].map((_, index) => <SkeletonFeedback key={index} />)
            ) : (
              feedbacks
                .filter(feedback => activeCategory === 'all' || feedback.category === activeCategory)
                .map((feedback) => (
                  <FeedbackCard key={feedback.id} feedback={feedback} />
                ))
            )}
          </motion.div>

          <AnimatePresence>
            {selectedFeedback && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="lg:sticky lg:top-0 h-auto lg:h-screen pt-6 lg:pt-12 lg:w-1/3"
              >
                <FeedbackDetail feedback={selectedFeedback} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ModalFeedBack 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default FeedbackList;