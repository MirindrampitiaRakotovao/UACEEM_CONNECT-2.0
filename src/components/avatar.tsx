import React, { useEffect, useState } from "react";
import { User } from "lucide-react"; // L'icône user round
import classNames from "classnames"; // Pour gérer les classes conditionnelles
import api from "../axios/axiosConfig";
import { useDarkMode } from "../contexts/DarkModeContext"; // Importer le hook du mode sombre

interface AvatarProps {
  size?: string; 
  userId: number;
}

const Avatar: React.FC<AvatarProps> = ({ size = "w-10 h-10", userId }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const { isDarkMode } = useDarkMode(); // Utiliser le hook pour détecter le mode sombre

  // Fonction pour calculer la taille de l'icône en fonction du cercle
  const calculateIconSize = (size: string) => {
    const sizeValue = parseInt(size.split("-")[1]); // Récupérer la taille numérique de la classe (par ex: 10 de "w-10")
    return `${sizeValue / 2}rem`; // Calculer une taille d'icône proportionnelle
  };

  useEffect(() => {
    // Appel API pour récupérer la photo de profil de l'utilisateur
    api
      .get(`/etudiant/pourAvatar/${userId}`)
      .then((response) => {
        setPhoto(response.data.utilisateur.photo); 
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de la photo:", error);
      });
  }, [userId]);

  return (
    <div
      className={classNames(
        "rounded-full overflow-hidden flex justify-center items-center",
        size,
        {
          // Appliquer différentes classes selon le mode sombre ou clair
          "bg-gray-200": !isDarkMode, // Couleur de fond en mode clair
          "bg-gray-600": isDarkMode,  // Couleur de fond en mode sombre
        }
      )}
    >
      {photo ? (
        <img
          src={`http://localhost:4000/uploads/${photo}`}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      ) : (
        <User
          className={isDarkMode ? "text-gray-400" : "text-gray-500"} // Couleur de l'icône selon le mode sombre ou clair
          style={{ width: calculateIconSize(size), height: calculateIconSize(size) }} // Appliquer la taille dynamique
        />
      )}
    </div>
  );
};

export default Avatar;
