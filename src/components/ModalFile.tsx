import React from 'react';
import { CircleX } from 'lucide-react';

interface File {
  url_fichier: string;
}

interface ModalFileProps {
  isOpen: boolean;
  onClose: () => void;
  files: File[];  // Recevoir plusieurs fichiers
}

const ModalFile: React.FC<ModalFileProps> = ({ isOpen, onClose, files }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Contenu du modal */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-xl mx-auto w-full max-h-[90vh] overflow-y-auto">
        {/* Bouton de fermeture */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <CircleX />
          </button>
        </div>

        {/* Contenu des fichiers */}
        <div className="p-6 flex flex-col space-y-4 justify-center">
          {files.map((file, index) => (
            <img
              key={index}
              src={file.url_fichier}
              alt={`Fichier ${index + 1}`}
              className="w-full max-w-lg h-auto object-cover rounded-2xl cursor-pointer p-0.5"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalFile;
