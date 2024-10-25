import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // L'application avec toutes les routes
import { ThemeProvider } from './context/ThemeContext'; // Importer le ThemeProvider
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; // Vos styles globaux
import { ToastContainer } from 'react-toastify';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!); // Utilisation de createRoot pour React 18

root.render(
  <React.StrictMode>
    <ThemeProvider> {/* Envelopper avec ThemeProvider */}
      <Router>
        <App /> {/* Utilisez App ici pour inclure toutes les routes */}
        <ToastContainer
          position="bottom-right" // Positionner le toast en bas à droite
          autoClose={5000} // Fermer automatiquement après 5 secondes
          hideProgressBar={false} // Afficher la barre de progression
          newestOnTop={false} // Ne pas empiler les nouveaux au-dessus des anciens
          closeOnClick // Fermer le toast au clic
          rtl={false} // Orientation de droite à gauche
          pauseOnFocusLoss // Mettre en pause lors de la perte de focus
          draggable // Permettre le glissement pour fermer
          pauseOnHover // Mettre en pause au survol
        />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
