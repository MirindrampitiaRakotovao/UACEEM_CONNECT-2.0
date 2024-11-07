import React from 'react';

import SidebarProfesseur from '../../../components/PROF/SidebarProf/SidebarProfesseur';
import Header from '../../../components/ADMIN/AcceuilAdmin/Header/Header';
import ForumsList from '../../../components/PROF/Forums/ForumsList';
import Forums from '../../../components/ADMIN/Forums';


const ForumProfesseur = () => {
  return (
    <div className="flex h-screen">
            {/* Sidebar fixe à gauche */}
            <div className="w-64 h-screen fixed left-0 top-0">
                <SidebarProfesseur />
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
                        <Forums />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ForumProfesseur
