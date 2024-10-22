import React, { useEffect, useState } from "react";
import { UsersRound } from "lucide-react"; 
import classNames from "classnames"; 
import api from "../axios/axiosConfig";
import { useDarkMode } from "../contexts/DarkModeContext"; 

interface CouvertureProps {
  size?: string; 
  groupId: number;
}

const Couverture: React.FC<CouvertureProps> = ({ size = "w-10 h-10", groupId }) => {
  const [couverture, setcouverture] = useState<string | null>(null);
  const { isDarkMode } = useDarkMode(); 

  // Fonction pour calculer la taille de l'icône en fonction du cercle
  const calculateIconSize = (size: string) => {
    const sizeValue = parseInt(size.split("-")[1]); 
    return `${sizeValue / 2}rem`; 
  };

  useEffect(() => {
    // Appel API pour récupérer la couverture de profil de l'groupePartage
    api
      .get(`/partageGroupe/couverture/${groupId}`)
      .then((response) => {
        setcouverture(response.data.groupePartage.couverture); 
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de la couverture:", error);
      });
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
      {couverture ? (
        <img
          src={`http://localhost:4000/uploads/${couverture}`}
          alt="Profile"
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
