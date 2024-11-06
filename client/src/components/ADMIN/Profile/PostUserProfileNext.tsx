import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageSquare, AlertTriangle, Image, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import Cookies from "js-cookie";
import { motion, AnimatePresence } from 'framer-motion';
const PostUserProfileNext = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [reactionsCount, setReactionsCount] = useState({});
    const [userReactions, setUserReactions] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/user/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const sortedPosts = response.data.sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                    setPosts(sortedPosts);
                    await Promise.all(
                        sortedPosts.map(async (post) => {
                            const reactionsRes = await axios.get(`http://localhost:5000/api/reactions/publication/${post.id}/reactions-count`, {
                                headers: { Authorization: `Bearer ${token}` },
                            });
                            setReactionsCount((prev) => ({ ...prev, [post.id]: reactionsRes.data.count }));
                            const userReactionRes = await axios.get(`http://localhost:5000/api/reactions/publication/${post.id}/user-reactions`, {
                                headers: { Authorization: `Bearer ${token}` },
                            });
                            setUserReactions((prev) => ({ ...prev, [post.id]: userReactionRes.data.reacted }));
                        })
                    );
                } catch (err) {
                    console.error('Erreur lors de la récupération des posts :', err);
                    setError('Erreur lors de la récupération des posts');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('Token manquant, accès refusé');
                setLoading(false);
            }
        };
        fetchPosts();
    }, [id]);
    if (loading) {
        return <PostsSkeleton />;
    }
    if (error) {
        return <div className="text-center mt-5 text-red-500">{error}</div>;
    }
    if (posts.length === 0) {
        return <div className="text-center mt-5">Aucune publication disponible</div>;
    }
    return (
        <div className="max-w-7xl mx-auto mt-8 px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Publications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <AnimatePresence>
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} reactionsCount={reactionsCount} userReactions={userReactions} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
const PostCard = ({ post, reactionsCount, userReactions }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = JSON.parse(post.image);
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    return (
        <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.03 }}
        >
            {images && images.length > 0 ? (
                <div className="relative pb-[100%] bg-gray-200">
                    <img
                        src={`http://localhost:5000/${images[currentImageIndex]}`}
                        alt={`Publication ${currentImageIndex + 1}`}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400x400?text=Image+non+disponible';
                        }}
                    />
                    {images.length > 1 && (
                        <>
                            <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1">
                                <ChevronRight size={20} />
                            </button>
                        </>
                    )}
                </div>
            ) : (
                <div className="relative pb-[100%] bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Image className="w-16 h-16 text-blue-400" />
                </div>
            )}
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <img
                        src={`http://localhost:5000/${post.auteur.photoProfil?.replace(/\\/g, '/')}`}
                        alt={post.auteur.nomUtilisateur}
                        className="h-10 w-10 rounded-full object-cover mr-3 border-2 border-blue-500"
                    />
                    <div>
                        <h3 className="font-semibold text-gray-800">{post.auteur.nomUtilisateur}</h3>
                        <p className="text-gray-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{post.text}</p>
                <div className="flex items-center justify-between text-gray-600 text-sm">
                    <motion.div 
                        className="flex items-center space-x-1 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Heart className="w-5 h-5" fill={userReactions[post.id] ? "#F87171" : "none"} stroke={userReactions[post.id] ? "#F87171" : "currentColor"} />
                        <span>{reactionsCount[post.id] || 0}</span>
                    </motion.div>
                    <motion.div 
                        className="flex items-center space-x-1 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <MessageSquare className="w-5 h-5" />
                        <span>Commenter</span>
                    </motion.div>
                    <motion.div 
                        className="flex items-center space-x-1 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AlertTriangle className="w-5 h-5" />
                        <span>Signaler</span>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

const PostsSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto mt-8 px-4">
            <div className="h-10 w-48 bg-gray-300 rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="relative pb-[100%] bg-gray-300 animate-pulse"></div>
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse mr-3"></div>
                                <div>
                                    <div className="h-4 w-24 bg-gray-300 animate-pulse mb-2"></div>
                                    <div className="h-3 w-16 bg-gray-300 animate-pulse"></div>
                                </div>
                            </div>
                            <div className="h-4 w-full bg-gray-300 animate-pulse mb-2"></div>
                            <div className="h-4 w-2/3 bg-gray-300 animate-pulse mb-4"></div>
                            <div className="flex justify-between">
                                <div className="h-6 w-16 bg-gray-300 animate-pulse"></div>
                                <div className="h-6 w-16 bg-gray-300 animate-pulse"></div>
                                <div className="h-6 w-16 bg-gray-300 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostUserProfileNext;