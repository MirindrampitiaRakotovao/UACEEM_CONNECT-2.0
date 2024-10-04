import React from 'react';
import {  CircleX } from 'lucide-react';

interface ModalFileProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
}

const ModalFile: React.FC<ModalFileProps> = ({ isOpen, onClose, fileUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Contenu du modal */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
        {/* Bouton de fermeture */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          < CircleX />
          </button>
        </div>

        {/* Contenu du fichier */}
        <div className="p-6">
          <img src={fileUrl} alt="Fichier sélectionné" className="object-contain max-h-[80vh] mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default ModalFile;
