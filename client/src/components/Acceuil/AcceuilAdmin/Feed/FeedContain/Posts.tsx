import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Heart, MessageCircle, Share, MoreVertical, Send, X } from 'lucide-react';
import io from 'socket.io-client';
import { useTheme } from '../../../../../context/ThemeContext';

const socket = io('http://localhost:5000');

// Définir les interfaces pour TypeScript
interface User {
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
                [publicationId]: [...(prev[publicationId] || []), response.data.commentaire]
            }));

            setNewCommentContent('');

            socket.emit('new_comment', {
                publicationId,
                comment: response.data.commentaire
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
        const profileImageUrl = comment.auteur?.photoProfil
            ? `http://localhost:5000/${comment.auteur.photoProfil.replace(/\\/g, '/')}`
            : '';

        return (
            <div key={comment.id} className={`p-4 ${isDarkMode ? 'bg-neutral-800' : 'bg-white'}`}>
                <div className="flex items-start space-x-3">
                    {profileImageUrl ? (
                        <img
                            src={profileImageUrl}
                            alt={`Photo de ${comment.auteur?.nomUtilisateur}`}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    )}
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center w-full">
                            <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                {comment.auteur?.nomUtilisateur || 'Utilisateur inconnu'}
                            </p>
                            {/*<span className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-gray-500'}`}>3j</span>*/}
                        </div>
                        <p className={`mt-1 text-sm ${isDarkMode ? 'text-neutral-300' : 'text-gray-700'}`}>
                            {comment.text}
                        </p>
                        <div className="mt-2 flex items-center space-x-4">
                            <button
                                className={`text-xs ${isDarkMode ? 'text-neutral-400 hover:text-neutral-300' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            >
                                Répondre
                            </button>
                            <button
                                className={`text-xs ${isDarkMode ? 'text-neutral-400 hover:text-neutral-300' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => {/* Logique pour réagir */}}
                            >
                                Réagir
                            </button>
                        </div>
                    </div>
                </div>

                {replyingTo === comment.id && (
                    <div className="ml-10 mt-2 flex items-center space-x-2">
                        <input
                            type="text"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 ${
                                isDarkMode
                                    ? 'bg-neutral-700 border-neutral-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            placeholder="Écrire une réponse..."
                        />
                        <button
                            className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
                            onClick={() => submitReply(publicationId, comment.id)}
                        >
                            Envoyer
                        </button>
                    </div>
                )}

                {comment.reponses && comment.reponses.length > 0 && (
                    <div className="ml-10 mt-4 space-y-3">
                        {comment.reponses.map(reply => renderComment(reply, publicationId))}
                    </div>
                )}
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

    useEffect(() => {
        fetchUserProfile();
        fetchPublications();

        socket.on('new_publication', (newPublication) => {
            setPublications((prevPublications) => [newPublication, ...prevPublications]);
        });

        return () => {
            socket.off('new_publication');
        };
    }, []);

    if (loading) {
        return <div>Chargement des publications...</div>;
    }

    return (
        <div>
            {publications.map((publication) => {
                const images = JSON.parse(publication.image.replace(/\\/g, '/')); // Remplacez les doubles barres obliques inverses

                return (
                    <div key={publication.id} className={` p-4 my-4 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                        <div className="flex items-center">
                            <img
                                src={`http://localhost:5000/${publication.auteur.photoProfil.replace(/\\/g, '/')}`}
                                alt={publication.auteur.nomUtilisateur}
                                className="h-10 w-10 rounded-full object-cover mr-2"
                            />
                            <h2 className="font-semibold">{publication.auteur.nomUtilisateur}</h2>
                        </div>
                        <p className="my-2">{publication.description}</p>
                        {Array.isArray(images) && images.length > 0 && (
                            <div className="flex flex-wrap -m-1"> {/* Marge négative pour compenser les espacements */}
                                {images.length === 1 ? (
                                    <div className="w-full p-1">
                                        <img
                                            src={`http://localhost:5000/${images[0]}`}
                                            alt={`Image de publication ${publication.id}`}
                                            className="w-full aspect-square object-cover rounded-xl"
                                        />
                                    </div>
                                ) : images.length === 2 ? (
                                    <>
                                        {images.map((img, index) => (
                                            <div key={index} className="w-1/2 p-1">
                                                <img
                                                    src={`http://localhost:5000/${img}`}
                                                    alt={`Image de publication ${publication.id}`}
                                                    className="w-full aspect-square object-cover rounded-xl"
                                                />
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="w-full flex flex-wrap">
                                        <div className="w-2/3 p-1">
                                            <img
                                                src={`http://localhost:5000/${images[0]}`}
                                                alt={`Image de publication ${publication.id}`}
                                                className="w-full aspect-square object-cover rounded-xl"
                                            />
                                        </div>
                                        <div className="w-1/3 flex flex-col">
                                            <div className="p-1">
                                                <img
                                                    src={`http://localhost:5000/${images[1]}`}
                                                    alt={`Image de publication ${publication.id}`}
                                                    className="w-full aspect-square object-cover rounded-xl"
                                                />
                                            </div>
                                            <div className="p-1 relative">
                                                <img
                                                    src={`http://localhost:5000/${images[2]}`}
                                                    alt={`Image de publication ${publication.id}`}
                                                    className="w-full aspect-square object-cover rounded-xl"
                                                />
                                                {images.length > 3 && (
                                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                                <span className="text-white text-lg font-bold">
                                    +{images.length - 3} Voir plus
                                </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex justify-between mt-2">
                            <div className="flex items-center">
                                <Heart 
                                    className={`h-5 w-5 cursor-pointer ${userReactions[publication.id] ? 'fill-current text-blue-500' : 'text-gray-500'}`} 
                                    onClick={() => toggleReaction(publication.id)} // Appel à la fonction de gestion de réaction
                                />
                                <span className="ml-1">{reactionsCount[publication.id] || 0}</span>
                                <MessageCircle className="h-5 w-5 cursor-pointer ml-4" onClick={() => toggleModal(publication.id)} />
                            </div>
                            <Share className="h-5 w-5 cursor-pointer" />
                        </div>

{/* Modal pour les commentaires */}
                        {isModalOpen && selectedPublicationId && (
                            <div
                                id="hs-focus-management-modal"
                                className="fixed inset-0 z-[80] overflow-x-hidden overflow-y-auto flex items-center justify-center"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                                role="dialog"
                            >
                                <div className="w-full max-w-lg m-3">
                                    <div className={`flex flex-col border shadow-sm rounded-xl ${
                                        isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-gray-200'
                                    }`}>
                                        <div className={`flex justify-between items-center py-3 px-4 border-b ${
                                            isDarkMode ? 'border-neutral-700' : 'border-gray-200'
                                        }`}>
                                            <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                Commentaires
                                            </h3>
                                            <button
                                                type="button"
                                                className={`size-8 inline-flex justify-center items-center rounded-full border border-transparent ${
                                                    isDarkMode
                                                        ? 'bg-neutral-700 hover:bg-neutral-600 text-neutral-400 focus:bg-neutral-600'
                                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 focus:bg-gray-200'
                                                }`}
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                <span className="sr-only">Fermer</span>
                                                <X className="size-4" />
                                            </button>
                                        </div>
                                        <div className="p-4 overflow-y-auto max-h-[60vh]">
                                            {comments[selectedPublicationId]?.length > 0 ? (
                                                comments[selectedPublicationId].map(comment => (
                                                    <div key={comment.id} className="mb-4">
                                                        {renderComment(comment, selectedPublicationId)}
                                                    </div>
                                                ))
                                            ) : (
                                                <p className={`text-center ${isDarkMode ? 'text-neutral-400' : 'text-gray-500'}`}>
                                                    Aucun commentaire pour le moment
                                                </p>
                                            )}
                                        </div>
                                        <div className={`flex items-center gap-x-2 py-3 px-4 border-t ${
                                            isDarkMode ? 'border-neutral-700' : 'border-gray-200'
                                        }`}>
                                            <input
                                                type="text"
                                                className={`py-2 px-3 block w-full rounded-lg text-sm focus:ring-blue-500 ${
                                                    isDarkMode
                                                        ? 'bg-neutral-900 border-neutral-700 text-neutral-400 focus:border-blue-500'
                                                        : 'bg-white border-gray-200 text-gray-800 focus:border-blue-500'
                                                }`}
                                                placeholder="Ajouter un commentaire..."
                                                value={newCommentContent}
                                                onChange={(e) => setNewCommentContent(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="py-2 px-3 inline-flex items-center text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                onClick={handleCommentSubmit}
                                            >
                                                Envoyer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                );
            })}
        </div>
    );
};

export default Posts;
