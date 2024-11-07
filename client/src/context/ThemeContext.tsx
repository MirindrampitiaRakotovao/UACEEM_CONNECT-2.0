// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


// Créer un contexte pour le mode sombre
const ThemeContext = createContext<{ isDarkMode: boolean; toggleDarkMode: () => void } | undefined>(undefined);

// Créer un provider pour le contexte
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Vérifie si le mode sombre est déjà enregistré dans le localStorage
        const savedMode = localStorage.getItem('isDarkMode');
        return savedMode === 'true';
    });

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('isDarkMode', newMode.toString()); // Sauvegarde le mode dans le localStorage
            return newMode;
        });
    };

    useEffect(() => {
        // Change la classe sur le document
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
