// ModalFile.tsx
import React from 'react';
import { Dialog } from '@headlessui/react'; // Assuming you're using Headless UI for modals

type ModalFileProps = {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
};

const ModalFile: React.FC<ModalFileProps> = ({ isOpen, onClose, fileUrl }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black opacity-30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <img src={fileUrl} alt="Fichier" className="w-full rounded-md" />
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Fermer
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalFile;
