import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../axios/axiosConfig";

// Crée un contexte pour l'utilisateur
interface UserContextType {
  username: string;
  photo: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserContextType>({ username: "", photo: null });

  useEffect(() => {
    // Appel API pour récupérer l'utilisateur authentifié
    api
      .get("/etudiant/authenticatedUser") // Route pour récupérer les infos de l'utilisateur connecté
      .then((response) => {
        const { username, photo } = response.data;
        setUser({ username, photo });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
      });
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

// Hook pour utiliser le contexte utilisateur
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser doit être utilisé dans un UserProvider");
  }
  return context;
};
