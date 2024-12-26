import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';
import { initialiserUtilisateur } from '../../lib/functions/initialiseEntities';
import { IUtilisateur } from '../../lib/interfaces/entites';

const Inscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [utilisateur, setUtilisateur] = useState<IUtilisateur>(
    initialiserUtilisateur()
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUtilisateur((prevUtilisateur) => ({
      ...prevUtilisateur,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ userActuel: utilisateur, token: null, idEv: '0' }));
    navigate('/home');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <p className="text-gray-500">Veuillez créer un nouveau compte.</p>
      <input
        type="text"
        name="nom"
        value={utilisateur.nom}
        onChange={handleChange}
        placeholder="Nom"
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="email"
        name="email"
        value={utilisateur.email}
        onChange={handleChange}
        placeholder="Email"
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="password"
        name="motDePasse"
        value={utilisateur.motDePasse}
        onChange={handleChange}
        placeholder="Mot de passe"
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="tel"
        name="telephone"
        value={utilisateur.telephone}
        onChange={handleChange}
        placeholder="Téléphone"
        className="p-2 border border-gray-300 rounded-md"
      />
      <select
        name="role"
        value={utilisateur.role}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md">
        <option value={1}>Organisateur</option>
        <option value={2}>Participant</option>
      </select>
      <button
        type="submit"
        className="bg-indigo-600 text-white w-full px-4 py-2 rounded-md hover:bg-indigo-800">
        S'inscrire
      </button>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-2 bg-gray-600 text-white w-full px-4 py-2 rounded-md hover:bg-gray-800">
        J'ai déjà un compte
      </button>
    </form>
  );
};

export default Inscription;
