import React from 'react';

const SidebarLeft: React.FC = () => {
  return (
    <aside className="w-1/5 h-full bg-white p-5 border-r border-gray-300">
      <div className="flex flex-col items-center">
        {/* Avatar et nom de l'utilisateur */}
        <img
          src="/avatar.png"
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover mb-4"
        />
        <h2 className="text-lg font-bold">Faniriniaina</h2>
        <p className="text-sm text-gray-500">Présidente de l'association</p>
      </div>

      {/* Menu de navigation */}
      <nav className="mt-10">
        <ul className="space-y-4">
          <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Fil d'actualité</li>
          <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Groupes</li>
          <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Messages</li>
          <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Paramètres</li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarLeft;
