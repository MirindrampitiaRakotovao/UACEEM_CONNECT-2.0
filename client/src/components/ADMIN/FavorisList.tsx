import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
    Star,
    MessageCircle,
    ThumbsUp,
    Users,
    Clock,
    Tag
} from 'lucide-react';

const FavorisList = () => {
    const { isDarkMode } = useTheme();
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setFavorites([
                {
                    id: 1,
                    type: 'publication',
                    title: "Comment bien débuter en programmation React ?",
                    author: "Jean Dupont",
                    date: "2024-01-15",
                    likes: 156,
                    comments: 23,
                    preview: "React est une bibliothèque JavaScript populaire pour créer des interfaces utilisateur...",
                    tags: ["React", "JavaScript", "Débutant"]
                },
                {
                    id: 2,
                    type: 'forum',
                    title: "Forum: Meilleurs pratiques TypeScript 2024",
                    author: "Marie Martin",
                    date: "2024-01-14",
                    participants: 45,
                    replies: 89,
                    lastActivity: "Il y a 2 heures",
                    category: "TypeScript"
                },
                {
                    id: 3,
                    type: 'forum',
                    title: "Forum: Meilleurs pratiques ReactJS 2024",
                    author: "Marie Martin",
                    date: "2024-01-14",
                    participants: 45,
                    replies: 89,
                    lastActivity: "Il y a 2 heures",
                    category: "Javascript"
                },
            ]);
        }, 2000);
    }, []);

    const Skeleton = () => (
        <>
            {[1, 2, 3, 4].map((item) => (
                <div key={item} className={`animate-pulse rounded-lg shadow-lg p-6 
                    ${isDarkMode ? 'bg-[#2A3A53]' : 'bg-white'}`}>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/4 mb-4"></div>
                    <div className="flex gap-2 mb-3">
                        <div className="h-6 w-16 bg-gray-300 rounded"></div>
                        <div className="h-6 w-16 bg-gray-300 rounded"></div>
                    </div>
                </div>
            ))}
        </>
    );

    const FavoriteCard = ({ item }) => {
        if (item.type === 'publication') {
            return (
                <div className={`rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 
                    ${isDarkMode ? 'bg-[#2A3A53] text-white' : 'bg-white text-gray-800'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-[#FFAA00] text-black rounded-full text-sm">
                            Publication
                        </span>
                        <button className="text-gray-400 hover:text-[#FFAA00] transition-colors">
                            <Star className="h-5 w-5 fill-current" />
                        </button>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.preview}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag, index) => (
                            <span key={index} className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 
                                ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                <Tag className="h-3 w-3" />
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className={`flex justify-between items-center text-sm 
                        ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        <div className="flex items-center gap-2">
                            <span>{item.author}</span>
                            <span>•</span>
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                {item.likes}
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                {item.comments}
                            </span>
                        </div>
                    </div>
                </div>
            );
        }

        else {
            return (
                <div className={`rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 
                    ${isDarkMode ? 'bg-[#2A3A53] text-white' : 'bg-white text-gray-800'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-[#FFAA00] text-black rounded-full text-sm">
                            Forum
                        </span>
                        <button className="text-gray-400 hover:text-[#FFAA00] transition-colors">
                            <Star className="h-5 w-5 fill-current" />
                        </button>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <div className="mb-4">
                        <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 
                                                        ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            <Tag className="h-3 w-3" />
                            {item.category}
                        </span>
                    </div>
                    <div className={`flex justify-between items-center text-sm 
                        ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        <div className="flex items-center gap-2">
                            <span>{item.author}</span>
                            <span>•</span>
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {item.participants}
                            </span>
                            <span className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                {item.replies}
                            </span>
                        </div>
                    </div>
                    <div className={`mt-4 text-xs flex items-center gap-1 
                        ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                        <Clock className="h-3 w-3" />
                        Dernière activité : {item.lastActivity}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className={`min-h-screen `}>
            <div className="container mx-auto px-4 py-8">
                <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Mes Favoris
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <Skeleton />
                    ) : favorites.length > 0 ? (
                        favorites.map((favorite) => (
                            <FavoriteCard key={favorite.id} item={favorite} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10">
                            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                Aucun favori trouvé
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavorisList;