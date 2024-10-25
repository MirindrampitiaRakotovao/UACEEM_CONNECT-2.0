import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Image, PackageOpenIcon, Globe, User, X, Video, Newspaper, ClipboardMinus } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTheme } from '../../../../../context/ThemeContext'; // Importer le hook pour le thème

interface ProfilUtilisateur {
  photoProfil: string;
  nomUtilisateur: string;
}

const InputBox = () => {
  const { isDarkMode } = useTheme(); // Utiliser le contexte pour le mode sombre
  const [profilUtilisateur, setProfilUtilisateur] = useState<ProfilUtilisateur | null>(null);
  const [modalOuvert, setModalOuvert] = useState(false);
  const [fichiersSélectionnés, setFichiersSélectionnés] = useState<File[]>([]);
  const [voirPlus, setVoirPlus] = useState(false);
  const [audience, setAudience] = useState<'public' | 'etudiants' | null>(null);
  const [typeMedia, setTypeMedia] = useState<'photo' | 'video' | 'document'>('photo');
  const [description, setDescription] = useState('');
  const [typePublication, setTypePublication] = useState<'annonce' | 'forum' | null>(null);

  const refInputFichier = useRef<HTMLInputElement>(null);
  const refInputDocument = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const récupérerProfilUtilisateur = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const res = await axios.get('http://localhost:5000/api/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProfilUtilisateur(res.data);
        } catch (erreur) {
          console.error('Erreur lors de la récupération du profil :', erreur);
        }
      }
    };

    récupérerProfilUtilisateur();
  }, []);

  const ouvrirModal = () => setModalOuvert(true);

  const fermerModal = () => {
    setModalOuvert(false);
    réinitialiserFormulaire();
  };

  const réinitialiserFormulaire = () => {
    setFichiersSélectionnés([]);
    setAudience(null);
    setTypeMedia('photo');
    setDescription('');
    setTypePublication(null);
  };

  const gestionChangementFichier = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const tableauFichiers = Array.from(e.target.files);
      setFichiersSélectionnés((fichiersPrécédents) => [...fichiersPrécédents, ...tableauFichiers]);
    }
  };

  const supprimerFichier = (index: number) => {
    setFichiersSélectionnés((fichiers) => fichiers.filter((_, i) => i !== index));
  };

  const changerAudience = (typeAudience: 'public' | 'etudiants') => {
    setAudience((précédent) => (précédent === typeAudience ? null : typeAudience));
    setFichiersSélectionnés([]);
  };

  const soumettrePublication = async () => {
    if (!audience || !typePublication) {
      alert("Veuillez sélectionner une audience (Public ou Étudiant) et un type de publication.");
      return;
    }

    const formData = new FormData();
    formData.append('audience', audience);
    formData.append('type', typePublication);
    formData.append('description', description);

    fichiersSélectionnés.forEach((fichier) => {
      formData.append(`image`, fichier); // 'fichiers' doit correspondre au nom attendu dans la route du serveur
    });

    try {
      const réponse = await axios.post('http://localhost:5000/api/addPublication', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });

      // Afficher le toast de succès
      toast.success('Publication ajoutée avec succès !');

      console.log('Publication ajoutée avec succès:', réponse.data);
      fermerModal();
    } catch (erreur) {
      console.error('Erreur lors de l\'ajout de la publication:', erreur);
      // Afficher le toast d'erreur
      toast.error("Une erreur s'est produite lors de l'ajout de la publication. Veuillez réessayer.");
    }
  };

  const renderApercuFichiers = () => {
    const fichiersAMontrer = voirPlus ? fichiersSélectionnés : fichiersSélectionnés.slice(0, 4);

    return (
      <>
        <div className="flex flex-wrap gap-2">
          {fichiersAMontrer.map((fichier, index) => (
            <div key={index} className="relative">
              {fichier.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(fichier)}
                  alt={`sélectionné-${index}`}
                  className="w-32 h-32 rounded-lg object-cover"
                />
              ) : fichier.type.startsWith('video/') ? (
                <video className="w-32 h-32 rounded-lg" controls>
                  <source src={URL.createObjectURL(fichier)} type={fichier.type} />
                  Votre navigateur ne supporte pas la vidéo.
                </video>
              ) : (
                <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                  <PackageOpenIcon className="h-12 w-12 text-gray-500" />
                  <p>{fichier.name}</p>
                </div>
              )}
              <button
                className="absolute top-0 right-0 bg-red-500 rounded-full p-1 hover:bg-red-600"
                onClick={() => supprimerFichier(index)}
              >
                <X className="text-white w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        {fichiersSélectionnés.length > 4 && !voirPlus && (
          <button onClick={() => setVoirPlus(true)} className="text-blue-500 mt-2">
            Voir plus...
          </button>
        )}
      </>
    );
  };

  return (
    <div className={`bg-white ${isDarkMode ? 'dark:bg-gray-800' : ''} p-2 rounded-2xl shadow-md text-gray-500 font-medium`}>
      <div className="flex items-center space-x-4 p-4" onClick={ouvrirModal}>
        {profilUtilisateur && profilUtilisateur.photoProfil ? (
          <img
            src={`http://localhost:5000/${profilUtilisateur.photoProfil}`}
            alt="Photo de profil"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <img
            src="default-profile.png"
            alt="Profil par défaut"
            className="w-12 h-12 rounded-full object-cover"
          />
        )}

        <form className="flex flex-1">
          <input
            type="text"
            className={`w-full bg-gray-100 h-12 rounded-full px-5 focus:outline-none cursor-pointer ${isDarkMode ? 'dark:bg-gray-700 dark:text-white' : ''}`}
            placeholder={`Qu'avez-vous en tête, ${profilUtilisateur?.nomUtilisateur || 'Utilisateur'} ?`}
            readOnly
          />
        </form>
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon" onClick={() => { setTypeMedia('photo'); ouvrirModal(); }}>
          <Image className="h-7 text-gray-700" />
          <p className="text-xs sm:text-sm xl:text-base"> Photo </p>
        </div>

        <div className="inputIcon" onClick={() => { setTypeMedia('video'); ouvrirModal(); }}>
          <Video className="h-7 text-gray-700" />
          <p className="text-xs sm:text-sm xl:text-base"> Vidéo </p>
        </div>

        <div className="inputIcon" onClick={() => { setTypeMedia('document'); ouvrirModal(); }}>
          <PackageOpenIcon className="h-7 text-gray-700" />
          <p className="text-xs sm:text-sm xl:text-base"> Document </p>
        </div>
      </div>

      {modalOuvert && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className={`bg-white ${isDarkMode ? 'dark:bg-gray-800' : ''} rounded-lg w-full max-w-2xl p-4 relative`}>

            {/* Icône pour fermer le modal */}
            <button
              onClick={fermerModal}
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            {/* Titre avec bordure inférieure */}
            <h2 className="text-2xl font-bold mb-2 text-center">Créer une publication</h2>
            <div className="border-b-2 border-gray-300 mb-4"></div>

            {/* Conteneur pour la photo de profil et le nom d'utilisateur */}
            <div className="flex items-center mb-4">
              {/* Photo de profil */}
              {profilUtilisateur && profilUtilisateur.photoProfil ? (
                <img
                  src={`http://localhost:5000/${profilUtilisateur.photoProfil}`}
                  alt="Photo de profil"
                  className="w-16 h-16 rounded-full object-cover mr-4" // Augmentation de la taille
                />
              ) : (
                <img
                  src="default-profile.png"
                  alt="Profil par défaut"
                  className="w-16 h-16 rounded-full object-cover mr-4" // Augmentation de la taille
                />
              )}
              
              {/* Nom d'utilisateur */}
              <div className="flex flex-col">
                <span className="font-semibold">{profilUtilisateur?.nomUtilisateur}</span>
                {/* Choix de l'audience sous le nom d'utilisateur */}
                <div className="flex items-center mt-1">
                  <label className="inline-flex items-center mr-4">
                    {/* Icône globe pour l'audience publique */}
                    <Globe className="h-5 w-5 text-gray-500" />
                    <input
                      type="radio"
                      name="audience"
                      value="public"
                      checked={audience === 'public'}
                      onChange={() => changerAudience('public')}
                      className="ml-2"
                    />
                    <span className="ml-1">Public</span>
                  </label>
                  <label className="inline-flex items-center">
                    {/* Icône utilisateur pour l'audience étudiants */}
                    <User className="h-5 w-5 text-gray-500" />
                    <input
                      type="radio"
                      name="audience"
                      value="etudiants"
                      checked={audience === 'etudiants'}
                      onChange={() => changerAudience('etudiants')}
                      className="ml-2"
                    />
                    <span className="ml-1">Étudiants</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <textarea
                className={`w-full h-24 p-2 border border-gray-300 rounded-md ${isDarkMode ? 'dark:bg-gray-700 dark:text-white' : ''}`}
                placeholder={`Qu'est-ce que vous avez à dire, ${profilUtilisateur?.nomUtilisateur} ?`} // Modifier le placeholder
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <p className="font-bold mb-2">Type de publication :</p>
              <label className="inline-flex items-center mr-4">
                <Newspaper className="h-5 w-5 text-gray-500"/>
                <input
                  type="radio"
                  name="typePublication"
                  value="annonce"
                  checked={typePublication === 'annonce'}
                  onChange={() => setTypePublication('annonce')}
                  className="ml-2"
                />
                <span className="ml-2">Annonce</span>
              </label>
              <label className="inline-flex items-center">
                <ClipboardMinus className="h-5 w-5 text-gray-500"/>
                <input
                  type="radio"
                  name="typePublication"
                  value="forum"
                  checked={typePublication === 'forum'}
                  onChange={() => setTypePublication('forum')}
                  className="ml-2"
                />
                <span className="ml-2">Forum</span>
              </label>
            </div>

            <div className="mb-4">
              <input
                type="file"
                accept={
                  typeMedia === 'photo'
                    ? 'image/*'
                    : typeMedia === 'video'
                    ? 'video/*'
                    : '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'
                }
                multiple
                className="hidden"
                ref={typeMedia === 'document' ? refInputDocument : refInputFichier}
                onChange={gestionChangementFichier}
              />
              <button
                className="bg-gray-200 w-full px-4 py-2 rounded-md hover:bg-gray-300"
                onClick={() =>
                  typeMedia === 'document'
                    ? refInputDocument.current?.click()
                    : refInputFichier.current?.click()
                }
              >
                Ajouter {typeMedia === 'photo' ? 'Photos' : typeMedia === 'video' ? 'Vidéos' : 'Documents'}
              </button>
            </div>

            <div className="mb-4">{renderApercuFichiers()}</div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={soumettrePublication}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 w-full"
              >
                Publier
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default InputBox;
