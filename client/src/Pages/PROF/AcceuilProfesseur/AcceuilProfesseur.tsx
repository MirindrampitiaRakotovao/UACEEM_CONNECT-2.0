import { useNavigate } from 'react-router-dom';
import React from 'react';

import Sidebar from '../../../components/ADMIN/AcceuilAdmin/Sidebar/Sidebar';
import Feed from '../../../components/ADMIN/AcceuilAdmin/Feed/Feed';
import useAuth from '../../../useAuth';


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
           
            <main className="flex w-[83%]">
                <Sidebar />
                <Feed />
                
            </main>
        </div>
    );
}

export default AcceuilProfesseur;