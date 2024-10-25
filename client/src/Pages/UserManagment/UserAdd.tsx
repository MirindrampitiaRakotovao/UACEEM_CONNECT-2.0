import React from 'react';
import Header from '../../components/Acceuil/AcceuilAdmin/Header/Header';
import Sidebar from '../../components/Acceuil/AcceuilAdmin/Sidebar/Sidebar';
import Feed from '../../components/Acceuil/AcceuilAdmin/Feed/Feed';
import useAuth from '../../../useAuth';
import { useNavigate } from 'react-router-dom';
import RightSidebar from '../../components/Acceuil/AcceuilAdmin/RightSidebar/RightSidebar';
import Insert from '../../components/Insert';

const UserList = () => {
  return (
    <div>
            <Header />
            <main className="flex w-[83%]">
                <Sidebar />
                <Insert />
                <RightSidebar />
            </main>
        </div>
  )
}

export default UserList