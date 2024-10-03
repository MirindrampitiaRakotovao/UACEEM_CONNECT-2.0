import React, { useState } from 'react';
import axios from 'axios';
import {  PackageOpen  } from 'lucide-react';
import AudienceSelector from './ModalVisibilite';
import { useAudience } from '../services/audienceService';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = 'auto';  // Réinitialiser la hauteur
  textarea.style.height = `${textarea.scrollHeight}px`;  // Ajuster la hauteur
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
  const [files, setFiles] = useState<FileList | null>(null);
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

    const formData = new FormData();
    formData.append('visibilite', selectedAudience);
    formData.append('legende', legende);

    if (selectedAudience === 'Groupe') {
      formData.append('groupe_nom', designGroupePartage);
    }

    if (files) {
      Array.from(files).forEach((file) => {
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
      setFiles(null);
    } catch (error: any) {
      console.error('Erreur lors de la création de la publication:', error);
      setErrorMessage(error.response?.data?.message || 'Erreur inconnue');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold">Créer une publication</h2>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        ✖
      </button>
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
        required
      />

      {/* File Input */}
      <div className="flex">
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        className="form-file w-full mt-4 p-2 text-gray-700"
      />
      < PackageOpen />
      </div>

      {/* Error Message */}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      {/* Submit Button */}
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
