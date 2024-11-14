import 'react-toastify/dist/ReactToastify.css';

import { AlertCircle } from 'lucide-react'; // Importer l'icône d'erreur de Lucide React
import { toast } from 'react-toastify';
import React from 'react';


// Importer l'icône d'erreur de Lucide React

// Composant de toast d'erreur personnalisé avec un message dynamique
const toastError = (message: string) => {
  toast.error(
    <div className="flex items-center">
      <span>{message}</span> {/* Message personnalisé */}
    </div>,
    {
      className: 'bg-red-50 border border-red-300 text-black rounded-lg p-4', // Styles Tailwind pour le toast
      autoClose: 5000, // Le toast se ferme après 5 secondes
      hideProgressBar: true, // Cacher la barre de progression
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }
  );
};

export default toastError;
