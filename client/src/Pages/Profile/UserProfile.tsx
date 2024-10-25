import Header from '../../components/Acceuil/AcceuilAdmin/Header/Header'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import ProfilePosts from '../../components/Profile/ProfilePosts'

const UserProfile = () => {
  return (
    <div>
        <Header />
        <main className="max-w-2xl mx-auto ">
          <ProfileHeader/>
          <ProfilePosts />
        </main>
    </div>
  )
}

export default UserProfile
