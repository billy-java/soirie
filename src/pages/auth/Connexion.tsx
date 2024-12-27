import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IAuth } from '../../lib/interfaces/IAuth';
import { login } from '../../redux/authSlice';
import ChampInput from '../../components/ChampInput';
import Bouton1 from '../../components/Boutons';

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const temp: IAuth = {
      userActuel: {
        email,
        motDePasse: password,
        id: '',
        idsEvenements: [],
        nom: '',
        telephone: '',
        role: 2,
      },
      token: null,
      idEv: '0',
    };
    dispatch(login(temp));
    navigate('/home');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-4 max-w-md mx-auto">
      <p className="text-gray-500">Veuillez vous connecter à votre compte.</p>
      <ChampInput
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <ChampInput
        type="password"
        name="motDePasse"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      <Bouton1 type="submit" text="Se connecter" />
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => navigate('/inscription')}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800">
          Créer un compte
        </button>
        <button
          type="button"
          onClick={() => navigate('/restaurer')}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800">
          Réinitialiser le mot de passe
        </button>
      </div>
    </form>
  );
};

export default Connexion;
