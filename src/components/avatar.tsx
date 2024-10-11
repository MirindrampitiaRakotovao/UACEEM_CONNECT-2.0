import React, { useEffect, useState } from "react";
import { User } from "lucide-react"; // L'icône user round
import classNames from "classnames"; // Pour gérer les classes conditionnelles
import api from "../axios/axiosConfig";

interface AvatarProps {
  size?: string; // Taille optionnelle pour l'avatar (par défaut "w-16 h-16")
  userId: number;
}

const Avatar: React.FC<AvatarProps> = ({ size = "w-10 h-10" , userId }) => {
  const [photo, setPhoto] = useState<string | null>(null);

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
        console.log("Réponse complète de l'API:", response.data); // Affiche la réponse complète
        setPhoto(response.data.utilisateur.photo); 
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de la photo:", error);
      });
  }, [userId]);
  

  return (
    <div
      className={classNames(
        "rounded-full overflow-hidden bg-gray-200 flex justify-center items-center",
        size
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
          className="text-gray-500"
          style={{ width: calculateIconSize(size), height: calculateIconSize(size) }} // Appliquer la taille dynamique
        />
      )}
    </div>
  );
};

export default Avatar;
