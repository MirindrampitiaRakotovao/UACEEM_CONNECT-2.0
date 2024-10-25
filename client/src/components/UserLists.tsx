import { useState, useEffect } from 'react';
import { PlusCircle, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
import axios from 'axios';
import ConfirmDeleteModal from '../components/ModalDeleteUser';
import 'preline';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext'; // Import du hook pour le mode sombre

interface User {
  id: number;
  prenom: string;
  nom: string;
  nomUtilisateur: string;
  photoProfil: string;
  role: string;
}

const UserLists = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Utiliser le contexte du thème pour récupérer l'état du mode sombre
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleCounts, setRoleCounts] = useState<{ [key: string]: number }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:5000/api/showusers');
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      } finally {
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

  const dataRoleDistribution = {
    options: {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },
      xaxis: {
        categories: Object.keys(roleCounts),
        position: 'bottom',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        title: {
          text: 'Rôles',
          offsetY: 0,
          offsetX: 0,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
        title: {
          text: "Nombre d'utilisateurs",
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
    },
    series: [{
      name: 'Répartition des rôles',
      data: Object.values(roleCounts),
    }],
  };

  const toggleDropdown = (index: number) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleAddUser = () => {
    navigate('/UserAdd');
  };

  const openDeleteModal = (userId: number) => {
    setUserIdToDelete(userId);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (userIdToDelete === null) return;

    try {
      await axios.delete(`http://localhost:5000/api/personnel/${userIdToDelete}`);
      setUsers(users.filter(user => user.id !== userIdToDelete));
      toast.success('Personnel supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      toast.error('Erreur lors de la suppression du personnel.');
    } finally {
      setIsModalOpen(false);
      setUserIdToDelete(null);
    }
  };

  const handleEditUser = (userId: number) => {
    navigate(`/UserModify/${userId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElements = document.querySelectorAll('.dropdown');
      let clickedInsideDropdown = false;

      dropdownElements.forEach(dropdown => {
        if (dropdown.contains(event.target as Node)) {
          clickedInsideDropdown = true;
        }
      });

      if (!clickedInsideDropdown) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={` flex-1 p-6 max-w-5xl mx-auto mt-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className={`p-4 rounded-lg shadow-md mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Liste des utilisateurs</h2>
          <button 
            onClick={handleAddUser} 
            className="inline-flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <PlusCircle size={24} />
            Ajouter
          </button>
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="overflow-y-auto h-80 scrollbars-hides">
            <div className="space-y-4">
              {users.length === 0 ? (
                <p>Aucun utilisateur trouvé.</p>
              ) : (
                users.map((user, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-lg shadow-sm transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center">
                      <img
                        src={`http://localhost:5000/${user.photoProfil}`}
                        alt={`${user.prenom} ${user.nom}`}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                        style={{ objectFit: 'cover' }}
                      />
                      <div>
                        <p className="font-semibold">{`${user.nom} ${user.prenom} (${user.nomUtilisateur})`}</p>
                        <p className="text-sm">{user.role}</p>
                      </div>
                    </div>
                    <div className="relative dropdown">
                      <button 
                        onClick={() => toggleDropdown(index)} 
                        className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <MoreVertical size={24} />
                      </button>

                      {dropdownOpen === index && (
                        <ul className={`absolute right-0 mt-2 w-48 border rounded-lg shadow-lg z-10 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Voir</li>
                          <li 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleEditUser(user.id)} 
                          >
                            Modifier
                          </li>
                          <li 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => openDeleteModal(user.id)}
                          >
                            Supprimer
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <div className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-4">Répartition des rôles</h2>
        <Chart options={dataRoleDistribution.options} series={dataRoleDistribution.series} type="bar" height={350} />
      </div>

      {isModalOpen && (
        <ConfirmDeleteModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onDelete={handleDeleteUser} 
        />
      )}
    </div>
  );
};

export default UserLists;
