import React from 'react';
import { useEditProfileModal } from '../services/editProfilService';
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
  const { formData,  loading, error, success, handleInputChange, handleFileChange, handleSubmit } = useEditProfileModal(bio);
  const navigate = useNavigate();  // Initialiser la navigation

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';  // Réinitialiser la hauteur
    textarea.style.height = `${textarea.scrollHeight}px`;  // Ajuster la hauteur
  };

  const handleSave = async () => {
    await handleSubmit();  // Soumettre le formulaire
    if (success) {
      closeModal();  // Fermer le modal
      navigate('/profile/:username');  // Rediriger vers UserProfile
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        <div className="flex items-center justify-between mt-5 mb-10">
          <div>
            <p>{nom}</p>
            <p>@{username}</p>
          </div>
          <label htmlFor="photo-upload">
            <UserRoundPenIcon className="w-8 h-8 cursor-pointer" />
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
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
            className="mt-1 block w-full h-auto p-2 border border-gray-300 rounded-md shadow-sm"
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
