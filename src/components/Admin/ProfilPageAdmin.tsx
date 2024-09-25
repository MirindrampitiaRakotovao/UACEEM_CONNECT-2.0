import HomeAdmin from './HomeAdmin';

const UserProfile: React.FC = () => {
  return(
    <div className="div">
      < HomeAdmin />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      
          <div className="flex items-center">
            <img src="user-pub.jpg" alt="User" className="w-12 h-12 rounded-full" />

            <div className="ml-4">
              <h1 className="text-3xl font-semibold">Nom de l'utilisateur</h1>
              <p className="text-gray-500">1,6K ami(e)s</p>
              <div className="flex space-x-2 mt-2">
                <button className="btn btn-primary">Ajouter à la story</button>
                <button className="btn btn-outline">Modifier le profil</button>
              </div>
            </div>
          </div>

      
          <div className="mt-6">
            <h2 className="text-xl font-bold">Intro</h2>
            <p className="mt-2 text-gray-700">✨Let your smile change the world but don’t let the world change your smile ✌️❤️</p>
            <button className="btn btn-sm mt-4">Modifier votre bio</button>
          </div>

      
          <div className="mt-6">
            <h2 className="text-xl font-bold">Informations</h2>
            <ul className="list-none mt-2 space-y-3">
              <li>
                <i className="icon icon-school"></i> A étudié à <span className="font-medium">College Saint Joseph Ivato Aeroport</span>
              </li>
              <li>
                <i className="icon icon-school"></i> A étudié à <span className="font-medium">College Fo Masin'i Jesoa</span>
              </li>
              <li>
                <i className="icon icon-location-pin"></i> Habite à <span className="font-medium">Fianarantsoa</span>
              </li>
              <li>
                <i className="icon icon-home"></i> De <span className="font-medium">Fianarantsoa</span>
              </li>
            </ul>
            <button className="btn btn-sm mt-4">Modifier les infos</button>
          </div>

      
          <div className="mt-6">
            <h2 className="text-xl font-bold">Publications</h2>
            <div className="bg-gray-50 p-4 mt-4 rounded-lg">
              <div className="flex items-center space-x-4">
              <img src="user-pub.jpg" alt="User" className="w-12 h-12 rounded-full" />

                <textarea className="flex-grow p-2 bg-white border rounded-md" placeholder="Que voulez-vous dire ?"></textarea>
              </div>
              <div className="flex justify-end mt-2">
                <button className="btn btn-primary">Publier</button>
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">Titre de la publication</h3>
                <p className="mt-2 text-gray-600">Contenu de la publication...</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    

  );
};
export default UserProfile;
