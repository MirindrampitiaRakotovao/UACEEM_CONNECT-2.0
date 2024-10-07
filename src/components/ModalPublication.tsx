import React, { useState } from 'react';
import axios from 'axios';
import { PackageOpen , LucideTrash} from 'lucide-react';
import AudienceSelector from './ModalVisibilite';
import { useAudience } from '../services/audienceService';

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
  const [errorMessage, setErrorMessage] = useState('');

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

      console.log('Publication créée avec succès:', response.data);
      onClose();
      setLegende('');
      setFiles([]); // Réinitialiser les fichiers après soumission
    } catch (error: any) {
      console.error('Erreur lors de la création de la publication:', error);
      setErrorMessage(error.response?.data?.message || 'Erreur inconnue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Utiliser un tableau pour les fichiers sélectionnés
      setFiles(Array.from(e.target.files)); // Remplacer avec la nouvelle sélection
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index)); // Retirer un fichier par son index
  };

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
          <div
            className="flex justify-between items-center space-x-4 mt-4 p-3 border border-transparent rounded-lg hover:bg-gray-100 cursor-pointer"
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

          {/* Liste des fichiers sélectionnés */}
          {files.length > 0 && (
            <div className="mt-2">
              <h3 className="text-sm font-semibold">Fichiers sélectionnés :</h3>
              <ul className="list-disc list-inside">
                {files.map((file, index) => (
                  <li key={index} className="text-sm flex justify-between items-center">
                    {file.name}
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 ml-4"
                      onClick={() => removeFile(index)} // Bouton pour retirer le fichier
                    >
                      <LucideTrash />
                    </button>
                  </li>
                ))}
              </ul>
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
