import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Form from './components/Form'; // Composant du formulaire de connexion
import AcceuilProfesseur from './Pages/Acceuil/AcceuilProfesseur/AcceuilProfesseur';
import AcceuilAdmin from './Pages/Acceuil/AcceuilAdmin/AcceuilAdmin';
import AcceuilAssociation from './Pages/Acceuil/AcceuilAssociation/AcceuilAssociation';
import AcceuilClub from './Pages/Acceuil/AcceuilClub/AcceuilClub';
import AcceuilUser from './Pages/Acceuil/AcceuilUser/AcceuilUser';
import UserList from './Pages/UserManagment/UserList';
import UserAdd from './Pages/UserManagment/UserAdd';
import UserModify from './Pages/UserManagment/UserModify';
import UserProfile from './Pages/Profile/UserProfile';
import SignalementList from './Pages/Signalement/SignalementList';
import { useTheme } from './context/ThemeContext';
import PostUser from "./Pages/Profile/PostUser.tsx"; // Importer le hook pour utiliser le contexte de thème

const App: React.FC = () => {
  const { isDarkMode } = useTheme(); // Utiliser le hook pour obtenir l'état du mode sombre

  // Utiliser useEffect pour manipuler le body directement
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark'); // Ajouter la classe dark au body si le mode sombre est activé
      document.body.style.backgroundColor = '#1a202c'; // Appliquer un fond sombre
    } else {
      document.body.classList.remove('dark'); // Supprimer la classe dark
      document.body.style.backgroundColor = '#f0f0f0'; // Appliquer un fond clair
    }
  }, [isDarkMode]); // Ce useEffect sera déclenché chaque fois que isDarkMode change

  return (
    <div className={isDarkMode ? 'dark' : ''}> {/* Appliquer la classe dark selon l'état */}
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/UserAdd" element={<UserAdd />} />
        <Route path="/UserModify/:id" element={<UserModify />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/PostUser/:id" element={<PostUser  />} />
        <Route path="/acceuilProfesseur"
          element={
            <ProtectedRoute>
              <AcceuilProfesseur />
            </ProtectedRoute>
          }
        />
        <Route path="/acceuilAdmin"
          element={
            <ProtectedRoute>
              <AcceuilAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="/acceuilAssociation"
          element={
            <ProtectedRoute>
              <AcceuilAssociation />
            </ProtectedRoute>
          }
        />
        <Route path="/acceuilClub"
          element={
            <ProtectedRoute>
              <AcceuilClub />
            </ProtectedRoute>
          }
        />
        <Route path="/acceuilUser"
          element={
            <ProtectedRoute>
              <AcceuilUser />
            </ProtectedRoute>
          }
        />
        <Route path="/userlist" element={<UserList />} />  {/* Route pour l'icône Users */}
        <Route path="/signalementList" element={<SignalementList />} />
      </Routes>
    </div>
  );
};

export default App;
