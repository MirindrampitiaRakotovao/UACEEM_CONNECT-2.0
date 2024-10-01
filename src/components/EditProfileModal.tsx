import React from 'react';

interface EditProfileModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, closeModal }) => {
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

        {/* Formulaire d'édition */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="TOLOTRINIAVO Faniriniana Lucia"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <input
            type="text"
            placeholder="+ Write bio"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Link</label>
          <input
            type="text"
            placeholder="+ Add link"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* Profil privé */}
        <div className="flex items-center mb-4">
          <span className="text-sm text-gray-700">Private profile</span>
          <label className="ml-auto relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-300 peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />
          </label>
        </div>

        {/* Bouton de fermeture */}
        <button
          onClick={closeModal}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
