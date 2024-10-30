import React from 'react';
import Notifications from './Notifications';
import Users from './Users';
import Signalements from './Signalements';

const RightSidebarProfesseur: React.FC = () => {
    return (
        <div 
            className="flex flex-col p-2 ml-7 mt-5 max-w-[600px] xl:min-w-[300px] fixed right-0 top-16" 
            style={{ zIndex: -1 }} // Ajout du z-index ici
        >
            <div className="mb-6">
                <Notifications />
            </div>
            {/* <div className="mb-6">
                <Users />
            </div> */}
            {/* <div>
                <Signalements />
            </div> */}
        </div>
    );
};

export default RightSidebarProfesseur;