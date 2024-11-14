import { User, BookOpen, Users, GraduationCap, Building, Sun, Moon, ChevronRight, Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import illustration from '../../../public/assets/img/Connected world-amico.png';
import logo from '../../../public/assets/img/Logo Konnektea Bleu.png';
import { useTheme } from '../../context/ThemeContext';


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
  const initialText = "Bienvenue sur ";
  const typedTexts = ["KONEKTEA .", "la plateforme de l'UACEEM ."];
  const typedTextH1 = useTypewriter([initialText], 100, 50, 1500, true);
  const typedTextH2 = useTypewriter(typedTexts, 140, 50, 1500);
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Gestion Académique",
      description: "Plateforme centralisée pour la gestion des cours, des emplois du temps et des ressources pédagogiques."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaboration",
      description: "Facilite la communication entre étudiants, enseignants et administration pour une meilleure synergie."
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Excellence Académique",
      description: "Accompagnement personnalisé des étudiants pour atteindre leurs objectifs académiques."
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Infrastructure Numérique",
      description: "Solution moderne pour la digitalisation des processus administratifs et pédagogiques."
    }
  ];
  const statistics = [
    { number: "2000+", label: "Étudiants" },
    { number: "150+", label: "Enseignants" },
    { number: "50+", label: "Cours" },
    { number: "95%", label: "Satisfaction" }
  ];
  const testimonials = [
    {
      name: "Prof. Sarah M.",
      role: "Enseignante",
      content: "KONEKTEA a révolutionné ma façon d'enseigner. La plateforme est intuitive et facilite grandement la communication avec mes étudiants."
    },
    {
      name: "Jean R.",
      role: "Étudiant",
      content: "Grâce à KONEKTEA, j'ai un meilleur suivi de mes cours et de mes devoirs. C'est vraiment un outil indispensable!"
    },
    {
      name: "Dr. Marc L.",
      role: "Administrateur",
      content: "La gestion administrative n'a jamais été aussi efficace. KONEKTEA nous fait gagner un temps précieux."
    }
  ];
  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen`}>
      
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                src={logo} 
                alt="Logo" 
                className="h-8"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-[#39457B] to-[#EDB640] text-transparent bg-clip-text">
                KONEKTEA
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <motion.a 
                whileHover={{ y: -2 }}
                href="#features"
                className="hover:text-[#EDB640] transition-colors text-sm"
              >
                Fonctionnalités
              </motion.a>
              <motion.a 
                whileHover={{ y: -2 }}
                href="#testimonials"
                className="hover:text-[#EDB640] transition-colors text-sm"
              >
                Témoignages
              </motion.a>
              <motion.a 
                whileHover={{ y: -2 }}
                href="#contact"
                className="hover:text-[#EDB640] transition-colors text-sm"
              >
                Contact
              </motion.a>
            </div>
            <div className="flex items-center space-x-3">
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
                    <span className={`block w-12 h-6 rounded-full shadow-inner ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></span>
                    <span className={`absolute left-1 top-1 w-5 h-5 rounded-full transition-transform transform ${isDarkMode ? 'translate-x-6 bg-[#EDB640]' : 'bg-[#39457B]'}`}>
                      {isDarkMode ? (
                        <Moon className="text-white p-1" />
                      ) : (
                        <Sun className="text-white p-1" />
                      )}
                    </span>
                  </div>
                </motion.label>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="px-4 py-1 rounded-full bg-gradient-to-r from-[#39457B] to-[#EDB640] text-white flex items-center space-x-1 text-sm"
              >
                <User  size={16} />
                <span>Connexion</span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>
      
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#39457B] to-[#EDB640] text-transparent bg-clip-text">
                {typedTextH1}
              </span>
            </h1>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#39457B] to-[#EDB640] text-transparent bg-clip-text">
              {typedTextH2}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              La solution numérique innovante pour moderniser l'éducation supérieure et améliorer l'expérience d'apprentissage.
            </p>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#39457B] to-[#EDB640] text-white font-semibold flex items-center space-x-1 text-sm"
              >
                <span>Commencer maintenant</span>
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = 'https://uaceem.mg/login'}
                className={`px-6 py-2 rounded-full border font-semibold text-sm ${
                  isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                Voir le dashboard
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#39457B]/20 to-[#EDB640]/20 rounded-3xl filter blur-3xl"></div>
            <img 
              src={illustration} 
              alt="Illustration" 
              className="relative z-10 w-full h-auto rounded-3xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>
      
      
      {/* Statistics Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-[#39457B] to-[#EDB640] text-transparent bg-clip-text mb-1">
                  {stat.number}
                </div>
                <div className="text-sm opacity-75">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      
      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#39457B] to-[#EDB640] text-transparent bg-clip-text mb-2">
              Nos Fonctionnalités
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mx-auto">
              Découvrez comment KONEKTEA transforme l'expérience éducative avec des outils innovants et intuitifs.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-4 rounded-xl shadow-lg ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                } transition-all duration-300`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#39457B] to-[#EDB640] flex items-center justify-center text-white mb-2">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-75">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      
      {/* Testimonials Section */}
      <section id="testimonials" className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#39457B] to-[#EDB640] text-transparent bg-clip-text mb-2">
              Ce qu'ils en pensent
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mx-auto">
              Découvrez les retours d'expérience de nos utilisateurs.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-gray-900' : 'bg-white'
                } shadow-lg`}
              >
                <p className="mb-2 italic opacity-90 text-sm">{testimonial.content}</p>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs opacity-75">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      
      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#39457B] to-[#EDB640] text-transparent bg-clip-text mb-2">
              Contactez-nous
            </h2>
            <p className="text-lg opacity-75 max-w-2xl mx-auto">
              Nous sommes là pour répondre à vos questions et vous accompagner.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4">Informations de contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="text-[#39457B] w-5 h-5" />
                  <span className="text-sm">contact@konektea.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-[#39457B] w-5 h-5" />
                  <span className="text-sm">+261 34 00 000 00</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-[#39457B] w-5 h-5" />
                  <span className="text-sm">Adresse ici</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default LandingPage;