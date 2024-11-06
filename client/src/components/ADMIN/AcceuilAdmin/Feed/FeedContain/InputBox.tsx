import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Image, FileText, Video, User, PenTool } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTheme } from '../../../../../context/ThemeContext';
import { motion } from 'framer-motion';
import PublicationModal from '../../../../PublicationModal';

interface ProfilUtilisateur {
  photoProfil: string;
  nomUtilisateur: string;
}

const InputBox: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [profilUtilisateur, setProfilUtilisateur] = useState<ProfilUtilisateur | null>(null);
  const [modalOuvert, setModalOuvert] = useState(false);
  const [fichiersSélectionnés, setFichiersSélectionnés] = useState<File[]>([]);
  const [audience, setAudience] = useState<'public' | 'etudiants' | null>(null);
  const [typeMedia, setTypeMedia] = useState<'photo' | 'video' | 'document'>('photo');
  const [description, setDescription] = useState('');
  const [typePublication, setTypePublication] = useState<'annonce' | 'forum' | null>(null);

  useEffect(() => {
    const récupérerProfilUtilisateur = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/api/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProfilUtilisateur(res.data);
        } catch (erreur) {
          console.error('Erreur lors de la récupération du profil :', erreur);
        }
      }
    };

    récupérerProfilUtilisateur();
  }, []);

  const ouvrirModal = () => setModalOuvert(true);
  
  const fermerModal = () => {
    setModalOuvert(false);
    réinitialiserFormulaire();
  };

  const réinitialiserFormulaire = () => {
    setFichiersSélectionnés([]);
    setAudience(null);
    setTypeMedia('photo');
    setDescription('');
    setTypePublication(null);
  };

  const gestionChangementFichier = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const tableauFichiers = Array.from(e.target.files);
      setFichiersSélectionnés((fichiersPrécédents) => [...fichiersPrécédents, ...tableauFichiers]);
    }
  };

  const supprimerFichier = (index: number) => {
    setFichiersSélectionnés((fichiers) => fichiers.filter((_, i) => i !== index));
  };

  const changerAudience = (typeAudience: 'public' | 'etudiants') => {
    setAudience((précédent) => (précédent === typeAudience ? null : typeAudience));
    setFichiersSélectionnés([]);
  };

  const soumettrePublication = async () => {
    if (!audience || !typePublication) {
      toast.error("Veuillez sélectionner une audience et un type de publication.");
      return;
    }

    const formData = new FormData();
    formData.append('audience', audience);
    formData.append('type', typePublication);
    formData.append('description', description);

    fichiersSélectionnés.forEach((fichier) => {
      formData.append(`image`, fichier);
    });

    try {
      const réponse = await axios.post('http://localhost:5000/api/addPublication', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      toast.success('Publication ajoutée avec succès !');
      console.log('Publication ajoutée avec succès:', réponse.data);
      fermerModal();
    } catch (erreur) {
      console.error('Erreur lors de l\'ajout de la publication:', erreur);
      toast.error("Une erreur s'est produite lors de l'ajout de la publication. Veuillez réessayer.");
    }
  };

  return (
    <div className={`w-full bg-white ${isDarkMode ? 'bg-gradient-to-r from-[#2d3d53] to-[#29374b] shadow-md text-white' : ''} p-4 rounded-xl shadow-lg text-gray-500 font-medium transition-all duration-300`}>
      <motion.div 
        className="flex items-center space-x-3 cursor-pointer"
        onClick={ouvrirModal}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {profilUtilisateur && profilUtilisateur.photoProfil ? (
          <img
            src={`http://localhost:5000/${profilUtilisateur.photoProfil}`}
            alt="Photo de profil"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-500" />
          </div>
        )}

        <div className={`flex-1 bg-gray-100 ${isDarkMode ? 'bg-[#3c475a] text-white' : ''} rounded-md px-4 py-2 transition-all duration-300`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            {`Qu'avez-vous en tête, ${profilUtilisateur?.nomUtilisateur || 'Utilisateur'} ?`}
          </p>
        </div>
      </motion.div>

      <div className="flex justify-around p-3 border-t mt-3">
        {[
          { type: 'photo', icon: Image, color: 'text-blue-500' },
          { type: 'video', icon: Video, color: 'text-green-500' },
          { type: 'document', icon: FileText, color: 'text-amber-500' },
          { type: 'texte', icon: PenTool, color: 'text-purple-500' }
        ].map(({ type, icon: Icon, color }) => (
          <motion.div
            key={type}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => { setTypeMedia(type as 'photo' | 'video' | 'document'); ouvrirModal(); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon className={`h-5 w-5 ${color}`} />
            <p className="text-xs mt-1 capitalize"> {type} </p>
          </motion.div>
        ))}
      </div>

      <PublicationModal
        isOpen={modalOuvert}
        onClose={fermerModal}
        profilUtilisateur={profilUtilisateur}
        audience={audience}
        setAudience={changerAudience}
        typeMedia={typeMedia}
        setTypeMedia={setTypeMedia}
        description={description}
        setDescription={setDescription}
        typePublication={typePublication}
        setTypePublication={setTypePublication}
        fichiersSélectionnés={fichiersSélectionnés}
        gestionChangementFichier={gestionChangementFichier}
        supprimerFichier={supprimerFichier}
        soumettrePublication={soumettrePublication}
      />
    </div>
  );
};

export default InputBox;