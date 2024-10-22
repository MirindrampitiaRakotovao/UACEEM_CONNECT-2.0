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
  const [hasError, setHasError] = useState(false);
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
          setCouverture(fullPath);
        } else {
          setHasError(true); // Marque comme erreur si la couverture est absente
        }
      } catch (err) {
        console.error('Erreur lors de la récupération:', err);
        setHasError(true);
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
          "bg-gray-200": !isDarkMode, // Fond clair
          "bg-gray-600": isDarkMode,  // Fond sombre
        }
      )}
    >
      {hasError || !couverture ? (
        <UsersRound
          className={isDarkMode ? "text-gray-400" : "text-gray-500"}
          style={{ width: calculateIconSize(size), height: calculateIconSize(size) }}
        />
      ) : (
        <img
          src={couverture}
          alt="Couverture du groupe"
          className="object-cover w-full h-full"
          onError={() => setHasError(true)} // Gestion du cas où l'image ne charge pas
        />
      )}
    </div>
  );
};

export default Couverture;
