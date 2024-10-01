import HomeAdmin from './HomeAdmin';
import Avatar from "../avatar";
import EditProfileModal from '../EditProfileModal';
import { useUserProfile } from '../../services/profileService';

const UserProfile: React.FC = () => {

  const { etudiant, loading, error, isOpen, openModal, closeModal } = useUserProfile();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!etudiant) {
    return <div>Profil non trouvé</div>;
  }


  return(
    <div className="div">
      < HomeAdmin />
      <div className=" bg-gray-50 text-gray h-full  p-4">
      <div className="w-3/5 mx-auto  bg-white rounded-lg p-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{etudiant.nom}</h2>
            <p className="text-sm text-gray-400">@{etudiant.username}</p>
            <p className="text-sm mt-2">{etudiant.email}</p>
          </div>
          < Avatar size="w-36 h-36" />
        </div>

        {/* Edit Profile */}
        <div className="mt-4 text-center">
          <button className="bg-transparent border-blue-500 border-2 text-black py-2 px-4 rounded-lg w-full hover:bg-blue-500 hover:text-white" onClick={openModal}>Edit profile</button>
        </div>
        {/* Modal */}
        {isOpen && (
        <EditProfileModal 
          isOpen={isOpen} 
          closeModal={closeModal} 
          nom={etudiant.nom}
          username={etudiant.username}
          bio={etudiant.bio || ''}
        />
      )}

        {/* Tabs Section */}
        <div className="mt-4 flex justify-center space-x-8 text-gray-400">
          <button className="border-b-2 border-white pb-2">Threads</button>
          <button>Replies</button>
          <button>Reposts</button>
        </div>

        {/* Finish Your Profile */}
        <div className="mt-6">
          <h3 className="text-sm text-gray-400 mb-4">Finish your profile</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* Add profile photo */}
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📷</div>
              <h4 className="text-sm font-semibold">Add profile photo</h4>
              <p className="text-xs text-gray-400 mb-4">Make it easier for people to recognize you.</p>
              <button className="bg-gray-700 text-gray py-1 px-4 rounded-lg">Add</button>
            </div>

            {/* Add bio */}
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📝</div>
              <h4 className="text-sm font-semibold">Add bio</h4>
              <p className="text-xs text-gray-400 mb-4">Introduce yourself and tell people what you’re into.</p>
              <button className="bg-gray-700 text-gray py-1 px-4 rounded-lg">Add</button>
            </div>

            {/* Create thread */}
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📝</div>
              <h4 className="text-sm font-semibold">Create thread</h4>
              <p className="text-xs text-gray-400 mb-4">Say what’s on your mind or share a recent highlight.</p>
              <button className="bg-white-700 text-gray py-1 px-4 rounded-lg">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    

  );
};
export default UserProfile;
