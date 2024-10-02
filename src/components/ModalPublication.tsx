import React from 'react';
import AudienceSelector from './ModalVisibilite'; // Assurez-vous de mettre le chemin correct

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalPublication: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Créer une publication</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        {/* Ajout du sélecteur d'audience ici */}
        <AudienceSelector />

        {/* Divider */}
        <hr className="w-full my-4 border-gray-300" />

        <textarea
          rows={4}
          className="w-full mt-4 p-2 border border-gray-300 rounded-md"
          placeholder="Quoi de neuf ?"
        />
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Publier</button>
      </div>
    </div>
  );
};

export default ModalPublication;
