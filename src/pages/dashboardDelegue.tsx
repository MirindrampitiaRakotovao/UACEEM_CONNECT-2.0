import HomeDelegue from '../components/Delegue/HomeDelegue';
import HomePage from '../components/content/HomePage';

const Dashboard: React.FC = () => (
  <div>
    <HomeDelegue /> {/* Barre de navigation */}
    <HomePage />  {/* Contenu principal */}
  </div>
);

export default Dashboard;
