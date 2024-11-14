import { useNavigate } from 'react-router-dom';
import React from 'react';

import SidebarEtudiant from '../../../components/ETUDIANT/Sidebar/SidebarEtudiant';
import Sidebar from '../../../components/ADMIN/AcceuilAdmin/Sidebar/Sidebar';
import Header from '../../../components/ADMIN/AcceuilAdmin/Header/Header';
import Feed from '../../../components/ADMIN/AcceuilAdmin/Feed/Feed';
import useAuth from '../../../useAuth';


const AcceuilClub: React.FC = () => {
    const { user, loading, error } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar fixe à gauche */}
            <div className="w-64 h-screen fixed left-0 top-0">
                <SidebarEtudiant />
            </div>

            {/* Contenu principal */}
            <div className="flex-1 ml-64">
                {/* Header */}
                <div className="h-16 flex items-center ml-8">
                    
                </div>

                {/* Zone de contenu principale */}
                <div className="flex">
                    {/* Feed central */}
                    <div className="flex-1 p-6">
                        Mirindrampitia
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AcceuilClub;