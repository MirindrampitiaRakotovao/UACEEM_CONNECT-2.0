import { Image, FileText, Video, User, PenTool } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import axios from 'axios';

import { useTheme } from '../../../../../context/ThemeContext.tsx';
import PublicationModal from '../../../PublicationModal.tsx';


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
    const récupérerProfil = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/api/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProfilUtilisateur(res.data);
        } catch (err) {
          console.error('Erreur profil:', err);
        }
      }
    };
    récupérerProfil();
  }, []);

  const réinitialiserFormulaire = () => {
    setFichiersSélectionnés([]);
    setAudience(null);
    setTypeMedia('photo');
    setDescription('');
    setTypePublication(null);
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
    fichiersSélectionnés.forEach((fichier) => formData.append('image', fichier));

    try {
      await axios.post('http://localhost:5000/api/addPublication', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      toast.success('Publication ajoutée avec succès !');
      setModalOuvert(false);
      réinitialiserFormulaire();
    } catch (err) {
      toast.error("Erreur lors de l'ajout de la publication.");
    }
  };

  const outils = [
    { type: 'photo', icon: Image, color: 'text-blue-500' },
    { type: 'video', icon: Video, color: 'text-green-500' },
    { type: 'document', icon: FileText, color: 'text-amber-500' },
    { type: 'texte', icon: PenTool, color: 'text-purple-500' }
  ];

  return (
    <div className={`  ${isDarkMode ? 'bg-gradient-to-r from-[#2d3d53] to-[#29374b] text-white' : 'bg-white'} p-3 rounded-xl shadow-sm text-gray-500 font-medium`}>
      <motion.div 
        className="flex items-center space-x-3 cursor-pointer mt-2"
        onClick={() => setModalOuvert(true)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {profilUtilisateur?.photoProfil ? (
          <img
            src={`http://localhost:5000/${profilUtilisateur.photoProfil}`}
            alt="Profil"
            className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
        )}

        <div className={`flex-1 ${isDarkMode ? 'bg-[#3c475a] text-white' : 'bg-gray-100'} rounded-md px-3 py-1.5`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            {`Qu'avez-vous en tête, ${profilUtilisateur?.nomUtilisateur || 'Utilisateur'} ?`}
          </p>
        </div>
      </motion.div>

      <div className="flex justify-around py-2 border-t mt-4">
        {outils.map(({ type, icon: Icon, color }) => (
          <motion.div
            key={type}
            className="flex flex-col items-center cursor-pointer mt-2"
            onClick={() => { setTypeMedia(type as 'photo' | 'video' | 'document'); setModalOuvert(true); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon className={`h-4 w-4 ${color}`} />
            <p className="text-xs mt-0.5 capitalize">{type}</p>
          </motion.div>
        ))}
      </div>

      <PublicationModal
        isOpen={modalOuvert}
        onClose={() => { setModalOuvert(false); réinitialiserFormulaire(); }}
        profilUtilisateur={profilUtilisateur}
        audience={audience}
        setAudience={(type) => setAudience(prev => prev === type ? null : type)}
        typeMedia={typeMedia}
        setTypeMedia={setTypeMedia}
        description={description}
        setDescription={setDescription}
        typePublication={typePublication}
        setTypePublication={setTypePublication}
        fichiersSélectionnés={fichiersSélectionnés}
        gestionChangementFichier={(e) => {
          if (e.target.files) {
            setFichiersSélectionnés(prev => [...prev, ...Array.from(e.target.files || [])])
          }
        }}
        supprimerFichier={(index) => {
          setFichiersSélectionnés(files => files.filter((_, i) => i !== index))
        }}
        soumettrePublication={soumettrePublication}
      />
    </div>
  );
};

export default InputBox;