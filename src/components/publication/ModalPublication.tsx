import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { PackageOpen , LucideTrash , Smile} from 'lucide-react';
import AudienceSelector from './ModalVisibilite';
import { useAudience } from '../../services/audienceService';
import socketService from '../../services/socketService';
import EmojiPicker , { EmojiClickData } from 'emoji-picker-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
};

const ModalPublication: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const {
    selectedAudience,
    designGroupePartage,
    setDesignGroupePartage,
    isAudienceModalOpen,
    handleOpenAudienceModal,
    handleCloseAudienceModal,
    handleSelectAudience,
  } = useAudience();

  const [legende, setLegende] = useState('');
  const [files, setFiles] = useState<File[]>([]); // Fichiers stockés dans un tableau
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Ref pour le conteneur de l'emoji picker
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    if (selectedAudience === 'Groupe' && !designGroupePartage) {
      setErrorMessage("Veuillez entrer un nom de groupe.");
      setIsSubmitting(false);
      return;
    }

      // Vérifiez si au moins une légende ou un fichier est fourni
    if (!legende.trim() && files.length === 0) {
      setErrorMessage("Veuillez ajouter une légende ou sélectionner au moins un fichier.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('visibilite', selectedAudience);
    formData.append('legende', legende);

    if (selectedAudience === 'Groupe') {
      formData.append('groupe_nom', designGroupePartage);
    }

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append('fichiers', file);
      });
    }

    try {
      const response = await axios.post('http://localhost:4000/publication/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Émettre l'événement de nouvelle publication via WebSocket
      socketService.emitNewPublication(response.data);

      console.log('Publication créée avec succès:', response.data);
      onClose();
      setLegende('');
      setFiles([]); 
      setSelectedFileIndex(null);
    } catch (error: any) {
      console.error('Erreur lors de la création de la publication:', error);
      setErrorMessage(error.response?.data?.message || 'Erreur inconnue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Use Array.from only when files is not null
      setFiles(Array.from(files));
    }
  };

  const handleFileClick = (index: number) => {
    // Sélectionner ou désélectionner un fichier
    setSelectedFileIndex(index === selectedFileIndex ? null : index);
  };
  
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    if (selectedFileIndex === index) {
      setSelectedFileIndex(null); // Réinitialiser si le fichier supprimé est sélectionné
    }
  };

  // Fonction pour ajouter un emoji à la légende
  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setLegende((prev) => prev + emojiObject.emoji);
  };
  
  // Fonction pour détecter le clic en dehors du sélecteur d'emojis
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Créer une publication</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✖</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          {/* Audience Selector */}
          <AudienceSelector
            selectedAudience={selectedAudience}
            isAudienceModalOpen={isAudienceModalOpen}
            handleOpenAudienceModal={handleOpenAudienceModal}
            handleCloseAudienceModal={handleCloseAudienceModal}
            handleSelectAudience={handleSelectAudience}
            designGroupePartage={designGroupePartage}
            setDesignGroupePartage={setDesignGroupePartage}
          />

          <hr className="w-full my-4 border-gray-300" />

          {/* Textarea */}
          <textarea
            rows={1}
            className="form-textarea w-full p-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ajouter une légende..."
            value={legende}
            onChange={(e) => {
              setLegende(e.target.value);
              autoResizeTextarea(e.target);
            }}
          />

          {/* Boutons pour les fichiers et autres éléments */}
          <div className="flex items-center">
          <div
            className="flex justify-between items-center space-x-4 mt-4 p-3 border border-transparent rounded-lg hover:bg-gray-100 cursor-pointer w-full mr-3"
            onClick={() => document.getElementById('file-input')?.click()} // Ouvrir l'input file sur le clic du div entier
          >
            <label className="flex items-center">
              <input
                type="file"
                id="file-input"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
              <PackageOpen className="text-blue-600 hover:text-blue-800" size={32} />
              <span className="ml-2 text-blue-600 hover:text-blue-800 font-medium">Ajouter des fichiers</span>
            </label>
          </div>
          <Smile
              className="ml-auto mt-3 cursor-pointer"
              size={32}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          </div>

          {showEmojiPicker && (
            <div
              className="emoji-picker-container mt-2"
              ref={emojiPickerRef}
              onMouseLeave={() => setShowEmojiPicker(false)} // Ferme le sélecteur d'emojis lorsque la souris quitte la zone
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

         {/* Liste des fichiers sélectionnés */}
         {files.length > 0 && (
            <div className="mt-2">
              <div className="flex -space-x-4 overflow-x-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className={`relative transition-transform duration-300 ${
                      selectedFileIndex === index ? 'transform scale-150 z-10' : ''
                    }`}
                    onClick={() => handleFileClick(index)}
                  >
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Aperçu du fichier ${file.name}`}
                        className={`w-8 h-8 rounded-full object-cover border-2 border-white transition-transform duration-300 ${
                          selectedFileIndex === index ? 'w-16 h-16' : ''
                        }`}
                      />
                    ) : (
                      <div
                        className={`w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-white transition-transform duration-300 ${
                          selectedFileIndex === index ? 'w-32 h-32' : ''
                        }`}
                      >
                        <span className="text-sm">Fichier</span>
                      </div>
                    )}

                    {/* Afficher l'icône de suppression uniquement si le fichier est sélectionné */}
                    {selectedFileIndex === index && (
                      <button
                        type="button"
                        className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-md text-red-500 hover:text-red-700"
                        onClick={() => removeFile(index)}
                      >
                        <LucideTrash size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}



          {/* Message d'erreur */}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`form-button w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Publier...' : 'Publier'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalPublication;
