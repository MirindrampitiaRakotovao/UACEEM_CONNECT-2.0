import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import DashboardAdmin from './pages/dashboardAdmin';
import DashboardDelegue from './pages/dashboardDelegue';
import DashboardEtudiant from './pages/dashboardEtudiant';



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/DashBoardAdmin" element={<DashboardAdmin />} />
        <Route path="/homeDelegue" element={<DashboardDelegue />} />
        <Route path="/homeEtudiant" element={<DashboardEtudiant />} />
      </Routes>
    </Router>
  );
};


export default App;
