import React from 'react';
import Header from '../../../components/Acceuil/AcceuilAdmin/Header/Header';
import Sidebar from '../../../components/Acceuil/AcceuilAdmin/Sidebar/Sidebar';
import Feed from '../../../components/Acceuil/AcceuilAdmin/Feed/Feed';
import useAuth from '../../../useAuth';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '../../../components/Acceuil/AcceuilAdmin/RightSidebar/RightSidebar';
import HeaderProfesseur from '../../../components/Acceuil/AcceuilAdmin/Header/HeaderProfesseur';
import RightSidebarProfesseur from '../../../components/Acceuil/AcceuilAdmin/RightSidebar/RightSidebarProfesseur';

const AcceuilProfesseur: React.FC = () => {
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
        <div>
            <HeaderProfesseur />
            <main className="flex w-[83%]">
                <Sidebar />
                <Feed />
                <RightSidebarProfesseur />
            </main>
        </div>
    );
}

export default AcceuilProfesseur;