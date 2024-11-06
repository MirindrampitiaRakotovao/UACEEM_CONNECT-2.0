import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, UserPlus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';
import ConfirmDeleteModal from './ModalDeleteUser';
interface User {
  id: number;
  prenom: string;
  nom: string;
  nomUtilisateur: string;
  photoProfil: string;
  role: string;
}
const UserLists: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleCounts, setRoleCounts] = useState<{ [key: string]: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:5000/api/showusers');
        setUsers(response.data);
        setTimeout(() => setLoading(false), 800);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const counts: { [key: string]: number } = {};
    users.forEach(user => {
      counts[user.role] = (counts[user.role] || 0) + 1;
    });
    setRoleCounts(counts);
  }, [users]);
  const filteredUsers = users.filter(user => {
    const searchStr = `${user.prenom} ${user.nom} ${user.nomUtilisateur} ${user.role}`.toLowerCase();
    return searchStr.includes(searchTerm.toLowerCase());
  });
  const handleDeleteUser = async () => {
    if (!userIdToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/personnel/${userIdToDelete}`);
      setUsers(users.filter(user => user.id !== userIdToDelete));
      toast.success('Personnel supprimé avec succès', {
        theme: isDarkMode ? 'dark' : 'light',
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression', {
        theme: isDarkMode ? 'dark' : 'light',
      });
    } finally {
      setIsModalOpen(false);
      setUserIdToDelete(null);
    }
  };
  const handleEdit = (userId: number) => {
    navigate(`/UserModify/${userId}`);
    setDropdownOpen(null);
  };
  const Dropdown: React.FC<{ user: User }> = ({ user }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } ring-1 ring-black ring-opacity-5`}
      style={{ zIndex: 1000 }}
    >
      <div className="py-1">
        <button
          onClick={() => handleEdit(user.id)}
          className={`block px-3 py-1 text-xs ${
            isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
          } w-full text-left`}
        >
          Modifier
        </button>
        <button
          onClick={() => {
            setUserIdToDelete(user.id);
            setIsModalOpen(true);
            setDropdownOpen(null);
          }}
          className={`block px-3 py-1 text-xs ${
            isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'
          } w-full text-left`}
        >
          Supprimer
        </button>
      </div>
    </motion.div>
  );
  return (
    <div className={`min-h-screen `}>
      <div className={`container mx-auto px-4 py-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-600' : 'bg-yellow-500'}`}>
              <Users className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Gestion des utilisateurs</h1>
              <p className="text-xs text-gray-500">{users.length} utilisateurs enregistrés</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/UserAdd')}
            className={`px-3 py-1 rounded-md text-xs ${
              isDarkMode
                ? 'bg-yellow-600 hover:bg-yellow-700'
                : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white transition duration-300 ease-in-out`}
          >
            <UserPlus className="inline-block mr-1 h-3 w-3" />
            Ajouter
          </button>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-3 py-1 rounded-md text-sm ${
                isDarkMode
                  ? 'bg-gray-800 text-white placeholder-gray-500'
                  : 'bg-white text-gray-900 placeholder-gray-500'
              } border ${
                isDarkMode ? 'border-gray-700' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-yellow-500`}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_,                i) => (
                  <div
                    key={i}
                    className={`animate-pulse rounded-md p-3 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-gray-300 h-8 w-8"></div>
                      <div className="flex-1 space-y-1">
                        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`rounded-md p-3 ${
                      isDarkMode
                        ? 'bg-gray-800 hover:bg-gray-700'
                        : 'bg-white hover:bg-gray-50'
                    } transition duration-150 ease-in-out`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={`http://localhost:5000/${user.photoProfil}`}
                          alt={`${user.prenom} ${user.nom}`}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-sm font-medium">{user.prenom} {user.nom}</h3>
                          <p className="text-xs text-gray-500">@{user.nomUtilisateur}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                        <div className="relative ml-2">
                          <button
                            onClick={() => setDropdownOpen(dropdownOpen === user.id ? null : user.id)}
                            className={`p-1 rounded-full ${
                              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                            }`}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          <AnimatePresence>
                            {dropdownOpen === user.id && <Dropdown user={user} />}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className={`rounded-md p-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-sm font-bold mb-3">Répartition des rôles</h2>
              <Chart
                options={{
                  ...getChartOptions(isDarkMode, roleCounts),
                  theme: { mode: isDarkMode ? 'dark' : 'light' },
                  colors: ['#FCD34D', '#FBBF24', '#F59E0B', '#D97706'],
                }}
                series={[{
                  name: 'Utilisateurs',
                  data: Object.values(roleCounts)
                }]}
                type="bar"
                height={300}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setUserIdToDelete(null);
        }}
        onConfirm={handleDeleteUser}
        title="Supprimer l'utilisateur"
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible."
      />
    </div>
  );
};

const getChartOptions = (isDarkMode: boolean, roleCounts: { [key: string]: number }) => ({
  chart: {
    toolbar: { show: false },
    background: 'transparent',
  },
  plotOptions: {
    bar: {
      borderRadius: 6,
      horizontal: true,
      dataLabels: {
        position: 'top'
      },
    }
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => val.toString(),
    style: {
      fontSize: '10px',
      colors: [isDarkMode ? '#E5E7EB' : '#374151']
    }
  },
  xaxis: {
    categories: Object.keys(roleCounts),
    labels: {
      style: {
        colors: isDarkMode ? '#E5E7EB' : '#374151',
        fontSize: '10px'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: isDarkMode ? '#E5E7EB' : '#374151',
        fontSize: '10px'
      }
    }
  },
  grid: {
    borderColor: isDarkMode ? '#374151' : '#E5E7EB',
    strokeDashArray: 4,
  },
  tooltip: {
    theme: isDarkMode ? 'dark' : 'light',
  }
});

export default UserLists;