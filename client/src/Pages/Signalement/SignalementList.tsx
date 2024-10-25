import React from 'react'
import Header from '../../components/Acceuil/AcceuilAdmin/Header/Header';
import Sidebar from '../../components/Acceuil/AcceuilAdmin/Sidebar/Sidebar';
import RightSidebar from '../../components/Acceuil/AcceuilAdmin/RightSidebar/RightSidebar';
import SignalementLists from '../../components/SignalementLists';

const SignalementList = () => {
  return (
    <div>
            <Header />
            <main className="flex w-[83%]">
                <Sidebar />
                <SignalementLists />
                <RightSidebar />
            </main>
        </div>
  )
}

export default SignalementList
