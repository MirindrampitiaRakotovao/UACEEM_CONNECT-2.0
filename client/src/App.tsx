import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import AcceuilProfesseur from './Pages/PROF/AcceuilProfesseur/AcceuilProfesseur';
import FeedbackProfesseur from './Pages/PROF/FeedBack/FeedbackProfesseur';
import SignalementList from './Pages/ADMIN/Signalement/SignalementList';
import AcceuilAdmin from './Pages/ADMIN/AcceuilAdmin/AcceuilAdmin';
import CourseList from './Pages/PROF/CourseManagement/CourseList';
import ForumProfesseur from './Pages/PROF/Forum/ForumProfesseur';
import UserModify from './Pages/ADMIN/UserManagment/UserModify';
import AcceuilUser from './Pages/USER/AcceuilUser/AcceuilUser';
import UserProfile from './Pages/ADMIN/Profile/UserProfile';
import UserList from './Pages/ADMIN/UserManagment/UserList';
import EmploiDuTemps from './Pages/ADMIN/EDT/EmploiDuTemps';
import Parametre from './Pages/ADMIN/Parametres/Parametre';
import EdtProfesseur from './Pages/PROF/EDT/EdtProfesseur';
import UserAdd from './Pages/ADMIN/UserManagment/UserAdd';
// Pages
import LandingPage from './Pages/LandingPage/LandingPage';
// Components
import ProtectedRoute from './components/ProtectedRoute';
import Messages from './Pages/ADMIN/Messages/Messages';
import Feedback from './Pages/ADMIN/Feedback/Feedback';
import PostUser from "./Pages/ADMIN/Profile/PostUser";
import ForumList from './Pages/ADMIN/Forum/ForumList';
import Favoris from './Pages/ADMIN/Favoris/Favoris';
import Archive from './Pages/ADMIN/Archive/Archive';
import { useTheme } from './context/ThemeContext';
import Form from './components/Form';
import { store } from './store'; // Assurez-vous d'avoir créé ce fichier


// Assurez-vous d'avoir créé ce fichier


// Assurez-vous d'avoir créé ce fichier



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
          <Route path="/forumProfesseur" element={<ForumProfesseur />} />
          <Route path="/edtProfesseur" element={<EdtProfesseur />} />
          <Route path="/feedbackProfesseur" element={<FeedbackProfesseur />} />
          <Route path="/acceuilProfesseur" element={<ProtectedRoute><AcceuilProfesseur /></ProtectedRoute>} />
          <Route path="/acceuilAdmin" element={<ProtectedRoute><AcceuilAdmin /></ProtectedRoute>} />
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