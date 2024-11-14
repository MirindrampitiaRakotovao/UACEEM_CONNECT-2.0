import { ThumbsUp, ThumbsDown, MoreVertical, Search, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

import ModalAjoutForum from '../PROF/Forums/ModalAjoutForum';
import apiService from '../../services/api';
import ForumHeader from './ForumHeader';


// Interfaces
interface Forum {
    id: string;
    titre: string;
    contenu: string;
    categorie: string;
    motsCles?: string[];
    auteur: {
        id: string;
        prenom: string;
        nom: string;
        photoProfil?: string;
    };
    createdAt: string;
    reactions?: {
        reaction?: number;
        partage?: number;
    };
    reponses?: Reponse[];
    userReactions?: {
        reaction?: boolean;
        partage?: boolean;
    };
}
interface Reponse {
    id: string;
    contenu: string;
    auteur: {
        id: string;
        prenom: string;
        nom: string;
        photoProfil?: string;
    };
    createdAt: string;
}
interface PaginationInfo {
    total: number;
    pages: number;
    pageActuelle: number;
    limitParPage: number;
}
const Forums: React.FC = () => {
    // États
    const [forums, setForums] = useState<Forum[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const [reponseContenu, setReponseContenu] = useState<string>('');
    const [expandedForums, setExpandedForums] = useState<{ [key: string]: boolean }>({});
    const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
    const [pagination, setPagination] = useState<PaginationInfo>({
        total: 0,
        pages: 1,
        pageActuelle: 1,
        limitParPage: 10,
    });
    const [socket, setSocket] = useState<any>(null);
    // Fonctions de gestion des réactions dans le localStorage
    const saveReactionsToLocalStorage = (forumId: string, type: 'reaction' | 'partage', value: boolean) => {
        const savedReactions = JSON.parse(localStorage.getItem('forumReactions') || '{}');
        savedReactions[forumId] = {
            ...savedReactions[forumId],
            [type]: value
        };
        localStorage.setItem('forumReactions', JSON.stringify(savedReactions));
    };
    const getReactionsFromLocalStorage = (forumId: string) => {
        const savedReactions = JSON.parse(localStorage.getItem('forumReactions') || '{}');
        return savedReactions[forumId] || {};
    };
    // Établissement de la connexion socket
    useEffect(() => {
        const newSocket = io('http://localhost:5000', {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });
        setSocket(newSocket);
        // Écoute des nouvelles réactions
        newSocket.on('nouvelleReaction', (data: any) => {
            updateForumReaction(data.forumId, data.reaction);
        });
        return () => {
            newSocket.disconnect();
        };
    }, []);
    // Mise à jour des réactions en temps réel avec persistance
    const updateForumReaction = (forumId: string, reaction: any) => {
        setForums(prevForums =>
            prevForums.map(forum => {
                if (forum.id === forumId) {
                    const savedReactions = getReactionsFromLocalStorage(forumId);
                    
                    const updatedReactions = {
                        ...forum.reactions,
                        [reaction.type]: (forum.reactions?.[reaction.type] || 0) + 1
                    };
                    const updatedUserReactions = {
                        ...forum.userReactions,
                        [reaction.type]: savedReactions[reaction.type] || true
                    };
                    return {
                        ...forum,
                        reactions: updatedReactions,
                        userReactions: updatedUserReactions
                    };
                }
                return forum;
            })
        );
    };
    // Debounce effect pour la recherche
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setPage(1);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);
    // Récupération des forums
    const fetchForums = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiService.get<{
                forums: Forum[];
                pagination: PaginationInfo;
            }>('/forumsList', {
                params: {
                    page,
                    limite: 10,
                    search: debouncedSearchTerm,
                },
            });
            if (response) {
                // Récupérer les réactions sauvegardées du localStorage
                const updatedForums = response.forums.map(forum => {
                    const savedReactions = getReactionsFromLocalStorage(forum.id);
                    return {
                        ...forum,
                        userReactions: {
                            reaction: savedReactions.reaction || forum.userReactions?.reaction,
                            partage: savedReactions.partage || forum.userReactions?.partage
                        }
                    };
                });
                setForums(updatedForums);
                setPagination(response.pagination);
            } else {
                setError('Aucune donnée reçue');
            }
        } catch (err: any) {
            setError(err.message || 'Erreur de chargement des forums');
            setForums([]);
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearchTerm]);
    useEffect(() => {
        fetchForums();
    }, [fetchForums]);
    // Gestion des réactions
    const handleReaction = async (forumId: string, type: 'reaction' | 'partage') => {
        try {
            const requestBody = { type };
            
            // Mise à jour optimiste de l'interface
            setForums(prevForums =>
                prevForums.map(forum => {
                    if (forum.id === forumId) {
                        const currentReactionState = forum.userReactions?.[type] || false;
                        
                        // Calcul du nouveau nombre de réactions
                        const newReactionsCount = currentReactionState
                            ? Math.max((forum.reactions?.[type] || 1) - 1, 0)
                            : (forum.reactions?.[type] || 0) + 1;
                        
                        const updatedUserReactions = {
                            ...forum.userReactions,
                            [type]: !currentReactionState
                        };
                        // Sauvegarder l'état de la réaction
                        saveReactionsToLocalStorage(forumId, type, !currentReactionState);
                        
                        return {
                            ...forum,
                            reactions: {
                                ...forum.reactions,
                                [type]: newReactionsCount
                            },
                                userReactions: updatedUserReactions
                            };
                        }
                        return forum;
                    })
                );
                // Envoi de la requête
                const response = await apiService.post(`/forums/${forumId}/reactions`, requestBody);
                // Émettre l'événement de réaction via le socket
                socket.emit('ajouterReaction', { forumId, reaction: { type } });
                console.log("Réaction enregistrée :", response.data);
            } catch (err: any) {
                console.error("Erreur lors de la réaction :", err);
                // Restauration de l'état en cas d'erreur
                setForums(prevForums =>
                    prevForums.map(forum => {
                        if (forum.id === forumId) {
                            const currentReactionState = forum.userReactions?.[type] || false;
                            return {
                                ...forum,
                                reactions: {
                                    ...forum.reactions,
                                    [type]: currentReactionState
                                        ? (forum.reactions?.[type] || 1)
                                        : Math.max((forum.reactions?.[type] || 1) - 1, 0)
                                },
                                userReactions: {
                                    ...forum.userReactions,
                                    [type]: currentReactionState
                                }
                            };
                        }
                        return forum;
                    })
                );
                // Gestion de l'erreur
                setError(err.response?.data?.message || 'Erreur lors de la réaction');
            }
        };
        // Basculer l'expansion des réponses
        const toggleForumExpansion = (forumId: string) => {
            setExpandedForums(prev => ({
                ...prev,
                [forumId]: !prev[forumId],
            }));
        };
        // Toggler le dropdown
        const toggleDropdown = (forumId: string) => {
            setDropdownOpen(prev => ({
                ...Object.keys(prev).reduce((acc, key) => ({
                    ...acc,
                    [key]: false
                }), {}),
                [forumId]: !prev[forumId]
            }));
        };
        // Suppression du forum
        const handleDeleteForum = async (forumId: string) => {
            try {
                await apiService.delete(`/delete/${forumId}`);
                setForums(prev => prev.filter(forum => forum.id !== forumId));
                setDropdownOpen({});
            } catch (err: any) {
                setError(err.message || 'Erreur lors de la suppression du forum');
            }
        };
        // Ajout d'une réponse
        const handleAddReponse = async (forumId: string) => {
            try {
                if (!reponseContenu.trim()) {
                    setError('Le contenu de la réponse ne peut pas être vide');
                    return;
                }
                await apiService.post(`/forums/${forumId}/reponses`, {
                    contenu: reponseContenu,
                });
                setReponseContenu('');
                fetchForums();
            } catch (err: any) {
                setError(err.message || 'Erreur lors de l\'ajout de la réponse');
            }
        };
        // Gestion du chargement et des erreurs
        if (loading) return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
        if (error) return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-3">Erreur</h2>
                    <p className="text-sm text-gray-700 mb-4">{error}</p>
                    <button
                        onClick={fetchForums}
                        className="px-4 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
        return (
            <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <ForumHeader setIsModalOpen={setIsModalOpen} />
                    {isModalOpen && (
                        <ModalAjoutForum
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSave={() => {}} // Ajoutez la logique de sauvegarde si nécessaire
                        />
                    )}
                    {/* Barre de recherche */}
                    <div className="mb-8 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher des discussions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out shadow-sm"
                        />
                    </div>
                    {/* Liste des forums */}
                    <div className="space-y-4">
                        {forums.length === 0 ? (
                            <div className="text-center text-sm text-gray-500 py-6">
                                Aucun forum trouvé
                            </div>
                        ) : (
                            forums.map((forum) => (
                                <div
                                    key={forum.id}
                                    className="bg-white rounded-lg shadow-md p-3 border border-gray-200 relative"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center space-x-2">
                                            {forum.auteur.photoProfil && (
                                                <img
                                                    src={`http://localhost:5000/${forum.auteur.photoProfil.replace(/\\/g, '/')}`}
                                                    alt={`${forum.auteur.prenom} ${forum.auteur.nom}`}
                                                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-400"
                                                    onError={(e) => {
                                                        e.currentTarget.src = '/path/to/default-avatar.png';
                                                    }}
                                                />
                                            )}
                                            <div>
                                                <h2 className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition">
                                                    {forum.titre}
                                                </h2>
                                                <p className="text-xs text-gray-600">
                                                    {forum.auteur.prenom} {forum.auteur.nom}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(forum.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Dropdown des options */}
                                        <div className="relative">
                                            <button 
                                                onClick={() => toggleDropdown(forum.id)}
                                                className="text-gray-500 hover:text-gray-700 transition"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                            {dropdownOpen[forum.id] && (
                                                <div className="absolute right-0 top-full z-10 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg">
                                                    <button 
                                                        onClick={() => handleDeleteForum(forum.id)}
                                                        className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-gray-100 transition flex items-center"
                                                    >
                                                        <Trash2 className="w-3 h-3 mr-2" />
                                                        Supprimer
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-700 mb-2">{forum.contenu}</p>
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleReaction(forum.id, 'reaction')}
                                                className={`flex items-center space-x-1 ${
                                                    forum.userReactions?.reaction 
                                                        ? 'text-blue-600 font-bold' 
                                                        : 'text-green-600 hover:text-green-800'
                                                } transition`}
                                            >
                                                <ThumbsUp 
                                                    className={`w-4 h-4 ${
                                                        forum.userReactions?.reaction ? 'fill-blue-600' : ''
                                                    }`} 
                                                />
                                                <span className="text-xs">{forum.reactions?.reaction || 0}</span>
                                            </button>
                                            <button
                                                onClick={() => handleReaction(forum.id, 'partage')}
                                                className={`flex items-center space-x-1 ${
                                                    forum.userReactions?.partage 
                                                        ? 'text-red-700 font-bold' 
                                                        : 'text-red-600 hover:text-red-800'
                                                } transition`}
                                            >
                                                <ThumbsDown 
                                                    className={`w-4 h-4 ${
                                                        forum.userReactions?.partage ? 'fill-red-700' : ''
                                                    }`} 
                                                />
                                                <span className="text-xs">{forum.reactions?.partage || 0}</span>
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => toggleForumExpansion(forum.id)}
                                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition"
                                        >
                                            {expandedForums[forum.id] ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            )}
                                            <span className="text-xs">Réponses</span>
                                        </button>
                                    </div>
                                    {/* Formulaire de réponse */}
                                    {expandedForums[forum.id] && (
                                        <div className="mt-3">
                                            <textarea
                                                value={reponseContenu}
                                                onChange={(e) => setReponseContenu(e.target.value)}
                                                placeholder="Votre réponse..."
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                                rows={3}
                                            />
                                            <div className="flex justify-end mt-2">
                                                <button
                                                    onClick={() => handleAddReponse(forum.id)}
                                                    className="px-4 py-1.5 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600 transition"
                                                >
                                                    Envoyer
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {/* Affichage des réponses */}
                                    {expandedForums[forum.id] && forum.reponses && forum.reponses.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            <h3 className="text-sm font-semibold text-gray-700">Réponses:</h3>
                                            {forum.reponses.map((reponse) => (
                                                <div key={reponse.id} className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <span className="text-xs font-medium text-gray-700">
                                                            {reponse.auteur.prenom} {reponse.auteur.nom}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(reponse.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">{reponse.contenu}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-4">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition"
                            >
                                Précédent
                            </button>
                            {[...Array(pagination.pages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setPage(index + 1)}
                                    className={`px-3 py-1 text-xs rounded-lg transition ${
                                        page === index + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-blue-100'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page === pagination.pages}
                                className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition"
                            >
                                Suivant
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };
    export default Forums;