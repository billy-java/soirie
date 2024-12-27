import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IUtilisateur } from '../../lib/interfaces/entites';
import { initialiserUtilisateur } from '../../lib/functions/initialiseEntities';
import { login } from '../../redux/authSlice';
import { IAuth } from '../../lib/interfaces/IAuth';
import { Titre1 } from '../../components/Titres';

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
    <div className="px-8 py-14 flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white flex flex-col gap-4 rounded-lg shadow-lg w-full">
        <Titre1>Connexion</Titre1>
        <p className="text-gray-500 text-center">
          Veuillez vous connecter à votre compte.
        </p>
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

        <div className="flex flex-col items-center gap-2 mt-4">
          <button
            type="button"
            onClick={() => navigate('/restaurer')}
            className="text-sm text-indigo-600 hover:underline">
            Mot de passe oublié ?
          </button>
          <button
            type="button"
            onClick={() => navigate('/inscription')}
            className="text-sm text-indigo-600 hover:underline">
            Créer un compte
          </button>
        </div>
      </form>
    </div>
  );
};

export default Connexion;
