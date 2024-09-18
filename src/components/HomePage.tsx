import React from 'react';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import MainContent from './MainContent';

const HomePage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar gauche */}
      <SidebarLeft />

      {/* Contenu principal */}
      <MainContent />

      {/* Sidebar droite */}
      <SidebarRight />
    </div>
  );
};

export default HomePage;
