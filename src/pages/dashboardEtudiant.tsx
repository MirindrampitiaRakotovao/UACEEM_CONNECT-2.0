import HomeEtudiant from '../components/Etudiant/HomeEtudiant';
import HomePage from '../components/content/HomePage';

const Dashboard: React.FC = () => (
  <div>
    <HomeEtudiant /> {/* Barre de navigation */}
    <HomePage />  {/* Contenu principal */}
  </div>
);

export default Dashboard;
