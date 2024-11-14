import 'react-toastify/dist/ReactToastify.css';

import { CheckCircle } from 'lucide-react'; // Importer l'icône de Lucide React
import { toast } from 'react-toastify';
import React from 'react';


// Importer l'icône de Lucide React

// Composant de toast personnalisé avec un message dynamique et typé
const toastSuccess = (message: string) => {
  toast.success(
    <div className="flex items-center">
      <span>{message}</span> {/* Message personnalisé */}
    </div>,
    {
      className: 'bg-green-50 border border-green-300 text-black rounded-lg p-4', // Styles Tailwind pour le toast
      autoClose: 5000, // Le toast se ferme après 5 secondes
      hideProgressBar: true, // Cacher la barre de progression
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }
  );
};

export default toastSuccess;
