import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTheme } from "../../context/ThemeContext.tsx";
import { Camera, MessageSquareText, UserPlus, Briefcase, Share2, Bell, MapPin, Calendar, Bookmark, Coffee } from "lucide-react";
import { motion } from 'framer-motion';

const PostUserProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const [authorData, setAuthorData] = useState(location.state?.authorData);
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(!authorData);
  const [scrollPosition, setScrollPosition] = useState(0);

  const coverImage = "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!authorData) {
      setTimeout(() => {
        setAuthorData({
          nom: "Doe",
          prenom: "John",
          nomUtilisateur: "johndoe",
          role: "Développeur Full Stack",
          photoProfil: "path/to/profile.jpg",
          location: "Paris, France",
          dateInscription: "Janvier 2023",
          bio: "Passionné de technologie et d'innovation. Toujours à la recherche de nouveaux défis et d'opportunités d'apprentissage.",
          followers: 1120,
          following: 385,
          publications: 73
        });
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  }, [authorData]);

  if (isLoading) {
    return <ProfileSkeleton isDarkMode={isDarkMode} />;
  }

  if (!authorData) {
    return <div className="text-center mt-5">Informations de l'utilisateur non disponibles</div>;
  }

  return (
    <div className={`w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Couverture avec effet parallaxe */}
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${coverImage})`,
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
              className="relative -mt-20 mb-4 md:mb-0 md:mr-6"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={`http://localhost:5000/${authorData.photoProfil?.replace(/\\/g, '/')}`}
                alt={authorData.nomUtilisateur}
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />
              <button
                className={`absolute bottom-1 right-1 p-1 rounded-full ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                } shadow-md transition-colors duration-200`}
              >
                <Camera className="w-3 h-3" />
              </button>
            </motion.div>

            {/* Informations du profil */}
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-2xl font-bold mb-1">{`${authorData.prenom} ${authorData.nom}`}</h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>@{authorData.nomUtilisateur}</p>
              <p className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-2`}>{authorData.role}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-3">
                <span className="flex items-center text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  {authorData.location}
                </span>
                <span className="flex items-center text-xs">
                  <Calendar className="w-3 h-3 mr-1" />
                  Membre depuis {authorData.dateInscription}
                </span>
                <span className="flex items-center text-xs">
                  <Bookmark className="w-3 h-3 mr-1" />
                  42 projets complétés
                </span>
                <span className="flex items-center text-xs">
                  <Coffee className="w-3 h-3 mr-1" />
                  1337 tasses de café
                </span>
              </div>
              <p className={`text-xs mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {authorData.bio}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-1 rounded-full text-xs ${
                    isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-colors duration-200 flex items-center`}
                >
                  <UserPlus className="w-3 h-3 mr-1" />
                  Suivre
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-1 rounded-full text-xs ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  } transition-colors duration-200 flex items-center`}
                >
                  <MessageSquareText className="w-3 h-3 mr-1" />
                  Message
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-1 rounded-full ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  } transition-colors duration-200`}
                >
                  <Bell className="w-3 h-3" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-1 rounded-full ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  } transition-colors duration-200`}
                >
                  <Share2 className="w-3 h-3" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="mt-6 flex justify-center space-x-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="text-center">
              <p className="text-lg font-bold">{authorData.publications}</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Publications</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{authorData.followers}</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Abonnés</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{authorData.following}</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Abonnements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSkeleton = ({ isDarkMode }) => {
  const bgColor = isDarkMode ? 'bg-gray-700' : 'bg-gray-200';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white';

  return (
    <div className={`w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="h-64 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
      <div className="relative px-4 pb-6 -mt-32">
        <div className={`max-w-5xl mx-auto ${cardBg} rounded-xl shadow-lg p-6`}>
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="relative -mt-20 mb-4 md:mb-0 md:mr-6">
              <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-grow space-y-3 w-full">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto md:mx-0"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto md:mx-0"></div>
              <div className="flex justify-center md:justify-start space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                ))}
              </div>
              <div className="h-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="flex justify-center md:justify-start space-x-2">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-6"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-6"></div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center space-x-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-12 mb-1"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostUserProfile;