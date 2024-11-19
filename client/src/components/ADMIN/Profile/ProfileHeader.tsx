import React, { useEffect, useState } from 'react';
import { Camera, Edit, UserPlus, Mail, Link as LinkIcon, Share2, Bell, MapPin, Calendar, Briefcase } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext.tsx';
import axios from 'axios';
import Cookies from 'js-cookie';
import { motion, AnimatePresence } from 'framer-motion';
// Image de couverture fixe pour l'académie
import ACADEMY_COVER from '../../../../public/assets/img/Couverture.jpg';
interface UserProfile {
  nom: string;
  prenom: string;
  nomUtilisateur: string;
  photoProfil: string;
  couverture?: string;
  bio?: string;
  email?: string;
  website?: string;
  location?: string;
  joinDate?: string;
  role?: string;
}
const ProfileHeader: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [publicationsCount, setPublicationsCount] = useState<number>(0);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [scrollPosition, setScrollPosition] = useState(0);
  // Effet de parallaxe amélioré
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Récupération des données du profil
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const resProfile = await axios.get('http://localhost:5000/api/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserProfile({
            ...resProfile.data,
            location: 'Madagascar, Antananarivo', // Exemple de données additionnelles
            joinDate: 'Septembre 2024',
            role: 'Membre de la communaute de l\'UACEEM'
          });
          const resCount = await axios.get('http://localhost:5000/api/count', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPublicationsCount(resCount.data.count);
        } catch (error) {
          console.error('Erreur lors de la récupération des données :', error);
        }
      }
    };
    fetchUserProfile();
  }, []);
  if (!userProfile) return <ProfileSkeleton />;

  return (
    <div className={`w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Couverture avec effet parallaxe amélioré */}
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center -mt-96"
          style={{
            backgroundImage: `url(${ACADEMY_COVER})`,
            transform: `translateY(${scrollPosition * 0.5}px)`,
          }}
        />
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-transparent to-gray-900/90' : 'bg-gradient-to-b from-transparent to-gray-50/90'}`} />
      </div>
  
      {/* Contenu du profil */}
      <div className="relative px-4 pb-6 -mt-32">
        <div className={`max-w-5xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Photo de profil */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative -mt-24 mb-4 md:mb-0 md:mr-6"
            >
              <img
                src={`http://localhost:5000/${userProfile.photoProfil}`}
                alt={`${userProfile.nom} ${userProfile.prenom}`}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-lg"
                onClick={() => setShowProfileModal(true)}
              />
              <button
                className={`absolute bottom-0 right-0 p-1.5 rounded-full ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                } shadow-md transition-colors duration-200`}
                onClick={() => setShowCameraModal(true)}
              >
                <Camera className="w-4 h-4" />
              </button>
            </motion.div>
  
            {/* Informations du profil */}
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-2xl font-bold mb-1">{`${userProfile.prenom} ${userProfile.nom}`}</h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>@{userProfile.nomUtilisateur}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                {userProfile.location && (
                  <span className="flex items-center text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {userProfile.location}
                  </span>
                )}
                {userProfile.joinDate && (
                  <span className="flex items-center text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    Membre depuis {userProfile.joinDate}
                  </span>
                )}
                {userProfile.role && (
                  <span className="flex items-center text-xs">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {userProfile.role}
                  </span>
                )}
              </div>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {userProfile.bio || "Aucune biographie pour le moment."}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-full ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors duration-200`}
                >
                  <Bell className="w-4 h-4" />
                </motion.button>
                
              </div>
            </div>
          </div>
  
          {/* Statistiques et navigation */}
          <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                {['posts'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-medium ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    } pb-2 transition-colors duration-200`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div className="flex space-x-4 text-sm">
                <span><strong>{publicationsCount}</strong> publications</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Modals */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={`http://localhost:5000/${userProfile.photoProfil}`}
              alt={`${userProfile.nom} ${userProfile.prenom}`}
              className="max-w-lg max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
  
        {showCameraModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setShowCameraModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg shadow-xl p-4 w-full max-w-sm mx-4`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Modifier la photo
                </h3>
                <button
                  onClick={() => setShowCameraModal(false)}
                  className={`p-1 rounded-full ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-2">
                <button
                  className={`w-full py-2 text-xs rounded-lg ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-colors duration-200`}
                >
                  Choisir une photo
                </button>
                <button
                  className={`w-full py-2 text-xs rounded-lg ${
                    isDarkMode 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-red-500 hover:bg-red-600'
                  } text-white transition-colors duration-200`}
                >
                  Supprimer la photo
                </button>
                <button 
                  className={`w-full py-2 text-xs rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  } transition-colors duration-200`}
                  onClick={() => setShowCameraModal(false)}
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  };
  
  const ProfileSkeleton: React.FC = () => {
    const { isDarkMode } = useTheme();
    return (
      <div className={`w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="h-64 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        <div className="relative px-4 pb-6 -mt-32">
          <div className={`max-w-5xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="relative -mt-24 mb-4 md:mb-0 md:mr-6">
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-grow space-y-4 w-full">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto md:mx-0"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mx-auto md:mx-0"></div>
                <div className="flex justify-center md:justify-start space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                  ))}
                </div>
                <div className="h-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="flex justify-center md:justify-start space-x-2">
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-8"></div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-8"></div>
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileHeader;