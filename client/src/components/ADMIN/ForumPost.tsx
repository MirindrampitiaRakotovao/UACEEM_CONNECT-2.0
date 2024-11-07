import { Heart, MessageSquare, Share2, ChevronUp, ChevronDown, BookmarkPlus, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

import { useTheme } from '../../context/ThemeContext';
import ForumAudioButton from './ForumAudioButton';
import ForumReplies from './ForumReplies';
import CategoryTag from './CategoryTag';
import Tag from './Tag';


interface ForumPost {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
  category: string;
  tags: string[];
  audioUrl?: string;
  likes: number;
  replies: any[];
  shares: number;
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
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <img
            src={post.avatar}
            alt={post.author}
            className="w-8 h-8 rounded-full border border-blue-400"
          />
          <div>
            <h2 className="text-sm font-semibold">{post.author}</h2>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{post.date}</p>
          </div>
        </div>
        <CategoryTag category={post.category} />
      </div>
      <p className={`text-xs mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {post.content}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.tags.map(tag => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
      {post.audioUrl && (
        <div className="mb-3">
          <ForumAudioButton
            isActive={activeAudio === post.id}
            onClick={() => setActiveAudio(activeAudio === post.id ? null : post.id)}
          />
        </div>
      )}
      <div className={`flex items-center justify-between ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors duration-200">
            <Heart size={12} />
            <span className="text-xs">{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-green-400 transition-colors duration-200">
            <MessageSquare size={12} />
            <span className="text-xs">{post.replies.length}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-yellow-400 transition-colors duration-200">
            <Share2 size={12} />
            <span className="text-xs">{post.shares}</span>
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="hover:text-purple-400 transition-colors duration-200">
            <BookmarkPlus size={12} />
          </button>
          <button className="hover:text-gray-500 transition-colors duration-200">
            <MoreHorizontal size={12} />
          </button>
        </div>
      </div>
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
          {expandedPost === post.id ? "Masquer" : `${post.replies.length} réponses`}
        </span>
      </motion.button>
      <AnimatePresence>
        {expandedPost === post.id && (
          <ForumReplies replies={post.replies} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default ForumPost;