import { MessageCircle, Mic, Send, Play, Pause, X, ChevronDown, ChevronUp, Share2, Heart, MessageSquare, BookmarkPlus, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useTheme } from '../../../context/ThemeContext';


// Définissez une interface qui correspond à la structure de votre API
interface ForumPost {
  id: number;
  titre: string;
  contenu: string;
  categorie: string;
  motsCles: string[];
  nombreReactions: number;
  nombrePartages: number;
  reponses: Reply[];
  audio?: {
    chemin: string;
  };
  auteur: {
    nom: string;
    prenom: string;
    photoProfil: string;
  };
  createdAt: string;
}
interface Reply {
  id: number;
  auteur: {
    nom: string;
    prenom: string;
    photoProfil: string;
  };
  contenu: string;
  nombreReactions: number;
  createdAt: string;
}
const Forums: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [activeAudio, setActiveAudio] = useState<number | null>(null);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limite: 10,
    total: 0
  });
  // Fonction pour récupérer les forums
  const fetchForums = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/forumsList`, {
        params: {
          page,
          limite: pagination.limite
        }
      });
      setPosts(response.data.forums);
      setPagination(prev => ({
        ...prev,
        total: response.data.pagination.total,
        page: response.data.pagination.pageActuelle
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des forums', error);
    } finally {
      setIsLoading(false);
    }
  };
  // Charger les forums au montage du composant
  useEffect(() => {
    fetchForums();
  }, []);
  // Fonctions de gestion des interactions
  const toggleRecording = () => setIsRecording(!isRecording);
  
  const toggleAudioPlay = (postId: number) => 
    setActiveAudio(activeAudio === postId ? null : postId);
  
  const toggleExpandPost = (postId: number) => 
    setExpandedPost(expandedPost === postId ? null : postId);
  // Fonction pour gérer les réponses
  const handleReply = (postId: number, content: string) => {
    // Implémentez l'envoi de réponse à votre API
    console.log(`Répondre au post ${postId} avec : ${content}`);
  };
  // Fonctions de pagination
  const goToPreviousPage = () => {
    if (pagination.page > 1) {
      fetchForums(pagination.page - 1);
    }
  };
  const goToNextPage = () => {
    if (pagination.page * pagination.limite < pagination.total) {
      fetchForums(pagination.page + 1);
    }
  };
  // Rendu du skeleton de chargement (votre composant existant)
  if (isLoading) return <ForumSkeleton />;
  return (
    <div className={`container mx-auto px-4 py-6 font-sans ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'} min-h-screen`}>
      <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-[#243063]'}`}>
        Forum des Innovateurs Tech
      </h1>
      <div className="space-y-6">
        {posts.map(post => (
          // Votre code de rendu de post existant, mais avec les modifications suivantes :
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <img 
                  src={post.auteur.photoProfil || '/default-avatar.png'} 
                  alt={`${post.auteur.prenom} ${post.auteur.nom}`} 
                  className="w-8 h-8 rounded-full border border-[#243063]" 
                />
                <div>
                  <h2 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-[#243063]'}`}>
                    {`${post.auteur.prenom} ${post.auteur.nom}`}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <CategoryTag category={post.categorie} />
            </div>
            {/* Le reste de votre code de rendu reste similaire, 
                mais utilisez les propriétés de l'API */}
            <p className={`mb-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              {post.contenu}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              {post.motsCles.map(tag => <Tag key={tag} text={tag} />)}
            </div>
            {/* Reste du code similaire */}
          </motion.div>
        ))}
      </div>
      {/* Contrôles de pagination */}
      <div className="flex justify-between mt-6">
        <button 
          onClick={goToPreviousPage}
          disabled={pagination.page === 1}
          className={`
            px-4 py-2 rounded 
            ${pagination.page === 1 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-[#243063] text-white hover:bg-[#2d3a7c]'}
          `}
        >
          Précédent
        </button>
        <span className="text-sm">
          Page {pagination.page} sur {Math.ceil(pagination.total / pagination.limite)}
        </span>
        <button 
          onClick={goToNextPage}
          disabled={pagination.page * pagination.limite >= pagination.total}
          className={`
            px-4 py-2 rounded 
            ${pagination.page * pagination.limite >= pagination.total 
              ?               'bg-gray-300 cursor-not-allowed' 
              : 'bg-[#243063] text-white hover:bg-[#2d3a7c]'}
          `}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};
const ForumSkeleton: React.FC = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`container mx-auto px-4 py-6 font-sans ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'} min-h-screen`}>
      <div className={`h-8 w-3/4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-8`}></div>
      {[1, 2].map((i) => (
        <div key={i} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 mb-6 animate-pulse`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`}></div>
              <div>
                <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-20 mb-1`}></div>
                <div className={`h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-16`}></div>
              </div>
            </div>
            <div className={`h-4 w-16 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`}></div>
          </div>
          <div className="space-y-2 mb-3">
            <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-full`}></div>
            <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-5/6`}></div>
            <div className={`h-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-4/6`}></div>
          </div>
          <div className="flex space-x-2 mb-3">
            {[1, 2, 3].map((j) => (
              <div key={j} className={`h-4 w-12 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`}></div>
            ))}
          </div>
          <div className="flex justify-between">
            <div className="flex space-x-3">
              {[1, 2, 3].map((k) => (
                <div key={k} className={`h-4 w-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
              ))}
            </div>
            <div className="flex space-x-2">
              {[1, 2].map((l) => (
                <div key={l} className={`h-4 w-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Forums;