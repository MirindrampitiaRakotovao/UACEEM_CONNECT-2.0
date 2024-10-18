import React, { useState } from 'react';
import { useEditProfileModal } from '../../services/editProfilService';
import { useNavigate } from 'react-router-dom';  
import { UserRoundPenIcon } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext'; // Importer le hook du mode sombre

interface EditProfileModalProps {
  isOpen: boolean;
  closeModal: () => void;
  bio: string;
  nom: string;
  username: string;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, closeModal, bio, nom, username }) => {
  const { formData, loading, error, success, handleInputChange, handleFileChange, handleSubmit } = useEditProfileModal(bio);
  const navigate = useNavigate();  
  const [imagePreview, setImagePreview] = useState<string | null>(null);  
  const { isDarkMode } = useDarkMode();  // Utiliser le hook pour détecter le mode sombre

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';  
    textarea.style.height = `${textarea.scrollHeight}px`;  
  };

  const handleSave = async () => {
    await handleSubmit();  
    if (success) {
      closeModal();  
      navigate(`/profile/${username}`);  
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));  
      handleFileChange(e);  
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className={`rounded-lg shadow-lg w-96 p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Éditer Profil</h2>
          <button onClick={closeModal} className={`text-${isDarkMode ? 'gray-400' : 'gray-500'} hover:text-${isDarkMode ? 'white' : 'gray-700'}`}>
            ✖
          </button>
        </div>

        <hr className={`w-full my-4 border-${isDarkMode ? 'gray-600' : 'gray-300'}`} />

        <div className="flex items-center justify-between mt-5 mb-10">
          <div>
            <p>{nom}</p>
            <p>@{username}</p>
          </div>
          <label htmlFor="photo-upload" className="relative">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile Preview" className="w-8 h-8 object-cover rounded-full" />
            ) : (
              <UserRoundPenIcon className={`w-8 h-8 cursor-pointer ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            )}
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-10">
          <label htmlFor="bio" className="block text-sm font-medium">
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
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            rows={1}
            style={{ overflow: 'hidden' }}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="mt-6 flex justify-end">
          <button
            className={`py-2 px-4 rounded-lg w-full ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
            onClick={handleSave}
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
