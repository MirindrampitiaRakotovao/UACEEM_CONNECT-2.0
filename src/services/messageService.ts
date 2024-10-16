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
  
  export const fetchMessages = async (destinataireId: number) => {
    const response = await fetch(`/api/messages/${destinataireId}`);
    return response.json();
  };
  
  export const sendMessage = async (destinataireId: number, contenuMessage: string) => {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destinataire_id: destinataireId, contenuMessage }),
    });
    return response.json();
  };
  