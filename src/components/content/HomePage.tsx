import React from 'react';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import MainContent from './MainContent';

const HomePage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-none w-1/5 bg-gray-100">
        <SidebarLeft />
      </div>

      <div className="flex-grow bg-gray-50">
        <MainContent />
      </div>

      <div className="flex-none w-1/5 bg-gray-100">
        <SidebarRight />
      </div>
    </div>
  );
};

export default HomePage;
