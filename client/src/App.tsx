import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store'; // Assurez-vous d'avoir créé ce fichier
import { useTheme } from './context/ThemeContext';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Form from './components/Form';

// Pages
import LandingPage from './Pages/LandingPage/LandingPage';
import AcceuilProfesseur from './Pages/Acceuil/AcceuilProfesseur/AcceuilProfesseur';
import AcceuilAdmin from './Pages/Acceuil/AcceuilAdmin/AcceuilAdmin';
import AcceuilAssociation from './Pages/Acceuil/AcceuilAssociation/AcceuilAssociation';
import AcceuilClub from './Pages/Acceuil/AcceuilClub/AcceuilClub';
import AcceuilUser from './Pages/Acceuil/AcceuilUser/AcceuilUser';
import UserList from './Pages/UserManagment/UserList';
import UserAdd from './Pages/UserManagment/UserAdd';
import UserModify from './Pages/UserManagment/UserModify';
import UserProfile from './Pages/Profile/UserProfile';
import PostUser from "./Pages/Profile/PostUser";
import SignalementList from './Pages/Signalement/SignalementList';
import CourseList from './Pages/CourseManagement/CourseList';
import ForumList from './Pages/Forum/ForumList';
import EmploiDuTemps from './Pages/EDT/EmploiDuTemps';
import Feedback from './Pages/Feedback/Feedback';
import Favoris from './Pages/Favoris/Favoris';
import Archive from './Pages/Archive/Archive';
import Parametre from './Pages/Parametres/Parametre';
import Messages from './Pages/Messages/Messages';


const App: React.FC = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#2A3A51';
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '#F3F5FA';
    }
  }, [isDarkMode]);

  return (
    <Provider store={store}>
        <div className={isDarkMode ? 'dark' : ''}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Form />} />
            <Route path="/UserAdd" element={<UserAdd />} />
            <Route path="/UserModify/:id" element={<UserModify />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/PostUser/:id" element={<PostUser />} />
            <Route path="/forumList" element={<ForumList />} />
            <Route path="/EdtList" element={<EmploiDuTemps />} />
            <Route path="/FeedbackList" element={<Feedback />} />
            <Route path="/FavorisList" element={<Favoris />} />
            <Route path="/ArchiveList" element={<Archive />} />
            <Route path="/ParametreList" element={<Parametre />} />
            <Route path="/MessagesList" element={<Messages />} />
            <Route path="/acceuilProfesseur" element={<ProtectedRoute><AcceuilProfesseur /></ProtectedRoute>} />
            <Route path="/acceuilAdmin" element={<ProtectedRoute><AcceuilAdmin /></ProtectedRoute>} />
            <Route path="/acceuilAssociation" element={<ProtectedRoute><AcceuilAssociation /></ProtectedRoute>} />
            <Route path="/acceuilClub" element={<ProtectedRoute><AcceuilClub /></ProtectedRoute>} />
            <Route path="/acceuilUser" element={<ProtectedRoute><AcceuilUser /></ProtectedRoute>} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/courseList" element={<CourseList />} />
            <Route path="/signalementList" element={<SignalementList />} />
          </Routes>
        </div>
    </Provider>
  );
};

export default App;