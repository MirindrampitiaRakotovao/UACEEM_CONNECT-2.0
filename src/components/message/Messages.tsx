import React, { useState } from 'react';
import Conversations from './Conversations';  // Ensure import is correct
import ChatWindow from './ChatWindow';
import ChatDetails from './ChatDetails';

interface User {
  id: number;
  username: string;
  photo?: string;
}

const Messages: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="h-screen flex flex-col">
      {/* Layout principal pour les messages */}
      <div className="flex flex-grow bg-gray-100 overflow-hidden">
        {/* Liste des conversations */}
        <div className="flex-none w-1/3 h-full overflow-auto">
          <Conversations onSelectUser={setSelectedUser} />
        </div>
        
        {/* Fenêtre de discussion */}
        <div className="flex-grow h-full overflow-hidden">
          {selectedUser ? (
            <ChatWindow user={selectedUser} /> 
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>Sélectionnez un utilisateur pour commencer la discussion</p>
            </div>
          )}
        </div>
        
        {/* Détails de la discussion */}
        <div className="flex-none w-1/3 h-full overflow-auto">
          <ChatDetails />
        </div>
      </div>
    </div>
  );
};

export default Messages;
