import { X, MessageSquarePlus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useTheme } from '../../../context/ThemeContext';
import useAuth from '../../../useAuth'; // Assurez-vous du chemin correct


// Assurez-vous du chemin correct
interface User {
    id?: string;
    nom: string;
    prenom: string;
    email: string;
    photoProfil: string;
    nomUtilisateur: string;
}
interface NewMessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectUser: (user: User) => void;
}
const NewMessageModal: React.FC<NewMessageModalProps> = ({ 
    isOpen, 
    onClose, 
    onSelectUser 
}) => {
    const { isDarkMode } = useTheme();
    const { user: currentUser } = useAuth(); // Utilisation de votre hook useAuth
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchUsers = async () => {
            if (isOpen && currentUser) {
                try {
                    setLoading(true);
                    const response = await axios.get<User[]>('http://localhost:5000/api/showusers', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    
                    // Filtrer pour exclure l'utilisateur connecté
                    const filteredUsers = response.data.filter(
                        user => user.nomUtilisateur !== currentUser.nomUtilisateur
                    );
                    
                    setUsers(filteredUsers);
                } catch (error) {
                    console.error('Erreur lors de la récupération des utilisateurs', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        
        fetchUsers();
    }, [isOpen, currentUser]);
    const filteredUsers = users.filter(user => 
        `${user.nom} ${user.prenom}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        className={`
                            ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}
                            p-6 rounded-lg shadow-xl max-w-md w-full mx-4
                        `}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold flex items-center">
                                <MessageSquarePlus size={20} className="mr-2" />
                                Nouveau Message
                            </h2>
                            <button 
                                onClick={onClose} 
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        
                        {/* Search Input */}
                        <div className="relative mb-4">
                            <input 
                                type="text" 
                                placeholder="Rechercher un utilisateur..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`
                                    w-full pl-10 pr-4 py-2 text-xs rounded
                                    ${isDarkMode 
                                        ? 'bg-gray-700 text-gray-100 placeholder-gray-400' 
                                        : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                                    }
                                `}
                            />
                            <Search 
                                size={16} 
                                className={`
                                    absolute left-3 top-1/2 transform -translate-y-1/2 
                                    ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                                `} 
                            />
                        </div>
                        
                        {/* User List */}
                        <div className="max-h-[300px] overflow-y-auto space-y-2 mb-4">
                            {loading ? (
                                <div className="text-center text-xs text-gray-500">Chargement...</div>
                            ) : filteredUsers.length === 0 ? (
                                <div className="text-center text-xs text-gray-500">Aucun utilisateur trouvé</div>
                            ) : (
                                filteredUsers.map(user => (
                                    <motion.div
                                        key={user.nomUtilisateur}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => onSelectUser(user)}
                                        className={`
                                            flex items-center p-3 rounded cursor-pointer
                                            ${isDarkMode 
                                                ? 'hover:bg-gray-700 bg-gray-750' 
                                                : 'hover:bg-gray-100 bg-gray-50'
                                            }
                                        `}
                                    >
                                        <img 
                                            src={`http://localhost:5000/${user.photoProfil?.replace(/\\/g, '/')}`} 
                                            alt={`${user.nom} ${user.prenom}`}
                                            className="w-8 h-8 rounded-full object-cover mr-3"
                                        />
                                        <div>
                                            <p className="text-xs font-medium">
                                                {user.nom} {user.prenom}
                                            </p>
                                            <p className={`
                                                text-xs 
                                                ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                                            `}>
                                                {user.nomUtilisateur}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
export default NewMessageModal;