// ConfirmDeleteModal.tsx
import React from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold">Confirmation de suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
        <div className="mt-4 flex justify-end">
          <button className="mr-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-md" onClick={onClose}>
            Annuler
          </button>
          <button className="px-4 py-2 text-white bg-red-600 rounded-md" onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
