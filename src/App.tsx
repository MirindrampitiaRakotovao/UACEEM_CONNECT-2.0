import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import HomeAdmin from './pages/homeAdmin';
import HomeDelegue from './pages/homeDelegue';
import HomeEtudiant from './pages/homeEtudiant';



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homeAdmin" element={<HomeAdmin />} />
        <Route path="/homeDelegue" element={<HomeDelegue />} />
        <Route path="/homeEtudiant" element={<HomeEtudiant />} />
      </Routes>
    </Router>
  );
};


export default App;
