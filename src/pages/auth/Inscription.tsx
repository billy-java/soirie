import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUtilisateur } from '../../lib/interfaces/entites';
import { initialiserUtilisateur } from '../../lib/functions/initialiseEntities';
import { Titre1 } from '../../components/Titres';
import { useDispatch, useSelector } from 'react-redux';
import { inscriptionF } from '../../redux/authSlice';
import { RootState_DB } from '../../redux/store';

const Inscription = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState<IUtilisateur>(initialiserUtilisateur());
  const token = useSelector((state: RootState_DB) => state.auth.token);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (user.email && user.motDePasse && user.nom && user.telephone) {
      dispatch(
        inscriptionF({
          nom: user.nom,
          email: user.email,
          motDePasse: user.motDePasse,
          telephone: user.telephone,
        })
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  const modifierUser = (champ: keyof IUtilisateur, valeur: string) => {
    setUser((prevUser) => ({ ...prevUser, [champ]: valeur }));
  };

  return (
    <div className="px-8 py-14 flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white flex flex-col gap-4 rounded-lg shadow-lg w-full">
        <Titre1>Inscription</Titre1>
        <p className="text-gray-500 text-center">
          Créez un compte pour accéder à notre plateforme.
        </p>
        <input
          required
          type="text"
          name="nom"
          value={user.nom}
          onChange={(e) => modifierUser('nom', e.target.value)}
          placeholder="Nom complet"
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          required
          type="email"
          name="email"
          value={user.email}
          onChange={(e) => modifierUser('email', e.target.value)}
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          required
          type="password"
          name="motDePasse"
          value={user.motDePasse}
          onChange={(e) => modifierUser('motDePasse', e.target.value)}
          placeholder="Mot de passe"
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          required
          type="number"
          name="telephone"
          value={user.telephone}
          onChange={(e) => modifierUser('telephone', e.target.value)}
          placeholder="Téléphone"
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white w-full px-4 py-2 rounded-md hover:bg-indigo-800">
          S'inscrire
        </button>

        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-sm text-indigo-600 hover:underline">
            Déjà un compte ? Connectez-vous
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inscription;
