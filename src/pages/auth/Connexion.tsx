import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IUtilisateur } from '../../lib/interfaces/entites';
import { initialiserUtilisateur } from '../../lib/functions/initialiseEntities';
import { login } from '../../redux/authSlice';
import { IAuth } from '../../lib/interfaces/IAuth';

const Connexion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<IUtilisateur>(initialiserUtilisateur());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const temp: IAuth = { userActuel: user, token: null, idEv: '0' };
    dispatch(login(temp));
    navigate('/home');
  };

  const modifierUser = (champ: keyof IUtilisateur, valeur: string) => {
    setUser((prevUser) => ({ ...prevUser, [champ]: valeur }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <p className="text-gray-500">Veuillez vous connecter à votre compte.</p>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={(e) => modifierUser('email', e.target.value)}
        placeholder="Email"
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        type="password"
        name="motDePasse"
        value={user.motDePasse}
        onChange={(e) => modifierUser('motDePasse', e.target.value)}
        placeholder="Mot de passe"
        className="p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white w-full px-4 py-2 rounded-md hover:bg-indigo-800">
        Se connecter
      </button>
      <button
        type="button"
        onClick={() => navigate('/inscription')}
        className="mt-2 bg-gray-600 text-white w-full px-4 py-2 rounded-md hover:bg-gray-800">
        Créer un compte
      </button>
      <button
        type="button"
        onClick={() => navigate('/restaurer')}
        className="mt-2 bg-gray-600 text-white w-full px-4 py-2 rounded-md hover:bg-gray-800">
        Réinitialiser le mot de passe
      </button>
    </form>
  );
};

export default Connexion;
