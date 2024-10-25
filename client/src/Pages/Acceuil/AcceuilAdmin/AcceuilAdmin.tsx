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
        <div>
            <Header />
            <main className="flex w-[83%]">
                <Sidebar />
                <Feed />
                <RightSidebar />
            </main>
        </div>
    );
}

export default AcceuilAdmin;
