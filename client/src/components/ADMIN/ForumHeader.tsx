import { Plus } from 'lucide-react';


const ForumHeader: React.FC<{ setIsModalOpen: (state: boolean) => void; isDarkMode: boolean }> = ({ setIsModalOpen, isDarkMode }) => (
    <div className="flex justify-between items-center mb-4">
        <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-[#333]'}`}>
            Forum Tech
        </h1>
        <button
            onClick={() => setIsModalOpen(true)}
            className={`px-3 py-1 text-xs font-medium rounded-full
                flex items-center gap-1
                bg-gradient-to-r from-[#4ECDC4] to-[#45b7a7] 
                text-white shadow-neu-light dark:shadow-neu-dark
                hover:shadow-neu-pressed-light dark:hover:shadow-neu-pressed-dark 
                transition-all duration-300`}
        >
            <Plus size={12} />
            Nouveau forum
        </button>
    </div>
);

export default ForumHeader;
