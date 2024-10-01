import React, { useEffect, useState } from "react";
import { User } from "lucide-react"; // L'icône user round
import classNames from "classnames"; // Pour gérer les classes conditionnelles
import api from "../axios/axiosConfig";

interface AvatarProps {
  size?: string; // Taille optionnelle pour l'avatar (par défaut "w-16 h-16")
}

const Avatar: React.FC<AvatarProps> = ({  size = "w-10 h-10" }) => {
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    // Appel API pour récupérer la photo de profil de l'utilisateur
    api
      .get(`etudiant/photo`)
      .then((response) => {
        setPhoto(response.data.photo);
        console.log(response.data.photo);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de la photo:", error);
      });
  });

  return (
    <div
      className={classNames(
        "rounded-full overflow-hidden bg-gray-200 flex justify-center items-center",
        size
      )}
    >
      {photo ? (
        <img
          src={`http://localhost:4000/../uploads/${photo}`}
          alt="Profile"
          className="object-cover w-full h-full"
        />
      ) : (
        <User className="text-gray-500 w-8 h-8" /> // Icône User de Lucide
      )}
    </div>
  );
};

export default Avatar;
