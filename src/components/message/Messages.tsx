import HomeAdmin from '../Admin/HomeAdmin';
import HomeEtudiant from '../Etudiant/HomeEtudiant';
import HomeDelegue from '../Delegue/HomeDelegue';
import { useUserProfile } from '../../services/profileService';  
import Conversations from './Conversations';
import ChatWindow from './ChatWindow';
import ChatDetails from './ChatDetails';

// Fonction pour déterminer le bon composant en fonction du rôle
const getHomeComponent = (role: string) => {
  switch (role) {
    case 'Admin':
      return <HomeAdmin />;
    case 'Etudiant':
      return <HomeEtudiant />;
    case 'Délegué':
      return <HomeDelegue />;
    default:
      return <div>Rôle inconnu</div>;
  }
};

const Messages: React.FC = () => {
  // Utilisation du hook pour obtenir les données de l'utilisateur (etudiant)
  const { etudiant } = useUserProfile();

  return (
    <div className="h-screen flex flex-col">
      {/* S'assurer que l'étudiant est défini avant de tenter d'accéder à son rôle */}
      {etudiant && getHomeComponent(etudiant.role)}

      {/* Layout principal pour les messages */}
      <div className="flex flex-grow bg-gray-100 overflow-hidden">
        {/* Liste des conversations */}
        <div className="flex-none w-1/3 h-full overflow-auto">
          <Conversations />
        </div>
        
        {/* Fenêtre de discussion */}
        <div className="flex-grow h-full overflow-hidden">
          <ChatWindow />
        </div>
        
        {/* Détails de la discussion */}
        <div className="flex-none w-1/3 h-full overflow-auto">
          <ChatDetails />
        </div>
      </div>
    </div>
  );
};

export default Messages;
