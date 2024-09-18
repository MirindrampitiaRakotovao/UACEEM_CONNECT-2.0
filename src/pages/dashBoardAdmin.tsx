import HomeAdmin from '../components/HomeAdmin';
import HomePage from '../components/HomePage';

const Dashboard: React.FC = () => (
  <div>
    <HomeAdmin /> {/* Barre de navigation */}
    <HomePage />  {/* Contenu principal */}
  </div>
);

export default Dashboard;
