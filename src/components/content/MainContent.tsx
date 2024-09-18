import React from 'react';

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 h-full bg-gray-50 p-6">
      {/* Section de création de publication */}
      <div className="bg-white p-4 rounded-md shadow mb-6">
        <input
          type="text"
          placeholder="Que voulez-vous faire aujourd'hui ?"
          className="w-full p-3 border rounded-lg mb-3"
        />
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Photo / Vidéo</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Fichier</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Événement</button>
        </div>
      </div>

      {/* Liste des publications */}
      <div className="bg-white p-4 rounded-md shadow mb-6">
        <div className="flex items-center mb-4">
          <img src="/avatar2.png" alt="Avatar" className="w-10 h-10 rounded-full object-cover mr-3" />
          <div>
            <h3 className="text-lg font-bold">Ambinintsoa</h3>
            <p className="text-sm text-gray-500">Étudiant en L3 Informatique</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <img src="/image1.jpg" alt="Post" className="w-full h-auto rounded-md" />
          <img src="/image2.jpg" alt="Post" className="w-full h-auto rounded-md" />
        </div>
        <p className="text-gray-700 mb-3">Légende de la publication</p>
        <div className="flex space-x-3">
          <button className="text-gray-500">❤️</button>
          <button className="text-gray-500">💬</button>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
