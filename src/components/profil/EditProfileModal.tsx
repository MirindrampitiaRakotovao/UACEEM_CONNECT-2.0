import React, { useState } from 'react';
import { useEditProfileModal } from '../../services/editProfilService';
import { useNavigate } from 'react-router-dom';  // Ajout pour la navigation
import { UserRoundPenIcon } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  closeModal: () => void;
  bio: string;
  nom: string;
  username: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, closeModal, bio, nom, username }) => {
  const { formData, loading, error, success, handleInputChange, handleFileChange, handleSubmit } = useEditProfileModal(bio);
  const navigate = useNavigate();  // Initialiser la navigation

  const [imagePreview, setImagePreview] = useState<string | null>(null);  // État pour l'aperçu de l'image

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';  // Réinitialiser la hauteur
    textarea.style.height = `${textarea.scrollHeight}px`;  // Ajuster la hauteur
  };

  const handleSave = async () => {
    await handleSubmit();  // Soumettre le formulaire
    if (success) {
      closeModal();  // Fermer le modal
      navigate(`/profile/${username}`);  // Rediriger vers UserProfile
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));  // Créer un aperçu de l'image
      handleFileChange(e);  // Passer l'image au service de gestion
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Editer Profil</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        {/* Divider */}
        <hr className="w-full my-4 border-gray-300" />

        <div className="flex items-center justify-between mt-5 mb-10">
          <div>
            <p>{nom}</p>
            <p>@{username}</p>
          </div>
          <label htmlFor="photo-upload" className="relative">
            {imagePreview ? (
              // Afficher l'aperçu de l'image
              <img src={imagePreview} alt="Profile Preview" className="w-8 h-8 object-cover rounded-full" />
            ) : (
              // Afficher l'icône si aucune image n'est sélectionnée
              <UserRoundPenIcon className="w-8 h-8 cursor-pointer" />
            )}
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}  // Utiliser la fonction handleImageChange
          />
        </div>

        {/* Bio Input */}
        <div className="mb-10">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={(e) => {
              handleInputChange(e);
              autoResizeTextarea(e.target);
            }}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
            style={{ overflow: 'hidden' }}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        

        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
            onClick={handleSave}  // Utiliser handleSave pour soumettre et rediriger
            disabled={loading}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
