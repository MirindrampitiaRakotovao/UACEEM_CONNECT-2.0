import { Heart, MessageSquare, Share2, ChevronUp, ChevronDown, BookmarkPlus, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';

import { useTheme } from '../../context/ThemeContext';
import ForumAudioButton from './ForumAudioButton';
import ForumReplies from './ForumReplies';
import CategoryTag from './CategoryTag';
import Tag from './Tag';


// Interfaces détaillées
interface Auteur {
  id?: number;
  nom: string;
  prenom: string;
  photoProfil?: string;
}
interface Reply {
  id: number;
  contenu: string;
  nombreReactions: number;
  auteur: Auteur;
  createdAt: string;
}
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
    chemin?: string;
  };
  auteur: Auteur;
  createdAt: string;
}
interface ForumPostProps {
  post: ForumPost;
  activeAudio: number | null;
  expandedPost: number | null;
  setActiveAudio: (id: number | null) => void;
  setExpandedPost: (id: number | null) => void;
}
const ForumPost: React.FC<ForumPostProps> = ({
  post,
  activeAudio,
  expandedPost,
  setActiveAudio,
  setExpandedPost
}) => {
  const { isDarkMode } = useTheme();
  // Log détaillé des données
  useEffect(() => {
    console.group('🔍 ForumPost Debug Information');
    console.log('Post Object:', JSON.stringify(post, null, 2));
    
    // Vérifications détaillées
    console.log('Post ID:', post?.id);
    console.log('Auteur existe:', !!post?.auteur);
    console.log('Auteur complet:', post?.auteur);
    console.log('Photo de profil:', post?.auteur?.photoProfil);
    console.log('Mots-clés:', post?.motsCles);
    console.log('Nombre de réponses:', post?.reponses?.length);
    
    // Validation des données
    const validationErrors: string[] = [];
    if (!post) validationErrors.push('Post est undefined');
    if (!post?.auteur) validationErrors.push('Auteur manquant');
    if (!post?.auteur?.photoProfil) validationErrors.push('Photo de profil manquante');
    
    if (validationErrors.length > 0) {
      console.warn('⚠️ Erreurs de validation:', validationErrors);
    }
    
    console.groupEnd();
  }, [post]);
  // Fonction de formatage de date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return 'Date invalide';
    }
  };
  // Fonction pour obtenir le nom complet de l'auteur
  const getFullName = (auteur?: Auteur) => {
    if (!auteur) return 'Utilisateur';
    return `${auteur.prenom || ''} ${auteur.nom || ''}`.trim();
  };
  // Gestion de l'avatar
  const getAvatarUrl = (auteur?: Auteur) => {
    return auteur?.photoProfil || '/default-avatar.png';
  };
  // Rendu conditionnel si le post est undefined
  if (!post) {
    console.error('❌ Tentative de rendu avec un post undefined');
    return (
      <div className={`
        ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
        rounded-lg p-4 shadow-md mb-4
      `}>
        Post non disponible - Erreur de chargement
      </div>
    );
  }
  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
        rounded-lg p-4 shadow-md mb-4 transition-all duration-300
      `}
    >
      {/* En-tête du post */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <img
            src={getAvatarUrl(post.auteur)}
            alt={getFullName(post.auteur)}
            className="w-8 h-8 rounded-full border border-blue-400 object-cover"
          />
          <div>
            <h2 className="text-sm font-semibold">
              {getFullName(post.auteur)}
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        <CategoryTag category={post.categorie} />
      </div>
      {/* Contenu du post */}
      <p className={`text-xs mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {post.contenu}
      </p>
      {/* Mots-clés */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.motsCles?.map(tag => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
      {/* Audio */}
      {post.audio?.chemin && (
        <div className="mb-3">
          <ForumAudioButton
            isActive={activeAudio === post.id}
            onClick={() => setActiveAudio(activeAudio === post.id ? null : post.id)}
          />
        </div>
      )}
      {/* Actions du post */}
      <div className={`flex items-center justify-between ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <div className="flex space-x-4">
          {/* Likes */}
          <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors duration-200">
            <Heart size={12} />
            <span className="text-xs">{post.nombreReactions || 0}</span>
          </button>
          {/* Commentaires */}
          <button className="flex items-center space-x-1 hover:text-green-400 transition-colors duration-200">
            <MessageSquare size={12} />
            <span className="text-xs">{post.reponses?.length || 0}</span>
          </button>
          {/* Partages */}
          <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-200">
            <Share2 size={12} />
            <span className="text-xs">{post.nombrePartages || 0}</span>
          </button>
        </div>
        {/* Actions supplémentaires */}
        <div className="flex space-x-2">
          <button className="hover:text-purple-400 transition-colors duration-200">
            <BookmarkPlus size={12} />
          </button>
          <button className="hover:text-gray-500 transition-colors duration-200">
            <MoreHorizontal size={12} />
          </button>
        </div>
      </div>
      {/* Bouton de développement des réponses */}
      <motion.button
        onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
        className={`
          mt-3 flex items-center justify-center w-full space-x-1 text-xs py-1.5 rounded-md
          ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}
          hover:bg-opacity-80 transition-all duration-200
        `}
      >
        {expandedPost === post.id ? (
          <ChevronUp size={12} />
        ) : (
          <ChevronDown size={12} />
        )}
        <span>
          {expandedPost === post.id ? "Masquer" : `${post.reponses?.length || 0} réponses`}
        </span>
      </motion.button>
      {/* Réponses */}
      <AnimatePresence>
        {expandedPost === post.id && (
          <ForumReplies 
            replies={post.reponses || []} 
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default ForumPost;