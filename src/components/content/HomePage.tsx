import React from 'react';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import MainContent from './MainContent';

const HomePage: React.FC = () => {
  return (
    <div className="flex  h-screen">
      {/* Sidebar gauche */}
      <div className="flex-none w-1/3 bg-gray-100 h-full">
        <SidebarLeft />
      </div>

      {/* Contenu principal avec scrollbar invisible */}
      <div className="flex-grow bg-gray-50 h-full  ">
        <MainContent />
      </div>

      {/* Sidebar droit */}
      <div className="flex-none w-1/3 bg-gray-100 h-full">
        <SidebarRight />
      </div>
    </div>
  );
};

export default HomePage;
