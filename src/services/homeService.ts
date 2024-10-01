
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
