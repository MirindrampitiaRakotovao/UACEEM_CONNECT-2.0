import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { toast } from 'react-toastify'; // Ajout des imports

interface FormData {
  nom: string;
  prenom: string;
  nomUtilisateur: string;
  dateNaissance: string;
  motDePasse: string;
  role: string;
  situationMatrimoniale: string;
  situationProfessionnelle: string;
  posteOccupe: string;
  contact: string;
  email: string;
  photoProfil: File | null; 
  adresse: string;
}

interface FormErrors {
  [key: string]: string;
}

const Insert: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    nomUtilisateur: '',
    dateNaissance: '',
    motDePasse: '',
    role: '',
    situationMatrimoniale: '',
    situationProfessionnelle: 'vacataire',
    posteOccupe: '',
    contact: '',
    email: '',
    photoProfil: null,
    adresse: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      photoProfil: file,
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.nom) {
      newErrors.nom = 'Le nom est requis';
      isValid = false;
    }
    if (!formData.prenom) {
      newErrors.prenom = 'Le prénom est requis';
      isValid = false;
    }
    if (!formData.nomUtilisateur) {
      newErrors.nomUtilisateur = "Le nom d'utilisateur est requis";
      isValid = false;
    }
    if (!formData.dateNaissance) {
      newErrors.dateNaissance = 'La date de naissance est requise';
      isValid = false;
    }
    if (!formData.motDePasse) {
      newErrors.motDePasse = 'Le mot de passe est requis';
      isValid = false;
    }
    if (!formData.contact) {
      newErrors.contact = 'Le contact est requis';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "L'adresse email est requise";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide';
      isValid = false;
    }
    if (!formData.adresse) {
      newErrors.adresse = "L'adresse est requise";
      isValid = false;
    }
    // Validation des sélecteurs
    if (!formData.role) {
      newErrors.role = 'Le rôle est requis';
      isValid = false;
    }
    if (!formData.posteOccupe) {
      newErrors.posteOccupe = 'Le poste occupé est requis';
      isValid = false;
    }
    if (!formData.situationMatrimoniale) {
      newErrors.situationMatrimoniale = 'La situation matrimoniale est requise';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'photoProfil' && formData.photoProfil) {
        formDataToSend.append('photoProfil', formData.photoProfil);
      } else {
        formDataToSend.append(key, formData[key as keyof FormData]?.toString() || '');
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/personnel', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la création du personnel');
      }

      const result = await response.json();
      console.log('Personnel créé:', result);
      toast.success('Personnel ajouté avec succès !'); // Notification de succès
      navigate('/userlist');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Une erreur s'est produite lors de la création du personnel."); // Notification d'erreur
    }
  };

  return (
    <div className='flex-1 p-6 max-w-5xl mx-auto h-screen'>
      <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
        <h2 className='text-2xl font-bold mb-6'>
          <User className='inline-block mr-2' size={25} />
          Ajouter un Personnel
        </h2>

        <div className="mb-6 flex justify-center">
          <div className='relative'>
            <div 
              className='w-40 h-40 rounded-full border-2 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center'
              style={{ backgroundImage: photoPreview ? `url(${photoPreview})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {!photoPreview && <span className='text-gray-400'></span>}
            </div>
            <label 
              className='absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer bg-gray-200 bg-opacity-50 rounded-full'
              title="Ajouter une photo"
            >
              <span className='text-gray-600'>Ajouter une photo</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoChange} 
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className="space-y-4">
              <div>
                <label htmlFor='nom' className='block text-sm font-medium text-gray-700'>Nom</label>
                <input 
                  type='text'
                  name='nom'
                  value={formData.nom}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                  placeholder='Entrer le nom'
                />
                {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
              </div>

              <div>
                <label htmlFor='prenom' className='block text-sm font-medium text-gray-700'>Prénom</label>
                <input 
                  type='text'
                  name='prenom'
                  value={formData.prenom}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                  placeholder='Entrer le prénom'
                />
                {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
              </div>

              <div>
                <label htmlFor='nomUtilisateur' className='block text-sm font-medium text-gray-700'>Nom d'Utilisateur</label>
                <input 
                  type='text'
                  name='nomUtilisateur'
                  value={formData.nomUtilisateur}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                  placeholder="Nom d'utilisateur"
                />
                {errors.nomUtilisateur && <p className="text-red-500 text-xs mt-1">{errors.nomUtilisateur}</p>}
              </div>

              <div>
                <label htmlFor='motDePasse' className='block text-sm font-medium text-gray-700'>Mot de Passe</label>
                <input 
                  type='password'
                  name='motDePasse'
                  value={formData.motDePasse}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                  placeholder='Entrer le mot de passe'
                />
                {errors.motDePasse && <p className="text-red-500 text-xs mt-1">{errors.motDePasse}</p>}
              </div>

              <div>
                <label htmlFor='situationMatrimoniale' className='block text-sm font-medium text-gray-700'>Situation Matrimoniale</label>
                <select
                  name='situationMatrimoniale'
                  value={formData.situationMatrimoniale}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm'
                >
                  <option value=''>Sélectionnez une situation</option>
                  <option value='celibataire'>Célibataire</option>
                  <option value='marie'>Marié(e)</option>
                  <option value='divorce'>Divorcé(e)</option>
                  <option value='veuf'>Veuf/Veuve</option>
                </select>
                {errors.situationMatrimoniale && <p className="text-red-500 text-xs mt-1">{errors.situationMatrimoniale}</p>}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor='dateNaissance' className='block text-sm font-medium text-gray-700'>Date de Naissance</label>
                <input 
                  type='date'
                  name='dateNaissance'
                  value={formData.dateNaissance}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                />
                {errors.dateNaissance && <p className="text-red-500 text-xs mt-1">{errors.dateNaissance}</p>}
              </div>

              <div>
                <label htmlFor='contact' className='block text-sm font-medium text-gray-700'>Contact</label>
                <input 
                  type='text'
                  name='contact'
                  value={formData.contact}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                  placeholder="Entrez le numéro de téléphone"
                />
                {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Adresse Email</label>
                <input 
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                  placeholder="Entrez l'adresse email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor='adresse' className='block text-sm font-medium text-gray-700'>Adresse</label>
                <input 
                  type='text'
                  name='adresse'
                  value={formData.adresse}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                  placeholder="Entrez l'adresse"
                />
                {errors.adresse && <p className="text-red-500 text-xs mt-1">{errors.adresse}</p>}
              </div>

              <div>
                <label htmlFor='posteOccupe' className='block text-sm font-medium text-gray-700'>Poste Occupé</label>
                <select
                  name='posteOccupe'
                  value={formData.posteOccupe}
                  onChange={handleChange}
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm'
                >
                  <option value=''>Sélectionnez un poste</option>
                  <option value='professeur'>Professeur</option>
                  <option value='ressourcehumaine'>Responsable RH</option>
                  <option value='comptable'>Comptable</option>
                  <option value='accueil'>Responsable Accueil</option>
                  <option value='secretaire'>Secrétaire</option>
                  <option value='securite'>Sécurité</option>
                </select>
                {errors.posteOccupe && <p className="text-red-500 text-xs mt-1">{errors.posteOccupe}</p>}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            <div>
              <label htmlFor='role' className='block text-sm font-medium text-gray-700'>Rôle</label>
              <select
                name='role'
                value={formData.role}
                onChange={handleChange}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm'
              >
                <option value=''>Sélectionnez un rôle</option>
                <option value='admin'>Administrateur</option>
                <option value='professeur'>Professeur</option>
                <option value='president_club'>Président de Club</option>
                <option value='president_association'>Président d'Association</option>
                <option value='utilisateur_simple'>Utilisateur Simple</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>

            <div>
              <label htmlFor='situationProfessionnelle' className='block text-sm font-medium text-gray-700'>Situation Professionnelle</label>
              <select
                name='situationProfessionnelle'
                value={formData.situationProfessionnelle}
                onChange={handleChange}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm'
              >
                <option value='vacataire'>Vacataire</option>
              </select>
            </div>
          </div>

          <div className='flex justify-center items-center mt-6 space-x-4'>
            <button 
              type='submit' 
              className='flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Ajouter
            </button>
            <button 
              type='button'
              onClick={() => navigate('/userlist')} 
              className='flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Retour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Insert;
