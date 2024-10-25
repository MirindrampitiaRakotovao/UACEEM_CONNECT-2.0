import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import SidebareRowIcon from '../../../SidebareRowIcon';
import { useTheme } from '../../../../context/ThemeContext'; // Importer le hook pour le thème
import { Bell, User, Settings } from 'lucide-react'; // Importer de nouvelles icônes si nécessaire

const Sidebar = () => {
    const { isDarkMode } = useTheme(); // Utiliser le contexte pour le mode sombre
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    // Fonction pour récupérer les informations de l'utilisateur connecté
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = Cookies.get('token'); // Récupérer le token depuis les cookies
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/api/profile', {
                        headers: {
                            Authorization: `Bearer ${token}` // Ajouter le token dans les headers
                        }
                    });
                    setUserProfile(res.data); // Stocker les données du profil
                } catch (error) {
                    console.error('Erreur lors de la récupération du profil :', error);
                }
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className={`p-2 ml-7 mt-5 max-w-[600px] xl:min-w-[300px] ${isDarkMode ? ' text-white' : ' text-gray-700'}`}>
            {/* Affichage de la photo et du nom d'utilisateur */}
            <div className="flex items-center space-x-4">
                {/* Affichage de l'image de profil */}
                {userProfile && userProfile.photoProfil ? (
                    <img
                        src={`http://localhost:5000/${userProfile.photoProfil}`} // Chemin complet vers la photo
                        alt="Photo de profil"
                        className="w-12 h-12 rounded-full object-cover" // Ajout de 'object-cover' pour rogner l'image
                    />
                ) : (
                    <img
                        src="default-profile.png" // Image par défaut si aucune photo n'est disponible
                        alt="Default Profile"
                        className="w-12 h-12 rounded-full object-cover" // Même style pour l'image par défaut
                    />
                )}
                <div className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                    {userProfile ? userProfile.nomUtilisateur : 'Utilisateur'}
                </div>
            </div>

            {/* Ici, vous pouvez ajouter d'autres éléments de la barre latérale */}
            <SidebareRowIcon isDarkMode={isDarkMode} /> {/* Passer la prop isDarkMode */}
        </div>
    );
};

export default Sidebar;
