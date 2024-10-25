import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
  children: JSX.Element; // Le composant enfant (la page à afficher si authentifié)
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Vérifier si le token existe dans les cookies
  const token = Cookies.get('token');

  // Si le token n'existe pas, rediriger vers la page de connexion
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Sinon, afficher la page protégée
  return children;
};

export default ProtectedRoute;
