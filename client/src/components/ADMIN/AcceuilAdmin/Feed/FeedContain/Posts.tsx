import 'moment/locale/fr'; // Importer la localisation française

import { Heart, MessageCircle, Share, MoreVertical, Send, X, CircleAlert, MoreHorizontal, ChevronRight, ChevronLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import moment from 'moment';
import axios from 'axios';

import { useTheme } from '../../../../../context/ThemeContext.tsx';


// Importer la localisation française
moment.locale('fr');  // Configurer moment pour utiliser le français
import { motion, AnimatePresence } from 'framer-motion';

const socket = io('http://localhost:5000');

// Définir les interfaces pour TypeScript
interface User {
    prenom: string;
    nom: string;
    id: number;
    nomUtilisateur: string;
    photoProfil: string;
}

interface Publication {
    id: string;
    description: string;
    datePublication: string;
    auteur: User;
    image: string;
}

interface Comment {
    id: number;
    text: string;
    auteur: User;
    publicationId: number;
    reponses?: Comment[];
}

interface UserProfile {
    id: number;
    nomUtilisateur: string;
    photoProfil: string;
}



const SkeletonLoader = ({ isDarkMode }) => {
    return (
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 space-y-4`}>
            <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} animate-pulse`}></div>
                <div className="space-y-2 flex-1">
                    <div className={`h-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse`}></div>
                    <div className={`h-3 w-3/4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse`}></div>
                </div>
            </div>
            <div className={`h-40 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-xl animate-pulse`}></div>
            <div className="flex justify-between">
                <div className={`h-8 w-20 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse`}></div>
                <div className={`h-8 w-20 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse`}></div>
                <div className={`h-8 w-20 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse`}></div>
            </div>
        </div>
    );
};




const Posts: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [publications, setPublications] = useState<Publication[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [description, setDescription] = useState<{ [key: string]: string }>({});
    const [reactionsCount, setReactionsCount] = useState<{ [key: string]: number }>({});
    const [userReactions, setUserReactions] = useState<{ [key: string]: boolean }>({});
    const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedPublicationId, setSelectedPublicationId] = useState<string | null>(null);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyContent, setReplyContent] = useState<string>('');
    const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);
    const [expandedComments, setExpandedComments] = useState<number[]>([]);
    const [newCommentContent, setNewCommentContent] = useState<string>('');
    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);


    const handleImageClick = (images: string[]) => {
        setSelectedImages(images.length > 1 ? images : null);
    };

    const fetchUserProfile = async (): Promise<void> => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const res = await axios.get('http://localhost:5000/api/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserProfile(res.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du profil :', error);
            }
        }
    };

    const fetchPublications = async (): Promise<void> => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const res = await axios.get('http://localhost:5000/api/getpublication', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const sortedPublications = res.data.sort((a: Publication, b: Publication) => new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime());
                setPublications(sortedPublications);

                await Promise.all(sortedPublications.map(async (pub) => {
                    const reactionsRes = await axios.get(`http://localhost:5000/api/reactions/publication/${pub.id}/reactions-count`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setReactionsCount((prev) => ({ ...prev, [pub.id]: reactionsRes.data.count }));

                    const userReactionRes = await axios.get(`http://localhost:5000/api/reactions/publication/${pub.id}/user-reactions`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUserReactions((prev) => ({ ...prev, [pub.id]: userReactionRes.data.reacted }));

                    const commentsRes = await axios.get(`http://localhost:5000/api/commentaires/recuperer/${pub.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setComments((prev) => ({ ...prev, [pub.id]: commentsRes.data }));
                }));
            } catch (error) {
                console.error('Erreur lors de la récupération des publications :', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const toggleReaction = async (publicationId: string) => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const reacted = userReactions[publicationId];
                const url = `http://localhost:5000/api/reactions/publication/${publicationId}/toggle-reaction`;

                await axios.post(url, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUserReactions((prev) => ({ ...prev, [publicationId]: !reacted }));
                setReactionsCount((prev) => ({ ...prev, [publicationId]: reacted ? prev[publicationId] - 1 : prev[publicationId] + 1 }));
            } catch (error) {
                console.error('Erreur lors de la gestion de la réaction :', error);
            }
        }
    };

    const submitComment = async (publicationId: string) => {
        const token = Cookies.get('token');
        if (!token || !newCommentContent.trim()) return;

        setIsCommentLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:5000/api/commentaires/${publicationId}`,
                { text: newCommentContent },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setComments(prev => ({
                ...prev,
                [publicationId]: [...(prev[publicationId] || []), {
                    ...response.data.commentaire,
                    auteur: userProfile // Assurez-vous que userProfile contient les informations nécessaires
                }]
            }));

            setNewCommentContent('');

            socket.emit('new_comment', {
                publicationId,
                comment: {
                    ...response.data.commentaire,
                    auteur: userProfile // Assurez-vous que userProfile contient les informations nécessaires
                }
            });
        } catch (error) {
            console.error('Erreur lors de l\'envoi du commentaire:', error);
        } finally {
            setIsCommentLoading(false);
        }
    };

    const submitReply = async (publicationId: string, parentCommentId: number) => {
        const token = Cookies.get('token');
        if (!token || !replyContent) {
            console.error('Token manquant ou contenu de réponse vide');
            return;
        }
        try {
            const response = await axios.post(
                `http://localhost:5000/api/commentaires/${publicationId}/commentaires/${parentCommentId}/reponses`,
                { text: replyContent },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    validateStatus: (status) => status < 500
                }
            );
            if (response.status !== 200 && response.status !== 201) {
                throw new Error(`Réponse du serveur inattendue: ${response.status}`);
            }
            // Mise à jour de l'état des commentaires avec la nouvelle réponse
            setComments(prev => {
                const updatedComments = [...prev[publicationId]];
                const parentCommentIndex = updatedComments.findIndex(c => c.id === parentCommentId);
                if (parentCommentIndex !== -1) {
                    updatedComments[parentCommentIndex].reponses = [
                        ...(updatedComments[parentCommentIndex].reponses || []),
                        response.data.reponse
                    ];
                }
                return { ...prev, [publicationId]: updatedComments };
            });
            setReplyContent('');
            setReplyingTo(null);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la réponse:', error);
        }
    };

    const renderComment = (comment: Comment, publicationId: string) => {
        const authorName = comment.auteur?.nomUtilisateur || 'Utilisateur inconnu';
        const profileImageUrl = comment.auteur?.photoProfil
            ? `http://localhost:5000/${comment.auteur.photoProfil.replace(/\\/g, '/')}`
            : '';
    
        const formatTimeIndication = (createdAt: string) => {
            const now = moment();
            const commentTime = moment(createdAt);
            const diffMinutes = now.diff(commentTime, 'minutes');
            const diffHours = now.diff(commentTime, 'hours');
            const diffDays = now.diff(commentTime, 'days');
            
            if (diffMinutes < 1) return "À l'instant";
            if (diffMinutes < 60) return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
            if (diffHours < 24) return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
            if (diffDays === 1) return "Hier";
            if (diffDays < 30) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
            return commentTime.format('DD/MM/YYYY');
        };
    
        return (
            <div key={comment.id} 
                 className={`p-4 rounded-lg mb-3 transition-all duration-200 ${
                     isDarkMode 
                         ? 'bg-neutral-800 hover:bg-neutral-700' 
                         : 'bg-white hover:bg-gray-50'
                 } shadow-sm`}>
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                        {profileImageUrl ? (
                            <img
                                src={profileImageUrl}
                                alt={`Photo de ${authorName}`}
                                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                                onClick={() => redirectToUserProfile(comment.auteur)}
                            />
                        ) : (
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full 
                                          flex items-center justify-center text-white font-bold">
                                {authorName.charAt(0)}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex items-center space-x-2">
                                <h4 className={`font-semibold cursor-pointer hover:underline ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`} onClick={() => redirectToUserProfile(comment.auteur)}>
                                    {authorName}
                                </h4>
                                <span className={`text-xs ${
                                    isDarkMode ? 'text-neutral-400' : 'text-gray-500'
                                }`}>
                                    {formatTimeIndication(comment.createdAt)}
                                </span>
                            </div>
                            <button className={`p-1 rounded-full hover:bg-${
                                isDarkMode ? 'neutral-700' : 'gray-100'
                            }`}>
                                <MoreVertical size={16} className={
                                    isDarkMode ? 'text-neutral-400' : 'text-gray-500'
                                } />
                            </button>
                        </div>
    
                        <p className={`mt-2 text-sm ${
                            isDarkMode ? 'text-neutral-300' : 'text-gray-700'
                        }`}>
                            {comment.text}
                        </p>
    
                        <div className="mt-3 flex items-center space-x-4">
                            <button
                                className={`flex items-center space-x-1 text-xs ${
                                    isDarkMode 
                                        ? 'text-neutral-400 hover:text-blue-400' 
                                        : 'text-gray-500 hover:text-blue-600'
                                } transition-colors duration-200`}
                                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            >
                                <MessageCircle size={14} />
                                <span>Répondre</span>
                            </button>
                            
                            <button
                                className={`flex items-center space-x-1 text-xs ${
                                    isDarkMode 
                                        ? 'text-neutral-400 hover:text-red-400' 
                                        : 'text-gray-500 hover:text-red-600'
                                } transition-colors duration-200`}
                            >
                                <Heart size={14} />
                                <span>J'aime</span>
                            </button>
                        </div>
    
                        {replyingTo === comment.id && (
                            <div className="mt-3 flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    className={`flex-1 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 
                                              focus:ring-blue-500 transition-all duration-200 ${
                                        isDarkMode 
                                            ? 'bg-neutral-700 text-white placeholder-neutral-400' 
                                            : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                                    }`}
                                    placeholder="Écrire une réponse..."
                                />
                                <button
                                    onClick={() => submitReply(publicationId, comment.id)}
                                    className={`p-2 rounded-full ${
                                        replyContent.trim() 
                                            ? 'bg-blue-500 hover:bg-blue-600' 
                                            : 'bg-gray-300'
                                    } transition-colors duration-200`}
                                    disabled={!replyContent.trim()}
                                >
                                    <Send size={18} className="text-white" />
                                </button>
                            </div>
                        )}
    
                        {comment.reponses && comment.reponses.length > 0 && (
                            <div className="mt-3">
                                <button
                                    onClick={() => toggleReplies(comment.id)}
                                    className={`text-xs font-medium ${
                                        isDarkMode 
                                            ? 'text-blue-400 hover:text-blue-300' 
                                            : 'text-blue-600 hover:text-blue-700'
                                    } transition-colors duration-200`}
                                >
                                    {expandedComments.includes(comment.id) 
                                        ? 'Masquer les réponses' 
                                        : `Voir ${comment.reponses.length} réponse${
                                            comment.reponses.length > 1 ? 's' : ''
                                        }`}
                                </button>
                                
                                {expandedComments.includes(comment.id) && (
                                    <div className="ml-8 mt-3 space-y-3 border-l-2 border-gray-200 pl-4">
                                        {comment.reponses.map(reply => renderComment(reply, publicationId))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const toggleReplies = (commentId: number) => {
        setExpandedComments(prev =>
            prev.includes(commentId)
                ? prev.filter(id => id !== commentId)
                : [...prev, commentId]
        );
    };

    const toggleModal = (publicationId: string | null) => {
        setSelectedPublicationId(publicationId);
        setIsModalOpen(!isModalOpen);
    };

    const handleCommentSubmit = () => {
        if (selectedPublicationId) {
            submitComment(selectedPublicationId);
        }
    };

    const navigate = useNavigate();

    const redirectToUserProfile = (auteur) => {
        if (!auteur) {
            console.error("Les informations de l'auteur ne sont pas disponibles");
            return;
        }
        const authorId = auteur.id;
        if (!authorId) {
            console.error("L'ID de l'auteur n'est pas disponible");
            return;
        }
        navigate(`/PostUser/${authorId}`, {
            state: { authorData: auteur }
        });
    };

    useEffect(() => {
        fetchUserProfile();
        fetchPublications();

        socket.on('new_publication', (newPublication) => {
            setPublications((prevPublications) => [newPublication, ...prevPublications]);
        });

        return () => {
            socket.off('new_publication');
        };

        socket.on('new_comment', (data) => {
            setComments(prev => ({
                ...prev,
                [data.publicationId]: [...(prev[data.publicationId] || []), data.comment]
            }));
        });

        return () => {
            // ... autres nettoyages
            socket.off('new_comment');
        };
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                        <SkeletonLoader key={index} isDarkMode={isDarkMode} />
                    ))}
                </div>
            </div>
        );
    }


    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className=" mx-auto px-4 py-8"
        >
            <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 "
            >
                <motion.div 
                    layout
                    className={`col-span-full ${selectedImages ? 'lg:col-span-2' : ''} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`}
                    animate={{ 
                        gridTemplateColumns: selectedImages 
                            ? 'repeat(2, minmax(0, 1fr))' 
                            : 'repeat(3, minmax(0, 1fr))',
                        x: selectedImages ? '-16.67%' : 0
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    {publications.map((publication) => (
                        <PublicationCard 
                            key={publication.id}
                            publication={publication}
                            isDarkMode={isDarkMode}
                            toggleReaction={toggleReaction}
                            toggleModal={toggleModal}
                            redirectToUserProfile={redirectToUserProfile}
                            userReactions={userReactions}
                            reactionsCount={reactionsCount}
                            handleImageClick={handleImageClick}
                        />
                    ))}
                </motion.div>
                
                <AnimatePresence>
                    {selectedImages && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="col-span-1 lg:col-span-1 sticky top-0 h-screen overflow-y-auto"
                        >
                            <div className="grid gap-4">
                                {selectedImages.map((img, index) => (
                                    <motion.div
                                        key={index}
                                        className="aspect-square overflow-hidden rounded-lg shadow-lg"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <img
                                            src={`http://localhost:5000/${img}`}
                                            alt={`Image ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {isModalOpen && selectedPublicationId && (
                    <CommentModal 
                        publication={publications.find(p => p.id === selectedPublicationId)!}
                        isDarkMode={isDarkMode}
                        closeModal={() => toggleModal(null)}
                        comments={comments[selectedPublicationId] || []}
                        submitComment={submitComment}
                        newCommentContent={newCommentContent}
                        setNewCommentContent={setNewCommentContent}
                        isCommentLoading={isCommentLoading}
                        renderComment={renderComment}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const PublicationCard: React.FC<{ 
    publication: Publication; 
    isDarkMode: boolean; 
    toggleReaction: (id: string) => void; 
    toggleModal: (id: string | null) => void; 
    redirectToUserProfile: (auteur: User) => void; 
    userReactions: { [key: string]: boolean }; 
    reactionsCount: { [key: string]: number };
    handleImageClick: (images: string[]) => void;
}> = ({ 
    publication, 
    isDarkMode, 
    toggleReaction, 
    toggleModal, 
    redirectToUserProfile, 
    userReactions, 
    reactionsCount,
    handleImageClick
}) => {
    const images = JSON.parse(publication.image.replace(/\\/g, '/'));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Fonction pour passer à l'image suivante
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Fonction pour passer à l'image précédente
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Effet pour le défilement automatique des images
    useEffect(() => {
        if (images.length > 1) {
            const interval = setInterval(() => {
                nextImage();
            }, 5000); // Change d'image toutes les 5 secondes

            return () => clearInterval(interval);
        }
    }, [images]);

    return (
<motion.div
    layout
    variants={{
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    }}
    className={`${
        isDarkMode ? 'bg-gradient-to-r from-[#2d3d53] to-[#29374b] shadow-md text-white' : 'bg-white text-black'
    } rounded-md shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl max-w-[400px] mx-auto`}
>
    <div className="p-3 relative z-10">
        {/* En-tête de la publication */}
        <div className="flex items-center justify-between mb-2">
            <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
            >
                <img
                    src={`http://localhost:5000/${publication.auteur.photoProfil.replace(/\\/g, '/')}`}
                    alt={publication.auteur.nomUtilisateur}
                    className="h-8 w-8 rounded-full object-cover border border-blue-500"
                />
                <div>
                    <h2 className="font-semibold text-sm cursor-pointer hover:text-blue-500 transition-colors"
                        onClick={() => redirectToUserProfile(publication.auteur)}>
                        {publication.auteur.nomUtilisateur}
                    </h2>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {moment(publication.datePublication).fromNow()}
                    </span>
                </div>
            </motion.div>
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
                <MoreHorizontal className="w-5 h-5" />
            </motion.button>
        </div>

        {/* Description de la publication */}
        <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {publication.description}
        </p>

        {/* Carrousel d'images */}
        {Array.isArray(images) && images.length > 0 && (
            <div className="relative w-full aspect-square overflow-hidden rounded-md">
                <motion.img
                    key={currentImageIndex}
                    src={`http://localhost:5000/${images[currentImageIndex]}`}
                    alt={`Publication ${publication.id}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
                {images.length > 1 && (
                    <>
                        <button 
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1"
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button 
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                        >
                            <ChevronRight size={16} />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-1.5 w-1.5 rounded-full ${
                                        index === currentImageIndex ? 'bg-white' : 'bg-gray-400/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-1.5 p-1.5 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                onClick={() => toggleReaction(publication.id)}
            >
                <Heart
                    className={`h-5 w-5 ${
                        userReactions[publication.id] 
                            ? 'text-red-500 fill-current' 
                            : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                />
                <span className="text-sm">{reactionsCount[publication.id] || 0}</span>
            </motion.button>

            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-1.5 p-1.5 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                onClick={() => toggleModal(publication.id)}
            >
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">Commenter</span>
            </motion.button>

            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-1.5 p-1.5 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
                <Share className="h-5 w-5" />
                <span className="text-sm">Partager</span>
            </motion.button>
        </div>
    </div>
</motion.div>
    );
};

const CommentModal: React.FC<{ publication: Publication; isDarkMode: boolean; closeModal: () => void; comments: Comment[]; submitComment: (id: string) => void; newCommentContent: string; setNewCommentContent: (content: string) => void; isCommentLoading: boolean; renderComment: (comment: Comment, publicationId: string) => React.ReactNode }> = ({ publication, isDarkMode, closeModal, comments, submitComment, newCommentContent, setNewCommentContent, isCommentLoading, renderComment }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className={`${
                    isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
                } rounded-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Commentaires</h2>
                    <button onClick={closeModal}>
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="space-y-4 mb-4">
                    {comments.map(comment => renderComment(comment, publication.id))}
                </div>

                <div className="mt-4 flex items-center space-x-2">
                    <input
                        type="text"
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                        className={`flex-1 p-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'
                        }`}
                        placeholder="Ajouter un commentaire..."
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => submitComment(publication.id)}
                        disabled={isCommentLoading || !newCommentContent.trim()}
                        className={`px-4 py-2 rounded-lg ${
                            isCommentLoading || !newCommentContent.trim()
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white`}
                    >
                        {isCommentLoading ? 'Envoi...' : 'Envoyer'}
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}
export default Posts;