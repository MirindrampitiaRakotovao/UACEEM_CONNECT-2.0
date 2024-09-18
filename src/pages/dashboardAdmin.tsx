import HomeAdmin from '../components/Admin/HomeAdmin';
import HomePage from '../components/content/HomePage';

const Dashboard: React.FC = () => (
  <div>
    <HomeAdmin /> {/* Barre de navigation */}
    <HomePage />  {/* Contenu principal */}
  </div>
);

export default Dashboard;
