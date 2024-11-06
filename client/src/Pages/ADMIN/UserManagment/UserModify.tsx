import React from 'react';

import Sidebar from '../../../components/ADMIN/AcceuilAdmin/Sidebar/Sidebar';
import Header from '../../../components/ADMIN/AcceuilAdmin/Header/Header';
import Modify from '../../../components/ADMIN/ModifyUser';


const UserList = () => {
  return (
    <div>
            <Header />
            <main className="flex w-[83%]">
                <Sidebar />
                <Modify />
            </main>
        </div>
  )
}

export default UserList