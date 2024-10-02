import React, { useState } from 'react';
import { CalendarDays , PackageOpen , Image } from 'lucide-react';
import Avatar from '../avatar';
import ModalPublication from '../ModalPublication';


const MainContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="flex-1 h-full bg-gray-50 p-6">
      {/* Section de création de publication */}
      <div className="bg-white p-4 rounded-md shadow mb-6">
        <div className="flex mb-6">
          <Avatar />
          <input
            type="text"
            placeholder="Que voulez-vous faire aujourd'hui ?"
            className="w-full p-2 border rounded-full hover:outline-none hover:ring-2 hover:ring-blue-500 mb-1 ml-3 "
            onClick={openModal}
          />
        </div>

        {/* Divider */}
        <hr className="w-full my-4 border-gray-300" />

        {/* Icon section */}
        <div className="flex justify-around w-full">
          <div className=" flex flex-col items-center ">
            <Image className="w-6 h-6 " />
            <span className="text-sm text-gray-700">Photo / Video</span>
          </div>
          <div className=" flex flex-col items-center">
            <PackageOpen className="w-6 h-6 " />
            <span className="text-sm text-gray-700">Fichier</span>
          </div>
          <div className=" flex flex-col items-center">
            <CalendarDays className="w-6 h-6 " />
            <span className="text-sm text-gray-700">Événement</span>
          </div>
        </div>
      </div>

      {/* Liste des publications */}
      <div className="bg-white p-4 rounded-md shadow mb-6">
        <div className="flex items-center mb-4 space-x-5">
          < Avatar />
          <div>
            <h3 className="text-lg font-bold">Ambinintsoa</h3>
            <p className="text-sm text-gray-500">Étudiant en L3 Informatique</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <img src="/image1.jpg" alt="Post" className="w-full h-auto rounded-md" />
          <img src="/image2.jpg" alt="Post" className="w-full h-auto rounded-md" />
        </div>
        <p className="text-gray-700 mb-3">Légende de la publication</p>
        <div className="flex space-x-3">
          <button className="text-gray-500">❤️</button>
          <button className="text-gray-500">💬</button>
        </div>
      </div>

      {/* Modal component */}
      <ModalPublication isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
};

export default MainContent;
