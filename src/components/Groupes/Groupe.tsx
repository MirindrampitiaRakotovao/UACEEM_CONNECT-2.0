import React from "react";
import SidebarGroupe from './SidebarGroupe';

const Groupe: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 dark:bg-gray-700 p-4">
        <SidebarGroupe />
      </aside>

      {/* Main content */}
      <main className="flex-grow p-4">
        {/* Contenu principal ici */}
      </main>
    </div>
  );
};

export default Groupe;
