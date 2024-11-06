import React from 'react';

import Sidebar from '../../../components/ADMIN/AcceuilAdmin/Sidebar/Sidebar';
import SignalementLists from '../../../components/ADMIN/SignalementLists';
import Header from '../../../components/ADMIN/AcceuilAdmin/Header/Header';


const SignalementList = () => {
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
            <SignalementLists />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignalementList
