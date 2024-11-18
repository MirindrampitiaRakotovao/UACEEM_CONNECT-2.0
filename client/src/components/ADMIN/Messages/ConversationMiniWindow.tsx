import { X, Send, Paperclip, Smile, MoreVertical } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import axios from 'axios';

import { useTheme } from '../../../context/ThemeContext';
import apiService from '../../../services/api';
import useAuth from '../../../useAuth';


// Types et interfaces
interface User {
    id?: string;
    nom: string;
    prenom: string;
    photoProfil: string;
    role: string;
    nomUtilisateur: string;
}

interface Message {
    id: string;
    contenu: string;
    dateEnvoi: string;
    expediteurId: string;
    destinataireId: string;
    expediteur: {
        id: string;
        nom: string;
        prenom: string;
    };
    statut: string;
    type: string;
    fichiers: string | null;
    metadonneesFichiers: string | null;
    estUrgent: boolean;
    dateLecture: string | null;
}

interface ConversationMiniWindowProps {
    user: User;
    onClose: () => void;
}

const ConversationMiniWindow: React.FC<ConversationMiniWindowProps> = ({ 
    user, 
    onClose 
}) => {
    // États
    const { isDarkMode } = useTheme();
    const { user: currentUser, loading: authLoading } = useAuth();
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);
    
    // Refs
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Récupération des messages
    const fetchMessages = async (destinataireId: string) => {
        // Attend que l'authentification soit terminée
        if (authLoading) return;

        // Vérifie si l'utilisateur est authentifié
        if (!currentUser) {
            setError('Utilisateur non authentifié');
            return;
        }

        try {
            const token = Cookies.get('token');
            if (!token) {
                setError('Aucun token trouvé');
                return;
            }

            const response = await axios.get(`http://localhost:5000/api/messages/${destinataireId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (Array.isArray(response.data)) {
                const sortedMessages = response.data.sort((a, b) => 
                    new Date(a.dateEnvoi).getTime() - new Date(b.dateEnvoi).getTime()
                );
                setMessages(sortedMessages);
            } else {
                console.warn('Les données reçues ne sont pas un tableau:', response.data);
                setMessages([]);
            }
        } catch (error) {
            console.error('Erreur de récupération des messages:', error);
            if (axios.isAxiosError(error)) {
                console.error('Détails de l\'erreur axios:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message
                });
            }
            setError('Impossible de charger les messages.');
        } finally {
            setIsLoading(false);
        }
    };

    // Effet pour le chargement initial des messages
    useEffect(() => {
        if (!authLoading && user?.id) {
            fetchMessages(user.id);
        }
    }, [user?.id, authLoading, currentUser]);

    // Effet pour le scroll automatique
    useEffect(() => {
        scrollToBottom();
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [messages, messageText]);

    // Fonctions utilitaires
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const formatTime = (timestamp: string) => {
        try {
            return new Date(timestamp).toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return '--:--';
        }
    };

    // Gestionnaires d'événements
    const handleSendMessage = async () => {
        if (!messageText.trim() || !currentUser || isSending) return;
        
        try {
            setIsSending(true);
            
            // Correction : utilisez destinataireId au lieu de recipientId
            const response = await apiService.post<Message>('/messages', {
                contenu: messageText.trim(),
                destinataireId: user.id  // Assurez-vous que c'est le bon ID
            });
            
            if (response.data) {
                // Mettre à jour les messages localement
                setMessages(prev => [...prev, response.data]);
                setMessageText('');
                scrollToBottom();
            }
        } catch (error) {
            console.error('Erreur complète lors de l\'envoi du message:', error);
            
            // Gestion détaillée des erreurs Axios
            if (axios.isAxiosError(error)) {
                console.error('Détails de l\'erreur Axios:', {
                    response: error.response?.data,
                    status: error.response?.status,
                    headers: error.response?.headers
                });
                
                // Message d'erreur personnalisé
                const errorMessage = error.response?.data?.message || 
                                     'Impossible d\'envoyer le message';
                
                setError(errorMessage);
            } else {
                setError('Une erreur inattendue s\'est produite');
            }
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
// Frontend
const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            setError('Aucun fichier sélectionné');
            return;
        }

        const maxFileSize = 10 * 1024 * 1024; // 10 MB
        const allowedTypes = [
            'image/jpeg', 
            'image/png',
            'image/gif',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'audio/mpeg',
            'audio/wav',
            'audio/webm',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ];

        const validFiles = Array.from(files).filter(file => {
            if (!allowedTypes.includes(file.type)) {
                setError(`Type de fichier non autorisé : ${file.name}`);
                return false;
            }
            if (file.size > maxFileSize) {
                setError(`Fichier trop volumineux : ${file.name} (max 10 Mo)`);
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) {
            return;
        }

        const formData = new FormData();
        
        // Ajouter les fichiers
        validFiles.forEach(file => {
            formData.append('fichiers', file);
        });

        // Ajouter les autres données
        formData.append('ty', 'gfytf');
        formData.append('destinataireId', user.id);

        try {
            setIsLoading(true);
            setError(null);

            // Configuration d'axios modifiée pour gérer correctement FormData
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Ne pas définir le boundary - il sera automatiquement généré
                },
                onUploadProgress: (progressEvent: any) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / (progressEvent.total || 1)
                    );
                    setUploadProgress(percentCompleted);
                },
                timeout: 30000,
            };

            // Débogage - vérifier le contenu de FormData
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const response = await apiService.post('/upload-fichiers', formData, config);

            if (response.data?.data) {
                setMessages(prev => [...prev, response.data.data]);
                scrollToBottom();
                
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                setUploadProgress(0);
            }
        } catch (error: any) {
            console.error('Erreur de téléchargement:', error);
            const errorMessage = 
                error.response?.data?.message ||
                error.message ||
                'Erreur lors du téléchargement des fichiers';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    // Si l'authentification est en cours, afficher un loader
    if (authLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const renderMessages = () => {
        // Utiliser le loading de useAuth
        if (isLoading) {
            return (
                <div className="w-full flex justify-center py-2">
                    <div className="animate-pulse bg-gray-200 h-16 w-3/4 rounded-lg" />
                </div>
            );
        }
        // Vérifier l'authentification de l'utilisateur
        if (!currentUser?.nomUtilisateur) {
            return <div className="text-red-500">Utilisateur non authentifié</div>;
        }
        // Gérer le cas où il n'y a pas de messages
        if (messages.length === 0) {
            return (
                <div className="w-full flex justify-center text-gray-500 py-4">
                    Aucun message
                </div>
            );
        }
        return (
            <div className="space-y-3">
                {messages.map((msg) => {
                    // Déterminer si le message est de l'utilisateur courant
                    const isMyMessage = 
                        currentUser.nom === msg.expediteur.nom &&
                        currentUser.prenom === msg.expediteur.prenom;
                    // Classes pour le message
                    const messageClasses = `
                        max-w-[70%]
                        rounded-lg
                        p-3
                        ${isMyMessage 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-800'}
                        shadow-sm
                    `.trim();
                    // Classes pour l'horodatage
                    const timeClasses = `
                        text-xs 
                        mt-1
                        ${isMyMessage ? 'text-blue-100' : 'text-gray-500'}
                    `.trim();
                    return (
                        <div key={msg.id} className="w-full px-4 mb-4">
                            <div className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}>
                                {/* Afficher le nom de l'expéditeur si ce n'est pas mon message */}
                                {!isMyMessage && (
                                    <span className="text-xs text-gray-500 mb-1">
                                        {msg.expediteur.prenom} {msg.expediteur.nom}
                                    </span>
                                )}
                                {/* Conteneur du message */}
                                <div className={messageClasses}>
                                    <p className="break-words text-sm">{msg.contenu}</p>
                                    
                                    {/* Horodatage */}
                                    <div className={timeClasses}>
                                        {formatTime(msg.dateEnvoi)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };


    // Rendu du composant
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`
                fixed bottom-4 right-24 w-[32rem] rounded-2xl shadow-2xl z-50 overflow-hidden
                ${isDarkMode ? 'bg-gray-900' : 'bg-white'}
                border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}
            `}
        >
            {/* Header */}
            <div className={`
                flex justify-between items-center p-4
                ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}
                border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
            `}>
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <img 
                            src={`http://localhost:5000/${user.photoProfil?.replace(/\\/g, '/')}`}
                            alt={`${user.nom} ${user.prenom}`}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/default-avatar.png';
                            }}
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {user.prenom} {user.nom}
                        </span>
                        <span className="text-xs text-green-500">En ligne</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className={`p-1.5 rounded-full hover:bg-opacity-10 hover:bg-gray-500
                        ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`}>
                        <MoreVertical size={18} />
                    </button>
                    <button 
                        onClick={onClose}
                        className={`p-1.5 rounded-full hover:bg-opacity-10 hover:bg-gray-500
                            ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className={`
                p-4 h-80 overflow-y-auto
                ${isDarkMode ? 'bg-gray-900' : 'bg-white'}
            `}>
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-full">
                        <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                            {error}
                        </p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-3">
                        <img 
                            src={`http://localhost:5000/${user.photoProfil?.replace(/\\/g, '/')}`}
                            alt={`${user.nom} ${user.prenom}`}
                            className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-500"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/default-avatar.png';
                            }}
                        />
                        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {user.prenom} {user.nom}
                        </h2>
                        <p className={`text-sm text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Bienvenue dans Konektea-chat. Commencez une conversation avec {user.prenom}.
                        </p>
                    </div>
                ) : renderMessages()}
            </div>

            {/* Input Area */}
            <div className={`
                flex justify-between items-center p-4
                ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}
                border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
            `}>
                <div className="flex items-center flex-grow">
                <label htmlFor="file-upload" className={`
                        flex items-center justify-center w-10 h-10 rounded-full cursor-pointer
                        hover:bg-opacity-10 hover:bg-gray-500
                        ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}
                    `}>
                        <Paperclip size={20} />
                        <input
                            id="file-upload"
                            type="file"
                            multiple
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/jpeg,image/png,image/gif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,audio/mpeg,audio/wav,audio/webm,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                        />
                    </label>
                    <textarea
                        ref={inputRef}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Écrivez un message..."
                        className={`flex-grow p-2 ml-2 rounded-lg border transition-colors duration-200 ease-in-out 
                            ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'} 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                        rows={1}
                        style={{
                            minHeight: '40px',
                            maxHeight: '120px'
                        }}
                    />
                </div>
                <button 
                    onClick={handleSendMessage}
                    disabled={!messageText.trim() || isSending}
                    className={`
                        ml-2 p-2 rounded-full transition-colors duration-200
                        ${!messageText.trim() || isSending
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-opacity-10 hover:bg-gray-500'} 
                        ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}
                    `}
                >
                    <Send size={20} />
                </button>
            </div>
        </motion.div>
    );
};

export default ConversationMiniWindow;