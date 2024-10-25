import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from 'lucide-react'; 
import { toast } from 'react-toastify';

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
  photoProfil: File | null; // Changez ici pour stocker le fichier
  adresse: string;
}

interface FormErrors {
  [key: string]: string;
}

const Modify: React.FC = () => {
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
  const { id } = useParams<{ id: string }>();

  // Récupération des données de l'utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getUser/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données de l\'utilisateur');
        }
        const data = await response.json();
        setFormData(data);

        if (data.photoProfil) {
            const photoUrl = `http://localhost:5000/${data.photoProfil.replace(/\\/g, '/')}`;
            setPhotoPreview(photoUrl);
            console.log('URL de la photo de profil:', photoUrl);
          }
        
        // Formatage de la date de naissance
        if (data.dateNaissance) {
          const date = new Date(data.dateNaissance);
          const formattedDate = date.toISOString().split('T')[0]; 
          setFormData((prev) => ({ ...prev, dateNaissance: formattedDate }));
        }
      } catch (error) {
        console.error('Erreur:', error);
        toast.error('Erreur lors de la récupération des données de l\'utilisateur');
      }
    };

    fetchUserData();
  }, [id]);

  // Gestion du changement de photo
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      photoProfil: file, // Gardez le fichier complet
    }));

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

  // Gestion du changement de valeur des champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    const requiredFields = [
      'nom', 'prenom', 'nomUtilisateur', 'dateNaissance', 'motDePasse', 
      'contact', 'email', 'adresse', 'role', 'posteOccupe', 'situationMatrimoniale'
    ];

    requiredFields.forEach(field => {
      if (!formData[field as keyof FormData]) {
        newErrors[field] = `Le champ ${field} est requis`;
        isValid = false;
      }
    });

    // Validation de l'email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'photoProfil' && formData.photoProfil) {
        formDataToSend.append('photoProfil', formData.photoProfil); // Ajoutez le fichier ici
      } else {
        formDataToSend.append(key, formData[key as keyof FormData]?.toString() || '');
      }
    }

    try {
      const response = await fetch(`http://localhost:5000/api/updateUser/${id}`, { // Modifiez l'URL ici pour la mise à jour
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la mise à jour du personnel');
      }

      toast.success('Personnel modifié avec succès !');
      navigate('/userlist');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Une erreur s'est produite lors de la mise à jour du personnel.");
    }
  };

  return (
    <div className='flex-1 p-6 max-w-5xl mx-auto h-screen'>
      <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
        <h2 className='text-2xl font-bold mb-6'>
          <User className='inline-block mr-2' size={25} />
          Modifier un Personnel
        </h2>

        <div className="mb-6 flex justify-center">
          <div className='relative'>
            <div 
              className='w-40 h-40 rounded-full border-2 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center'
              style={{ 
                backgroundImage: photoPreview ? `url(${photoPreview})` : 'none',
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              }}
            >
              {!photoPreview && <span className='text-gray-400'>Aucune image</span>}
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
            {/* Champ pour Nom et Prénom */}
            <div className="space-y-4">
              <InputField 
                label="Nom" 
                name="nom" 
                value={formData.nom} 
                onChange={handleChange} 
                error={errors.nom} 
                placeholder="Entrer le nom" 
              />
              <InputField 
                label="Prénom" 
                name="prenom" 
                value={formData.prenom} 
                onChange={handleChange} 
                error={errors.prenom} 
                placeholder="Entrer le prénom" 
              />
              <InputField 
                label="Nom d'utilisateur" 
                name="nomUtilisateur" 
                value={formData.nomUtilisateur} 
                onChange={handleChange} 
                error={errors.nomUtilisateur} 
                placeholder="Nom d'utilisateur" 
              />
              <SelectField 
                label="Rôle" 
                name="role" 
                value={formData.role} 
                onChange={handleChange} 
                options={[
                  { value: '', label: 'Sélectionnez un rôle' },
                  { value: 'admin', label: 'Administrateur' },
                  { value: 'professeur', label: 'Professeur' },
                  { value: 'president_club', label: 'Président de Club' },
                  { value: 'president_association', label: 'Président d\'Association' },
                  { value: 'utilisateur_simple', label: 'Utilisateur Simple' }
                ]} 
                error={errors.role} 
              />
              <SelectField 
                label="Situation matrimoniale" 
                name="situationMatrimoniale" 
                value={formData.situationMatrimoniale} 
                onChange={handleChange} 
                options={[
                  { value: '', label: 'Sélectionnez une situation' },
                  { value: 'celibataire', label: 'Célibataire' },
                  { value: 'marie', label: 'Marié(e)' },
                  { value: 'divorce', label: 'Divorcé(e)' },
                  { value: 'veuf', label: 'Veuf/Veuve' }
                ]} 
                error={errors.situationMatrimoniale} 
              />
            </div>

            {/* Champ pour Date de Naissance et autres détails */}
            <div className="space-y-4">
              <InputField 
                label="Date de Naissance" 
                type="date" 
                name="dateNaissance" 
                value={formData.dateNaissance} 
                onChange={handleChange} 
                error={errors.dateNaissance} 
              />
              <InputField 
                label="Contact" 
                name="contact" 
                value={formData.contact} 
                onChange={handleChange} 
                error={errors.contact} 
                placeholder="Entrez le numéro de téléphone" 
              />
              <InputField 
                label="Adresse Email" 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                error={errors.email} 
                placeholder="Entrez l'adresse email" 
              />
              <InputField 
                label="Adresse" 
                name="adresse" 
                value={formData.adresse} 
                onChange={handleChange} 
                error={errors.adresse} 
                placeholder="Entrez l'adresse" 
              />
              <SelectField 
                label="Poste Occupé" 
                name="posteOccupe" 
                value={formData.posteOccupe} 
                onChange={handleChange} 
                options={[
                  { value: '', label: 'Sélectionnez un poste' },
                  { value: 'professeur', label: 'Professeur' },
                  { value: 'ressourcehumaine', label: 'Responsable RH' },
                  { value: 'comptable', label: 'Comptable' },
                  { value: 'accueil', label: 'Responsable Accueil' },
                  { value: 'secretaire', label: 'Secrétaire' },
                  { value: 'securite', label: 'Sécurité' }
                ]} 
                error={errors.posteOccupe} 
              />
            </div>
          </div>

          {/* Boutons de soumission et retour */}
          <div className='flex justify-center items-center mt-6 space-x-4'>
            <button 
              type='submit' 
              className='flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Modifier
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

// Composant pour les champs de texte
const InputField: React.FC<{ label: string; name: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string; placeholder?: string; }> = ({ label, name, type = 'text', value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor={name} className='block text-sm font-medium text-gray-700'>{label}</label>
    <input 
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Composant pour les champs de sélection
const SelectField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: { value: string; label: string }[]; error?: string; }> = ({ label, name, value, onChange, options, error }) => (
  <div>
    <label htmlFor={name} className='block text-sm font-medium text-gray-700'>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className='mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm'
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default Modify;
