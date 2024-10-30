import React from 'react';
import Header from '../../components/Acceuil/AcceuilAdmin/Header/Header';
import Sidebar from '../../components/Acceuil/AcceuilAdmin/Sidebar/Sidebar';
import RightSidebar from '../../components/Acceuil/AcceuilAdmin/RightSidebar/RightSidebar';
import UserLists from '../../components/UserLists';

const UserList = () => {
  return (
    <div>
            <Header />
            <main className="flex w-[83%]">
                <Sidebar />
                <UserLists />
                <RightSidebar />
            </main>
    </div>
  )
}

export default UserList
