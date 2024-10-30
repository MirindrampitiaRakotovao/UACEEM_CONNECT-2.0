import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BookOpen, Users, GraduationCap, Building, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import logo from '../../../public/assets/img/Logo Konnektea Bleu.png';
import illustration from '../../../public/assets/img/Connected world-amico.png';

const LandingPage = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const useTypewriter = (texts, speed, deleteSpeed, delayBetweenTexts, isPersistent = false) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
      let timeoutId;
      const text = texts[currentTextIndex];

      if (!isDeleting) {
        if (displayedText.length < text.length) {
          timeoutId = setTimeout(() => {
            setDisplayedText((prev) => prev + text.charAt(displayedText.length));
          }, speed);
        } else {
          timeoutId = setTimeout(() => {
            if (!isPersistent) {
              setIsDeleting(true);
            }
          }, delayBetweenTexts);
        }
      } else {
        if (displayedText.length > 0) {
          timeoutId = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deleteSpeed);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      }

      return () => clearTimeout(timeoutId);
    }, [displayedText, isDeleting, texts, speed, deleteSpeed, currentTextIndex, isPersistent]);

    return displayedText;
  };

  const initialText = "Bienvenue sur "; // Text constant
  const typedTexts = ["KONEKTEA .", "la plateforme de l'UACEEM ."]; // Variable texts
  const typedTextH1 = useTypewriter(
    [initialText],  // Only need the initial text for h1
    100,  // Speed of typing
    50,   // Speed of deleting
    1500, // Delay before switching to the next text
    true  // Make it persistent for h1
  );

  const typedTextH2 = useTypewriter(
    typedTexts,  // The texts for h2
    140,  // Speed of typing
    50,   // Speed of deleting
    1500  // Delay before switching to the next text
  );

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Gestion Académique",
      description: "Plateforme centralisée pour la gestion des cours, des emplois du temps et des ressources pédagogiques."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description: "Facilite la communication entre étudiants, enseignants et administration pour une meilleure synergie."
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Excellence Académique",
      description: "Accompagnement personnalisé des étudiants pour atteindre leurs objectifs académiques."
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Infrastructure Numérique",
      description: "Solution moderne pour la digitalisation des processus administratifs et pédagogiques."
    }
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen overflow-hidden relative`}>
      {/* Gradient circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-white via-[#EDB640] to-[#39457B] opacity-40 blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#EDB640] via-[#39457B] to-white opacity-40 blur-3xl transform -translate-x-1/2 translate-y-1/2 animate-pulse"></div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex justify-between items-center px-6 py-4 shadow-sm backdrop-blur-sm bg-opacity-70 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        <div className="flex items-center space-x-2">
          <motion.img 
            whileHover={{ scale: 1.1 }}
            src={logo} 
            alt="Logo" 
            className="h-10" 
          />
          <div className="text-2xl font-black bg-gradient-to-r from-[#39457B] to-[#EDB640] text-transparent bg-clip-text">
            KONEKTEA.
          </div>
        </div>
        <div className="flex items-center space-x-8">
          <div className="flex items-center ml-3">
            <div className="relative">
              <input
                type="checkbox"
                id="toggleDarkMode"
                className="hidden"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <motion.label 
                whileTap={{ scale: 0.9 }}
                htmlFor="toggleDarkMode" 
                className="flex items-center cursor-pointer"
              >
                <div className="relative">
                  <span className={`block w-14 h-8 rounded-full shadow-inner ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></span>
                  <span className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ${isDarkMode ? 'translate-x-6 bg-[#EDB640]' : 'bg-[#39457B]'}`}>
                    {isDarkMode ? (
                      <Moon className="text-white p-1" />
                    ) : (
                      <Sun className="text-white p-1" />
                    )}
                  </span>
                </div>
              </motion.label>
            </div>
          </div>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")} // Redirect to login on click
            className={`px-4 py-2 rounded-lg shadow-md transition duration-300 z-10 bg-gradient-to-r cursor-pointer from-[#39457B] to-[#EDB640] text-white`}
          >
            <User className="inline-block mr-2" />
            Connexion
          </motion.a>
        </div>
      </motion.nav>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row items-center justify-between py-20 px-6 max-w-7xl mx-auto relative z-10">
        <motion.header 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 lg:pr-8"
        >
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-[#39457B] to-[#EDB640] text-transparent bg-clip-text">
            {typedTextH1} {/* Typewriter effect for h1 */}
          </h1>
          <h2 className="text-6xl font-black bg-gradient-to-r from-[#39457B] to-[#EDB640] text-transparent bg-clip-text -mt-4 mb-6">{typedTextH2}</h2> {/* Affiche le texte généré par la machine à écrire */}
          <p className="text-xl mb-8 opacity-90">
            Une plateforme qui permet aux institutions d'améliorer la collaboration et la communication.
          </p>
          <div className="space-x-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className={`px-6 py-3 rounded-lg bg-gradient-to-r from-[#39457B] to-[#EDB640] text-white shadow-lg`}
            >
              Connexion
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = 'https://uaceem.mg/login'}
              className={`px-6 py-3 rounded-lg border shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              Voir mon dashboard
            </motion.button>
          </div>
        </motion.header>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <img src={illustration} alt="illustration" className="w-full h-auto" />
        </motion.div>
      </div>

      {/* Trust section */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#39457B] to-[#EDB640] text-transparent bg-clip-text"
          >
            Découvrez KONEKTEA
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="mb-4 text-[#243063]">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} py-4 text-center z-10`}>
        <p className="opacity-75">&copy; 2024 KONEKTEA. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
