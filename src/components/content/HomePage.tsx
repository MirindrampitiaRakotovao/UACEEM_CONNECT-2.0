import React from 'react';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import MainContent from './MainContent';

const HomePage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-none w-1/3 bg-gray-100 h-full">
        <SidebarLeft />
      </div>

      <div className="flex-grow bg-gray-50 h-full overflow-y-auto">
        <MainContent />
      </div>

      <div className="flex-none w-1/3 bg-gray-100 h-full">
        <SidebarRight />
      </div>
    </div>
  );
};

export default HomePage;
