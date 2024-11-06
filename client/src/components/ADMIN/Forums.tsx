import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageCircle, Mic, Send, Play, Pause, X, ChevronDown, ChevronUp,
    Share2, Heart, MessageSquare, BookmarkPlus, MoreHorizontal
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.tsx';

interface ForumPost {
    id: number;
    author: string;
    avatar: string;
    date: string;
    content: string;
    category: string;
    likes: number;
    shares: number;
    replies: Reply[];
    audioUrl?: string;
    tags: string[];
}

interface Reply {
    id: number;
    author: string;
    avatar: string;
    date: string;
    content: string;
    likes: number;
}

const CategoryTag: React.FC<{ category: string }> = ({ category }) => (
    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r from-[#243063] to-[#2d3a7c] text-white">
        {category}
    </span>
);

const Tag: React.FC<{ text: string }> = ({ text }) => (
    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-[#243063] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
        #{text}
    </span>
);

const Forums: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [activeAudio, setActiveAudio] = useState<number | null>(null);
    const [expandedPost, setExpandedPost] = useState<number | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setPosts([
                {
                    id: 1,
                    author: "Alice Smith",
                    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
                    date: "15/05/2023",
                    content: "Quelqu'un a-t-il expérimenté les nouveaux composants serveur React ? Je suis curieux des gains de performance réels.",
                    category: "React",
                    likes: 42,
                    shares: 12,
                    tags: ["react", "composantsserveur", "performance"],
                    replies: [
                        {
                            id: 101,
                            author: "Bob Johnson",
                            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                            date: "15/05/2023",
                            content: "Oui ! L'amélioration du temps de chargement initial est notable. Cependant, il y a une courbe d'apprentissage pour déterminer quels composants rendre côté serveur vs client.",
                            likes: 15
                        },
                        {
                            id: 102,
                            author: "Emma Wilson",
                            avatar: "https://randomuser.me/api/portraits/women/26.jpg",
                            date: "16/05/2023",
                            content: "J'ai constaté des améliorations significatives dans le TTI (Temps jusqu'à l'interactivité) de notre application. C'est particulièrement bénéfique pour les pages riches en données.",
                            likes: 8
                        }
                    ],
                    audioUrl: "chemin/vers/audio1.mp3"
                },
                {
                    id: 2,
                    author: "Charlie Brown",
                    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
                    date: "14/05/2023",
                    content: "Que pensez-vous de la récente vague d'outils de développement basés sur l'IA ? Améliorent-ils vraiment la productivité ou créent-ils une fausse sensation d'efficacité ?",
                    category: "IA",
                    likes: 38,
                    shares: 9,
                    tags: ["IA", "productivité", "développement"],
                    replies: [
                        {
                            id: 201,
                            author: "Diana Prince",
                            avatar: "https://randomuser.me/api/portraits/women/57.jpg",
                            date: "14/05/2023",
                            content: "Ils sont fantastiques pour le code répétitif et le prototypage rapide, mais j'ai constaté qu'ils ont parfois du mal avec la logique complexe spécifique au domaine.",
                            likes: 22
                        },
                        {
                            id: 202,
                            author: "Frank Castle",
                            avatar: "https://randomuser.me/api/portraits/men/41.jpg",
                            date: "15/05/2023",
                            content: "Je suis préoccupé par la dépendance excessive. Bien qu'ils soient d'excellents outils, comprendre les principes sous-jacents reste crucial pour la résolution de problèmes et l'optimisation.",
                            likes: 17
                        }
                    ]
                }
            ]);
            setIsLoading(false);
        }, 2000);
    }, []);

    const handleReply = (postId: number, content: string) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    replies: [...post.replies, {
                        id: Date.now(),
                        author: "Utilisateur Actuel",
                        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
                        date: new Date().toLocaleDateString('fr-FR'),
                        content,
                        likes: 0
                    }]
                };
            }
            return post;
        }));
    };

    const toggleRecording = () => setIsRecording(!isRecording);
    const toggleAudioPlay = (postId: number) => setActiveAudio(activeAudio === postId ? null : postId);
    const toggleExpandPost = (postId: number) => setExpandedPost(expandedPost === postId ? null : postId);

    if (isLoading) return <ForumSkeleton />;

    return (
        <div className={`container mx-auto px-4 py-6 font-sans ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'} min-h-screen`}>
            <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-[#243063]'}`}>
                Forum des Innovateurs Tech
            </h1>
            <div className="space-y-6">
                {posts.map(post => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                                <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full border border-[#243063]" />
                                <div>
                                    <h2 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-[#243063]'}`}>{post.author}</h2>
                                    <p className="text-xs text-gray-500">{post.date}</p>
                                </div>
                            </div>
                            <CategoryTag category={post.category} />
                        </div>

                        <p className={`mb-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{post.content}</p>

                        <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags.map(tag => <Tag key={tag} text={tag} />)}
                        </div>

                        {post.audioUrl && (
                            <div className="mb-3">
                                <button
                                    onClick={() => toggleAudioPlay(post.id)}
                                    className={`flex items-center space-x-1 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-[#243063] hover:text-[#EDB640]'} transition-colors duration-200`}
                                >
                                    {activeAudio === post.id ? <Pause size={14} /> : <Play size={14} />}
                                    <span className="text-xs font-medium">Écouter l'audio</span>
                                </button>
                            </div>
                        )}

                        <div className={`flex items-center justify-between ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
                            <div className="flex space-x-3">
                                <button className={`flex items-center space-x-1 ${isDarkMode ? 'hover:text-red-400' : 'hover:text-[#EDB640]'} transition-colors duration-200`}>
                                    <Heart size={14} />
                                    <span>{post.likes}</span>
                                </button>
                                <button className={`flex items-center space-x-1 ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-[#243063]'} transition-colors duration-200`}>
                                    <MessageSquare size={14} />
                                    <span>{post.replies.length}</span>
                                </button>
                                <button className={`flex items-center space-x-1 ${isDarkMode ? 'hover:text-green-400' : 'hover:text-[#243063]'} transition-colors duration-200`}>
                                    <Share2 size={14} />
                                    <span>{post.shares}</span>
                                </button>
                            </div>
                            <div className="flex space-x-2">
                                <button className={`${isDarkMode ? 'hover:text-purple-400' : 'hover:text-[#243063]'} transition-colors duration-200`}>
                                    <BookmarkPlus size={14} />
                                </button>
                                <button className={`${isDarkMode ? 'hover:text-gray-300' : 'hover:text-[#243063]'} transition-colors duration-200`}>
                                    <MoreHorizontal size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                                onClick={() => toggleExpandPost(post.id)}
                                className={`flex items-center space-x-1 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-[#243063] hover:text-[#EDB640]'} transition-colors duration-200`}
                            >
                                {expandedPost === post.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                <span className="text-xs font-medium">
                                    {expandedPost === post.id ? "Masquer les réponses" : `Afficher ${post.replies.length} réponses`}
                                </span>
                            </button>
                            <AnimatePresence>
                                {expandedPost === post.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="mt-3 space-y-3">
                                            {post.replies.map(reply => (
                                                <div key={reply.id} className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded-md p-3 transition-all duration-300`}>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <div className="flex items-center space-x-2">
                                                            <img src={reply.avatar} alt={reply.author} className="w-6 h-6 rounded-full border border-[#243063]" />
                                                            <div>
                                                                <h4 className={`font-medium text-xs ${isDarkMode ? 'text-white' : 'text-[#243063]'}`}>{reply.author}</h4>
                                                                <p className="text-xs text-gray-500">{reply.date}</p>
                                                            </div>
                                                        </div>
                                                        <button className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-[#243063]'} transition-colors duration-200`}>
                                                            <MoreHorizontal size={12} />
                                                        </button>
                                                    </div>
                                                    <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{reply.content}</p>
                                                    <div className={`flex items-center space-x-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        <button className={`flex items-center space-x-1 ${isDarkMode ? 'hover:text-red-400' : 'hover:text-[#EDB640]'} transition-colors duration-200`}>
                                                            <Heart size={12} />
                                                            <span>{reply.likes}</span>
                                                        </button>
                                                        <button className={`${isDarkMode ? 'hover:text-blue-400' : 'hover:text-[#243063]'} transition-colors duration-200`}>Répondre</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-3 flex items-center space-x-2">
                                            <input
                                                type="text"
                                                placeholder="Écrire une réponse..."
                                                className={`flex-grow p-1 text-xs border ${
                                                    isDarkMode 
                                                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-400' 
                                                        : 'bg-white border-gray-300 text-gray-900 focus:ring-[#243063]'
                                                } rounded-md focus:outline-none focus:ring-1 transition-all duration-200`}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleReply(post.id, e.currentTarget.value);
                                                        e.currentTarget.value = '';
                                                    }
                                                }}
                                            />
                                            <button
                                                onClick={toggleRecording}
                                                className={`p-1 rounded-full transition-all duration-200 ${
                                                    isRecording 
                                                        ? 'bg-red-500 hover:bg-red-600' 
                                                        : isDarkMode
                                                            ? 'bg-blue-500 hover:bg-blue-600'
                                                            : 'bg-[#243063] hover:bg-[#2d3a7c]'
                                                }`}
                                            >
                                                <Mic size={14} className="text-white" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {isRecording && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`mt-3 ${
                                            isDarkMode 
                                                ? 'bg-gray-700 border-gray-600' 
                                                : 'bg-gradient-to-r from-[#f0f2f8] to-[#f7f8fb] border-[#243063]'
                                        } rounded-md p-3 border`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                                <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-[#243063]'}`}>Enregistrement...</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={toggleRecording}
                                                    className="text-red-500 hover:text-red-600 transition-colors duration-200"
                                                >
                                                    <X size={14} />
                                                </button>
                                                <button
                                                    className={`${
                                                        isDarkMode 
                                                            ? 'bg-blue-500 hover:bg-blue-600' 
                                                            : 'bg-[#243063] hover:bg-[#2d3a7c]'
                                                    } text-white p-1 rounded-full transition-colors duration-200`}
                                                >
                                                    <Send size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex items-center space-x-2">
                                            <div className={`flex-grow h-1 ${isDarkMode ? 'bg-gray-600' : 'bg-[#e0e3ec]'} rounded-full overflow-hidden`}>
                                                <motion.div
                                                    className={`h-full ${
                                                        isDarkMode 
                                                            ? 'bg-blue-500' 
                                                            : 'bg-gradient-to-r from-[#243063] to-[#EDB640]'
                                                    }`}
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{
                                                        duration: 10,
                                                        ease: "linear",
                                                    }}
                                                />
                                            </div>
                                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-[#243063]'}`}>0:00</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
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