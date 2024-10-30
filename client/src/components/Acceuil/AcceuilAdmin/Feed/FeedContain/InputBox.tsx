import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Image, PackageOpenIcon, Globe, User, X, Video, Newspaper, ClipboardMinus, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTheme } from '../../../../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfilUtilisateur {
  photoProfil: string;
  nomUtilisateur: string;
}

const InputBox = () => {
  const { isDarkMode } = useTheme();
  const [profilUtilisateur, setProfilUtilisateur] = useState<ProfilUtilisateur | null>(null);
  const [modalOuvert, setModalOuvert] = useState(false);
  const [fichiersSélectionnés, setFichiersSélectionnés] = useState<File[]>([]);
  const [voirPlus, setVoirPlus] = useState(false);
  const [audience, setAudience] = useState<'public' | 'etudiants' | null>(null);
  const [typeMedia, setTypeMedia] = useState<'photo' | 'video' | 'document'>('photo');
  const [description, setDescription] = useState('');
  const [typePublication, setTypePublication] = useState<'annonce' | 'forum' | null>(null);

  const refInputFichier = useRef<HTMLInputElement>(null);
  const refInputDocument = useRef<HTMLInputElement>(null);

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

  const renderApercuFichiers = () => {
    const fichiersAMontrer = voirPlus ? fichiersSélectionnés : fichiersSélectionnés.slice(0, 4);

    return (
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <AnimatePresence>
          {fichiersAMontrer.map((fichier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              {fichier.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(fichier)}
                  alt={`sélectionné-${index}`}
                  className="w-full h-full object-cover"
                />
              ) : fichier.type.startsWith('video/') ? (
                <video className="w-full h-full object-cover" controls>
                  <source src={URL.createObjectURL(fichier)} type={fichier.type} />
                  Votre navigateur ne supporte pas la vidéo.
                </video>
              ) : (
                <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center p-2">
                  <PackageOpenIcon className="h-12 w-12 text-gray-500 mb-2" />
                  <p className="text-xs text-center truncate w-full">{fichier.name}</p>
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-1 right-1 bg-red-500 rounded-full p-1 hover:bg-red-600"
                onClick={() => supprimerFichier(index)}
              >
                <X className="text-white w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className={`bg-white ${isDarkMode ? 'bg-gradient-to-r from-[#2d3d53] to-[#29374b] shadow-md text-white' : ''} p-4 rounded-2xl shadow-lg text-gray-500 font-medium transition-all duration-300 w-full max-w-7xl mx-auto`}>
      <motion.div 
        className="flex items-center space-x-4 p-4 cursor-pointer"
        onClick={ouvrirModal}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {profilUtilisateur && profilUtilisateur.photoProfil ? (
          <img
            src={`http://localhost:5000/${profilUtilisateur.photoProfil}`}
            alt="Photo de profil"
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="w-8 h-8 text-gray-500" />
          </div>
        )}

        <div className={`flex-1 bg-gray-100 ${isDarkMode ? 'bg-[#414e64] text-white' : ''} rounded-md px-5 py-3 transition-all duration-300`}>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            {`Qu'avez-vous en tête, ${profilUtilisateur?.nomUtilisateur || 'Utilisateur'} ?`}
          </p>
        </div>
      </motion.div>

      <div className="flex justify-evenly p-3 border-t">
        {['photo', 'video', 'document'].map((type) => (
          <motion.div
            key={type}
            className="inputIcon"
            onClick={() => { setTypeMedia(type as 'photo' | 'video' | 'document'); ouvrirModal(); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {type === 'photo' && <Image className="h-7 text-blue-500" />}
            {type === 'video' && <Video className="h-7 text-green-500" />}
            {type === 'document' && <PackageOpenIcon className="h-7 text-amber-500" />}
            <p className="text-xs sm:text-sm xl:text-base capitalize"> {type} </p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modalOuvert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              className={`bg-white ${isDarkMode ? 'dark:bg-[#1F2937]' : ''} rounded-xl w-full max-w-2xl p-6 relative shadow-2xl`}
            >
              <button
                onClick={fermerModal}
                className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                Créer une publication
              </h2>
              <div className="flex items-center mb-6">
                {profilUtilisateur && profilUtilisateur.photoProfil ? (
                  <img
                    src={`http://localhost:5000/${profilUtilisateur.photoProfil}`}
                    alt="Photo de profil"
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-indigo-500 dark:border-indigo-400"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <User className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                  </div>
                )}
                
                <div className="flex flex-col">
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">
                    {profilUtilisateur?.nomUtilisateur}
                  </span>
                  <div className="flex items-center mt-2 space-x-4">
                    {['public', 'etudiants'].map((aud) => (
                      <motion.label
                        key={aud}
                        className={`inline-flex items-center cursor-pointer ${
                          audience === aud 
                            ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        } p-2 rounded-full transition-all duration-200`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {aud === 'public' ? 
                          <Globe className={`h-5 w-5 mr-2 ${audience === aud ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`} /> : 
                          <User className={`h-5 w-5 mr-2 ${audience === aud ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`} />
                        }
                        <input
                          type="radio"
                          name="audience"
                          value={aud}
                          checked={audience === aud}
                          onChange={() => changerAudience(aud as 'public' | 'etudiants')}
                          className="hidden"
                        />
                        <span className="capitalize text-sm">{aud}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>
              </div>
              <textarea
                className={`w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg 
                ${isDarkMode 
                  ? 'dark:bg-gray-800 dark:text-white placeholder-gray-400' 
                  : 'bg-gray-50 text-gray-900 placeholder-gray-500'
                } 
                transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none`}
                placeholder={`Qu'est-ce que vous avez à dire, ${profilUtilisateur?.nomUtilisateur} ?`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="my-6">
                <p className="font-bold mb-3 text-gray-900 dark:text-white">Type de publication :</p>
                <div className="flex space-x-4">
                  {['annonce', 'forum'].map((type) => (
                    <motion.label
                      key={type}
                      className={`flex items-center space-x-2 cursor-pointer ${
                        typePublication === type 
                          ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      } p-2 rounded-lg transition-all duration-200`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {type === 'annonce' ? 
                        <Newspaper className={`h-5 w-5 ${typePublication === type ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`} /> : 
                        <ClipboardMinus className={`h-5 w-5 ${typePublication === type ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`} />
                      }
                      <input
                        type="radio"
                        name="typePublication"
                        value={type}
                        checked={typePublication === type}
                        onChange={() => setTypePublication(type as 'annonce' | 'forum')}
                        className="hidden"
                      />
                      <span className="capitalize text-sm">{type}</span>
                    </motion.label>
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-indigo-500 dark:bg-indigo-600 text-white w-full px-4 py-3 rounded-lg 
                hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors duration-300 
                flex items-center justify-center space-x-2 shadow-md"
                onClick={() => typeMedia === 'document' ? refInputDocument.current?.click() : refInputFichier.current?.click()}
              >
                                <span>Ajouter {typeMedia === 'photo' ? 'Photos' : typeMedia === 'video' ? 'Vidéos' : 'Documents'}</span>
                {typeMedia === 'photo' && <Image className="h-5 w-5" />}
                {typeMedia === 'video' && <Video className="h-5 w-5" />}
                {typeMedia === 'document' && <PackageOpenIcon className="h-5 w-5" />}
              </motion.button>

              <input
                type="file"
                accept={
                  typeMedia === 'photo'
                    ? 'image/*'
                    : typeMedia === 'video'
                    ? 'video/*'
                    : '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'
                }
                multiple
                className="hidden"
                ref={typeMedia === 'document' ? refInputDocument : refInputFichier}
                onChange={gestionChangementFichier}
              />

              <div className="mt-4">
                {renderApercuFichiers()}
                {fichiersSélectionnés.length > 4 && !voirPlus && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVoirPlus(true)}
                    className="mt-2 text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors duration-200"
                  >
                    Voir plus...
                  </motion.button>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={soumettrePublication}
                className="mt-6 bg-green-500 dark:bg-green-600 text-white w-full px-6 py-3 rounded-lg 
                hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-300 
                flex items-center justify-center space-x-2 shadow-md"
                disabled={!audience || !typePublication || description.trim() === ''}
              >
                <span>Publier</span>
                <Send className="h-5 w-5" />
              </motion.button>

              {(!audience || !typePublication || description.trim() === '') && (
                <p className="mt-2 text-sm text-red-500 dark:text-red-400 text-center">
                  Veuillez remplir tous les champs requis avant de publier.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputBox;