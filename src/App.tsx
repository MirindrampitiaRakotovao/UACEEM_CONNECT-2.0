import React from 'react';
import 'preline/dist/preline';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import DashboardAdmin from './pages/dashboardAdmin';
import DashboardDelegue from './pages/dashboardDelegue';
import DashboardEtudiant from './pages/dashboardEtudiant';
import ProfilPage from './components/ProfilPage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homeAdmin" element={<DashboardAdmin />} />
        <Route path="/homeDelegue" element={<DashboardDelegue />} />
        <Route path="/homeEtudiant" element={<DashboardEtudiant />} />
        <Route path="/profile/:username" element={<ProfilPage />} />

      </Routes>
    </Router>
  );
};


export default App;
