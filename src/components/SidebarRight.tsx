import React from 'react';

const SidebarRight: React.FC = () => {
  return (
    <aside className="w-1/5 h-full bg-white p-5 border-l border-gray-300">
      <div>
        <h2 className="text-lg font-bold mb-4">Signalements</h2>
        <ul className="space-y-3">
          <li className="text-sm text-gray-500">Lorem ipsum dolor sit amet.</li>
          <li className="text-sm text-gray-500">Lorem ipsum dolor sit amet.</li>
          <li className="text-sm text-gray-500">Lorem ipsum dolor sit amet.</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4">Groupes</h2>
        <ul className="space-y-3">
          <li className="text-sm text-gray-500">Nom du groupe</li>
          <li className="text-sm text-gray-500">Nom du groupe</li>
          <li className="text-sm text-gray-500">Nom du groupe</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4">Contacts</h2>
        <ul className="space-y-3">
          <li className="text-sm text-gray-500">Nom d'utilisateur</li>
          <li className="text-sm text-gray-500">Nom d'utilisateur</li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarRight;
