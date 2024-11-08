import React from 'react';

import Sidebar from '../../../components/ADMIN/AcceuilAdmin/Sidebar/Sidebar';
import Header from '../../../components/ADMIN/AcceuilAdmin/Header/Header';
import MessagesView from '../../../components/ADMIN/Messages/MessagesView.tsx';
import MessagesList from '../../../components/ADMIN/Messages/MessagesList.tsx';


const Messages = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar fixe à gauche */}
      <div className="w-64 h-screen fixed left-0 top-0">
        <Sidebar />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="h-16 flex items-center ml-8">
          <Header />
        </div>

        {/* Zone de contenu principale */}
        <div className="flex">
          {/* Feed central */}
          <div className="flex-1 p-6">
            <MessagesList />
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
