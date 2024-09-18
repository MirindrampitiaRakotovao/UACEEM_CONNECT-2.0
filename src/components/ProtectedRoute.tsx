import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Si l'utilisateur n'est pas authentifié, redirige vers la page de connexion
    return <Navigate to="/" />;
  }

  // Si l'utilisateur est authentifié, affiche la page demandée
  return children;
};

export default ProtectedRoute;
