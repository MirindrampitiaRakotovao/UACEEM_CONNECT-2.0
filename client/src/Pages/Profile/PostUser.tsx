import React from 'react'
import Header from "../../components/Acceuil/AcceuilAdmin/Header/Header.tsx";
import Sidebar from "../../components/Acceuil/AcceuilAdmin/Sidebar/Sidebar.tsx";
import RightSidebar from "../../components/Acceuil/AcceuilAdmin/RightSidebar/RightSidebar.tsx";
import PostUserProfile from "../../components/Profile/PostUserProfile.tsx";
import PostUserProfileNext from "../../components/Profile/PostUserProfileNext.tsx";

const PostUser = () => {
  return (
      <div>
        <Header/>
        <main className="max-w-2xl mx-auto ">
            <PostUserProfile />
            <PostUserProfileNext />
        </main>
      </div>
  )
}

export default PostUser
