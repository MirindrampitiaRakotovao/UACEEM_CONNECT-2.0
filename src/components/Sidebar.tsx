const Sidebar: React.FC = () => (
  <aside className="w-1/4 p-4 bg-gray-100">
    <div className="mb-8">
      <h2 className="font-bold text-gray-700 mb-4">Signalements</h2>
      <ul>
        <li className="bg-white p-2 mb-2 rounded-lg shadow-md">Lorem ipsum dolor sit amet...</li>
        <li className="bg-white p-2 mb-2 rounded-lg shadow-md">Et possimus eveniet quo...</li>
      </ul>
    </div>

    <div className="mb-8">
      <h2 className="font-bold text-gray-700 mb-4">Groupes</h2>
      <ul>
        <li className="bg-white p-2 mb-2 rounded-lg shadow-md">Nom du groupe</li>
        <li className="bg-white p-2 mb-2 rounded-lg shadow-md">Nom du groupe</li>
      </ul>
    </div>

    <div>
      <h2 className="font-bold text-gray-700 mb-4">Contacts</h2>
      <ul>
        <li className="bg-white p-2 mb-2 rounded-lg shadow-md">Nom d'utilisateur</li>
        <li className="bg-white p-2 mb-2 rounded-lg shadow-md">Nom d'utilisateur</li>
      </ul>
    </div>
  </aside>
);

export default Sidebar;
