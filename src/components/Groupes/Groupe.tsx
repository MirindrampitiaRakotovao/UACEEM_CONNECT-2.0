import React, { useState, useEffect } from 'react';
import SidebarGroupe from './SidebarGroupe';
import HomeAdmin from '../Admin/HomeAdmin';
import HomeEtudiant from '../Etudiant/HomeEtudiant';
import HomeDelegue from '../Delegue/HomeDelegue';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  role: string;
  photo?: string;
}

const Groupe: React.FC = () => {
  const [etudiant, setEtudiant] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    const fetchEtudiant = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/etudiant/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        

        // Vérifie si les données de l'étudiant sont dans un sous-objet
        if (response.data && response.data.role) {
          setEtudiant(response.data);  // Utilise directement les données si elles contiennent le rôle
        } else {
          setEtudiant(response.data.etudiant); // Essaye response.data.etudiant si le rôle est dans un sous-objet
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error);
      }
    };

    fetchEtudiant();
  }, []);

  const getHomeComponent = (role: string) => {
    switch (role) {
      case 'Admin':
        return <HomeAdmin />;
      case 'Etudiant':
        return <HomeEtudiant />;
      case 'Délegué':
        return <HomeDelegue />;
      default:
        return <div>Rôle inconnu ou manquant</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {etudiant ? (
        <>
          {console.log('Rôle de l\'étudiant:', etudiant.role)}  {/* Affiche le rôle pour vérifier */}
          {getHomeComponent(etudiant.role)}  {/* Affiche le composant basé sur le rôle */}
        </>
      ) : (
        <p>Chargement du profil...</p>
      )}
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 dark:bg-gray-700 p-4">
        <SidebarGroupe />
      </aside>

      {/* Main content */}
      <main className="flex-grow p-4">
        {/* Contenu principal ici */}
      </main>
    </div>
  );
};

export default Groupe;
