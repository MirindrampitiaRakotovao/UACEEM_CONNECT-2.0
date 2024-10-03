import React, { useState } from 'react';
import axios from 'axios';
import AudienceSelector from './ModalVisibilite'; // Chemin correct
import { useAudience } from '../services/audienceService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalPublication: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const {
    selectedAudience, // Gardé car utilisé
    designGroupePartage, // Gardé car utilisé
  } = useAudience();

  const [legende, setLegende] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('visibilite', selectedAudience);
    formData.append('legende', legende);

    if (selectedAudience === 'Groupe') {
      formData.append('design_groupe_partage', designGroupePartage);
    }

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
    }

    try {
      // Envoie la requête à l'URL de création de publication sur le backend
      const response = await axios.post('http://localhost:4000/publication/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Publication créée avec succès:', response.data);
      onClose(); // Fermer le modal après la soumission réussie
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
          <h2 className="text-xl font-semibold">Créer une publication</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <AudienceSelector />
          <hr className="w-full my-4 border-gray-300" />

          <textarea
            rows={4}
            className="w-full mt-4 p-2 border border-gray-300 rounded-md"
            placeholder="Quoi de neuf ?"
            value={legende}
            onChange={(e) => setLegende(e.target.value)}
            required
          />

          <input 
            type="file" 
            multiple 
            onChange={(e) => setFiles(e.target.files)} 
            className="mt-4"
          />

          {errorMessage && (
            <div className="mt-2 text-red-500">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Publier...' : 'Publier'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalPublication;
