import React, { useEffect, useState } from "react";
import { UsersRound } from "lucide-react"; 
import classNames from "classnames"; 
import axios from 'axios';
import { useDarkMode } from "../contexts/DarkModeContext"; 

interface CouvertureProps {
  size?: string; 
  groupId: number;
}


const Couverture: React.FC<CouvertureProps> = ({ size = "w-10 h-10", groupId }) => {
  const [couverture, setCouverture] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useDarkMode(); 

  // Fonction pour calculer la taille de l'icône en fonction du cercle
  const calculateIconSize = (size: string) => {
    const sizeValue = parseInt(size.split("-")[1]); 
    return `${sizeValue / 2}rem`; 
  };

  useEffect(() => {
    const fetchCouverture = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:4000/partageGroupe/couverture/${groupId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Réponse complète:', response.data);

        const couverturePath = response.data.groupe?.couverture;
        if (couverturePath) {
          const fullPath = `http://localhost:4000/${couverturePath}`;
          console.log('Chemin complet:', fullPath);
          setCouverture(fullPath); // Met à jour le chemin de l'image
        } else {
          setError('Image de couverture non trouvée');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération:', err);
        setError('Erreur lors de la récupération des données');
      }
    };

    fetchCouverture();
  }, [groupId]);
  

  return (
    <div
      className={classNames(
        "rounded-lg overflow-hidden flex justify-center items-center",
        size,
        {
          // Appliquer différentes classes selon le mode sombre ou clair
          "bg-gray-200": !isDarkMode, // Couleur de fond en mode clair
          "bg-gray-600": isDarkMode,  // Couleur de fond en mode sombre
        }
      )}
    >
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : couverture ? (
        <img
          src={couverture}
          alt="Couverture du groupe"
          className="object-cover w-full h-full"
        />
      ) : (
        <UsersRound
          className={isDarkMode ? "text-gray-400" : "text-gray-500"} 
          style={{ width: calculateIconSize(size), height: calculateIconSize(size) }} 
        />
      )}
    </div>
  );
};

export default Couverture;
