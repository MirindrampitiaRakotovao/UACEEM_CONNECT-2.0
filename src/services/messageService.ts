// services/messageService.ts

export const showMessageDropdown = (setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
    setDropdownVisible(true);
  };
  
  export const hideMessageDropdown = (setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
    setDropdownVisible(false);
  };
  
  export const toggleDropdownVisibility = (isVisible: boolean, setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
    setDropdownVisible(!isVisible);
  };
  