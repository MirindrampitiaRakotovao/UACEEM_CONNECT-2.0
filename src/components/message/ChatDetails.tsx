import React from 'react';

const ChatDetails = () => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-6">
      <div className="flex flex-col items-center mb-4">
        <img src="https://via.placeholder.com/80" alt="avatar" className="w-16 h-16 rounded-full mb-2" />
        <span className="font-bold">Nom d'utilisateur</span>
        <button className="text-sm text-gray-500">Profil</button>
      </div>
      <div className="space-y-4">
        <button className="w-full text-left p-2 bg-gray-200 rounded-lg">Mettre en sourdine</button>
        <button className="w-full text-left p-2 bg-gray-200 rounded-lg">Personnaliser la discussion</button>
        <button className="w-full text-left p-2 bg-gray-200 rounded-lg">Fichiers et médias</button>
      </div>
    </div>
  );
};

export default ChatDetails;
