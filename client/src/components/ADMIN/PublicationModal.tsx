import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, User, Image, Video, PackageOpenIcon, Newspaper, ClipboardMinus, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface PublicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    profilUtilisateur: { photoProfil: string; nomUtilisateur: string } | null;
    audience: 'public' | 'etudiants' | null;
    setAudience: (audience: 'public' | 'etudiants') => void;
    typeMedia: 'photo' | 'video' | 'document';
    setTypeMedia: (type: 'photo' | 'video' | 'document') => void;
    description: string;
    setDescription: (description: string) => void;
    typePublication: 'annonce' | 'forum' | null;
    setTypePublication: (type: 'annonce' | 'forum') => void;
    fichiersSélectionnés: File[];
    gestionChangementFichier: (e: React.ChangeEvent<HTMLInputElement>) => void;
    supprimerFichier: (index: number) => void;
    soumettrePublication: () => void;
}

const PublicationModal: React.FC<PublicationModalProps> = ({
  isOpen,
  onClose,
  profilUtilisateur,
  audience,
  setAudience,
  typeMedia,
  setTypeMedia,
  description,
  setDescription,
  typePublication,
  setTypePublication,
  fichiersSélectionnés,
  gestionChangementFichier,
  supprimerFichier,
  soumettrePublication
}) => {
  const { isDarkMode } = useTheme();
  const refInputFichier = useRef<HTMLInputElement>(null);

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
            className={`${
              isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
            } p-6 rounded-lg shadow-xl max-w-md w-full mx-4`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Créer une publication</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 mb-4">
              <div className="flex items-center space-x-3">
                {profilUtilisateur && profilUtilisateur.photoProfil ? (
                  <img
                    src={`http://localhost:5000/${profilUtilisateur.photoProfil}`}
                    alt="Photo de profil"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                )}
                <span className="text-sm font-medium">{profilUtilisateur?.nomUtilisateur}</span>
              </div>

              <div className="flex space-x-2">
                {['public', 'etudiants'].map((aud) => (
                  <button
                    key={aud}
                    onClick={() => setAudience(aud as 'public' | 'etudiants')}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      audience === aud
                        ? isDarkMode 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-100 text-blue-800'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {aud === 'public' ? <Globe size={12} className="inline mr-1" /> : <User size={12} className="inline mr-1" />}
                    {aud}
                  </button>
                ))}
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Que voulez-vous partager ?"
                className={`w-full p-2 rounded-md text-sm ${
                  isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-900'
                } border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
                rows={3}
              />

              <div className="flex space-x-2">
                {['annonce', 'forum'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypePublication(type as 'annonce' | 'forum')}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      typePublication === type
                        ? isDarkMode 
                          ? 'bg-green-600 text-white' 
                          : 'bg-green-100 text-green-800'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {type === 'annonce' ? <Newspaper size={12} className="inline mr-1" /> : <ClipboardMinus size={12} className="inline mr-1" />}
                    {type}
                  </button>
                ))}
              </div>

              <button
                onClick={() => refInputFichier.current?.click()}
                className={`w-full px-3 py-1.5 rounded-md text-xs font-medium ${
                  isDarkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {typeMedia === 'photo' && <Image size={12} className="inline mr-1" />}
                {typeMedia === 'video' && <Video size={12} className="inline mr-1" />}
                {typeMedia === 'document' && <PackageOpenIcon size={12} className="inline mr-1" />}
                Ajouter {typeMedia === 'photo' ? 'des photos' : typeMedia === 'video' ? 'des vidéos' : 'des documents'}
              </button>

              <input
                type="file"
                ref={refInputFichier}
                onChange={gestionChangementFichier}
                accept={typeMedia === 'photo' ? 'image/*' : typeMedia === 'video' ? 'video/*' : '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'}
                multiple
                className="hidden"
              />

              {fichiersSélectionnés.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {fichiersSélectionnés.map((fichier, index) => (
                    <div key={index} className="relative">
                      {fichier.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(fichier)}
                          alt={`Aperçu ${index}`}
                          className="w-full h-16 object-cover rounded"
                        />
                      ) : (
                        <div className={`w-full h-16 flex items-center justify-center rounded ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {fichier.name.slice(0, 10)}...
                          </span>
                        </div>
                      )}
                      <button
                        onClick={() => supprimerFichier(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-1.5 text-xs rounded ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors duration-200`}
                onClick={onClose}
              >
                Annuler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-1.5 text-xs text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-200"
                onClick={soumettrePublication}
              >
                Publier
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PublicationModal;