import { Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';


interface ForumRepliesProps {
    replies: Reply[];
    isDarkMode: boolean;
}

const ForumReplies: React.FC<ForumRepliesProps> = ({ replies, isDarkMode }) => (
    <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-2 space-y-2"
    >
        {replies.map(reply => (
            <div key={reply.id} className={`${isDarkMode ? 'bg-[#22232a]' : 'bg-[#e6e7ee]'} rounded-lg p-2`}>
                <div className="flex items-center space-x-2 mb-1">
                    <img src={reply.avatar} alt={reply.author} className="w-6 h-6 rounded-full" />
                    <h3 className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-[#333]'}`}>{reply.author}</h3>
                    <span className="text-xs text-gray-500">{reply.date}</span>
                </div>
                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{reply.content}</p>
                <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-[#FF6B6B] transition-colors duration-200">
                        <Heart size={10} />
                        <span>{reply.likes}</span>
                    </button>
                    <button className="hover:text-[#4ECDC4] transition-colors duration-200">
                        <MessageCircle size={10} />
                    </button>
                </div>
            </div>
        ))}
        <div className={`flex items-center space-x-2 ${isDarkMode ? 'bg-[#22232a]' : 'bg-[#e6e7ee]'} rounded-lg p-2`}>
            <input
                type="text"
                placeholder="Répondre..."
                className={`flex-grow text-sm ${isDarkMode ? 'bg-[#2a2b2f] text-white' : 'bg-[#d8d9dd] text-gray-700'} 
                    px-2 py-1 rounded-full focus:outline-none`}
            />
            <button className="px-3 py-1 text-sm font-semibold rounded-full text-white bg-gradient-to-r from-[#4ECDC4] to-[#45b7a7]">
                Envoyer
            </button>
        </div>
    </motion.div>
);

export default ForumReplies;
