import { Heart, MessageSquare, Share2, ChevronUp, ChevronDown, BookmarkPlus, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import ForumAudioButton from './ForumAudioButton';
import ForumReplies from './ForumReplies';
import CategoryTag from './CategoryTag';
import Tag from './Tag';


interface ForumPostProps {
    post: ForumPost;
    isDarkMode: boolean;
    activeAudio: number | null;
    expandedPost: number | null;
    setActiveAudio: (id: number | null) => void;
    setExpandedPost: (id: number | null) => void;
}

const ForumPost: React.FC<ForumPostProps> = ({ post, isDarkMode, activeAudio, expandedPost, setActiveAudio, setExpandedPost }) => (
    <motion.div
        key={post.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`${isDarkMode ? 'bg-[#1a1b1e]' : 'bg-[#f0f1f5]'} 
            rounded-lg p-4 
            ${isDarkMode ? 'shadow-neu-dark' : 'shadow-neu-light'}
            transition-all duration-300`}
    >
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
                <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full border border-[#FF6B6B]" />
                <div>
                    <h2 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-[#333]'}`}>{post.author}</h2>
                    <p className="text-xs text-gray-500">{post.date}</p>
                </div>
            </div>
            <CategoryTag category={post.category} />
        </div>
        <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.content}</p>
        <div className="flex flex-wrap gap-1 mb-2">
            {post.tags.map(tag => <Tag key={tag} text={tag} />)}
        </div>

        {post.audioUrl && (
            <ForumAudioButton 
                isActive={activeAudio === post.id} 
                onClick={() => setActiveAudio(activeAudio === post.id ? null : post.id)} 
                isDarkMode={isDarkMode} 
            />
        )}

        <div className={`flex items-center justify-between text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className="flex space-x-3">
                <button className="flex items-center space-x-1 hover:text-[#FF6B6B] transition-colors duration-200">
                    <Heart size={12} />
                    <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-[#4ECDC4] transition-colors duration-200">
                    <MessageSquare size={12} />
                    <span>{post.replies.length}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-[#FF8E53] transition-colors duration-200">
                    <Share2 size={12} />
                    <span>{post.shares}</span>
                </button>
            </div>
            <div className="flex space-x-2">
                <button className="hover:text-[#4ECDC4] transition-colors duration-200">
                    <BookmarkPlus size={12} />
                </button>
                <button className="hover:text-[#FF8E53] transition-colors duration-200">
                    <MoreHorizontal size={12} />
                </button>
            </div>
        </div>

        <button
            onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
            className={`mt-2 flex items-center space-x-1 text-xs px-2 py-1 rounded-full 
                ${isDarkMode ? 'bg-[#2a2b2f]' : 'bg-[#d8d9dd]'}
                ${isDarkMode ? 'shadow-neu-dark' : 'shadow-neu-light'}
                hover:shadow-neu-pressed-light dark:hover:shadow-neu-pressed-dark 
                transition-all duration-300`}
        >
            {expandedPost === post.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            <span>{expandedPost === post.id ? "Masquer" : `${post.replies.length} réponses`}</span>
        </button>

        <AnimatePresence>
            {expandedPost === post.id && <ForumReplies replies={post.replies} isDarkMode={isDarkMode} />}
        </AnimatePresence>
    </motion.div>
);

export default ForumPost;
