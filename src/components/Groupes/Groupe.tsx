import React, { useState, useEffect } from 'react';
import SidebarGroupe from './SidebarGroupe';
import SidebarNouveauGroupe from './SidebarNouveauGroupe';
import HomeAdmin from '../Admin/HomeAdmin';
import HomeEtudiant from '../Etudiant/HomeEtudiant';
import HomeDelegue from '../Delegue/HomeDelegue';
import GroupHeader from './GroupHeader';  // Ajout du composant
import GroupTabs from './GroupTabs';      // Ajout du composant
import GroupPostSection from './GroupPostSection';  // Ajout du composant
import axios from 'axios';

interface User {
  id: number;
  username: string;
  role: string;
  photo?: string;
}

const Groupe: React.FC = () => {
  const [etudiant, setEtudiant] = useState<User | null>(null);
  const [isCreatingNewGroup, setIsCreatingNewGroup] = useState(false);
  const [groupName, setGroupName] = useState<string>('Nom du groupe'); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    const fetchEtudiant = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/etudiant/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data && response.data.role) {
          setEtudiant(response.data);
        } else {
          setEtudiant(response.data.etudiant);
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

  const handleCreateNewGroup = () => {
    setIsCreatingNewGroup(true); // Active la création du groupe
  };

  const handleCloseNewGroup = () => {
    setIsCreatingNewGroup(false); // Retourne au sidebar de groupe
  };

  const handleGroupNameChange = (newName: string) => {
    setGroupName(newName);  
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {etudiant ? (
        <>
          <header className="w-full bg-white dark:bg-gray-800 shadow">
            {getHomeComponent(etudiant.role)}
          </header>
        </>
      ) : (
        <p>Chargement du profil...</p>
      )}
      
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-1/5 pt-0 p-5">
          {isCreatingNewGroup ? (
            <SidebarNouveauGroupe 
            onClose={handleCloseNewGroup} 
            onGroupNameChange={handleGroupNameChange}  
          /> 
          ) : (
            <SidebarGroupe onCreateNewGroup={handleCreateNewGroup} />
          )}
        </aside>

        {/* Main content */}
        <main className={`flex-grow p-2` }>
          {isCreatingNewGroup && (
            <>
              <GroupHeader groupName={groupName} privacy="Confidentialité du groupe" membersCount={1} />
              <GroupTabs />
              <GroupPostSection />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Groupe;
