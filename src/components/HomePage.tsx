import Post from './Post';
import Sidebar from './Sidebar';

const HomePage: React.FC = () => (
  <div className="flex">
    <div className="w-1/5 p-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <img src="/avatar.png" alt="Avatar" className="w-16 h-16 rounded-full mb-4" />
        <h2 className="font-bold text-gray-700">Faniriniaina</h2>
        <p className="text-gray-500">Présidente de l'association</p>
      </div>
    </div>

    <div className="w-3/5 p-4">
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <input
          type="text"
          placeholder="Que voulez-vous faire aujourd'hui ?"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between mt-4">
          <button className="flex items-center space-x-2">📷 <span>Photo / Vidéo</span></button>
          <button className="flex items-center space-x-2">📁 <span>Fichier</span></button>
          <button className="flex items-center space-x-2">📅 <span>Évènement</span></button>
        </div>
      </div>

      <Post
        user={{ name: 'Ambinintsoa', role: 'Étudiant en L3 Informatique', avatar: '/avatar1.png' }}
        content="Légende de la publication"
        images={['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg']}
      />
      <Post
        user={{ name: 'Faniriniaina', role: 'Présidente de l\'association', avatar: '/avatar.png' }}
        content="Légende de la publication"
        images={['/image5.jpg', '/image6.jpg']}
      />
    </div>

    <Sidebar />
  </div>
);

export default HomePage;
