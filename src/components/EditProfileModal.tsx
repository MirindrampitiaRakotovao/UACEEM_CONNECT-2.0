import React from 'react';
import { useEditProfileModal } from '../services/editProfilService';
import { UserRoundPenIcon } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  closeModal: () => void;
  bio: string;
  nom: string;
  username: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, closeModal, bio, nom, username }) => {
  const { formData, loading, error, success, handleInputChange, handleSubmit } = useEditProfileModal(bio);

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

        {/* Information non modifiable */}
        <div className="flex items-center justify-between mt-5 mb-10">
          <div className="">
            <p>{nom}</p>
            <p> @{username}</p>

          </div>
          < UserRoundPenIcon className="w-8 h-8"/>
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
            onChange={handleInputChange}
            className="mt-1 block w-full h-auto p-2 border border-gray-10 rounded-md shadow-sm"
            rows={4}
          />
        </div>

        {/* Affichage d'erreurs */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        {/* Message de succès */}
        {success && <p className="text-green-500 text-sm">Profil mis à jour avec succès</p>}

        {/* Boutons */}
        <div className="mt-6 flex justify-between">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
            onClick={handleSubmit}
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
