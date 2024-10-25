import React from 'react';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import MainContent from './MainContent';
import { useDarkMode } from '../../contexts/DarkModeContext'; // Import the useDarkMode hook

const HomePage: React.FC = () => {
  const { isDarkMode } = useDarkMode(); // Get the dark mode state

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} `}>
      {/* Sidebar gauche */}
      <div className="flex-none w-1/4 h-full">
        <SidebarLeft />
      </div>

      {/* Contenu principal avec scrollbar invisible */}
      <div className="flex-grow h-full overflow-y-auto">
        <MainContent />
      </div>

      {/* Sidebar droit */}
      <div className="flex-none w-1/4 h-full">
        <SidebarRight />
      </div>
    </div>
  );
};

export default HomePage;
