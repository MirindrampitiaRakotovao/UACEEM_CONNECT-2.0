import React from 'react';
import Header from '../../../components/Acceuil/AcceuilAdmin/Header/Header';
import Sidebar from '../../../components/Acceuil/AcceuilAdmin/Sidebar/Sidebar';
import Feed from '../../../components/Acceuil/AcceuilAdmin/Feed/Feed';
import useAuth from '../../../useAuth';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '../../../components/Acceuil/AcceuilAdmin/RightSidebar/RightSidebar';

const AcceuilAdmin: React.FC = () => {
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
                        <Feed />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AcceuilAdmin;