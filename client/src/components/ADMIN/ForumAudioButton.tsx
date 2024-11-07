import { Play, Pause } from 'lucide-react';


const ForumAudioButton: React.FC<{ isActive: boolean; onClick: () => void; isDarkMode: boolean }> = ({ isActive, onClick, isDarkMode }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs 
            ${isDarkMode ? 'bg-[#2a2b2f] text-white' : 'bg-[#d8d9dd] text-gray-700'} 
            shadow-neu-light dark:shadow-neu-dark
            hover:shadow-neu-pressed-light dark:hover:shadow-neu-pressed-dark 
            transition-all duration-300`}
    >
        {isActive ? <Pause size={14} /> : <Play size={14} />}
        <span>{isActive ? "Pause Audio" : "Lire Audio"}</span>
    </button>
);

export default ForumAudioButton;
