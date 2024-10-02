import { NavigateFunction } from 'react-router-dom';

export const showDropdown = (setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
  setDropdownVisible(true);
};

export const hideDropdown = (setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
  setDropdownVisible(false);
};

export const goToProfile = (navigate: NavigateFunction) => {
  navigate('/profile/:username');  // Redirige vers la page de profil
};

export const toggleDarkMode = (
  isDarkMode: boolean,
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const newDarkMode = !isDarkMode;
  setIsDarkMode(newDarkMode);

  if (newDarkMode) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};
