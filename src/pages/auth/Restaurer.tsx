import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Titre1 } from '../../components/Titres';
import { useDispatch, useSelector } from 'react-redux';
import { restaurerF } from '../../redux/authSlice';
import { RootState_DB } from '../../redux/store';

const Restaurer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const token = useSelector((state: RootState_DB) => state.auth.token);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(restaurerF(email));
  };

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  return (
    <div className="px-8 py-14 flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white flex flex-col gap-4 rounded-lg shadow-lg w-full">
        <Titre1>Restaurer le mot de passe</Titre1>
        <p className="text-gray-500 text-center">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white w-full px-4 py-2 rounded-md hover:bg-indigo-800">
          Restaurer
        </button>

        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-sm text-indigo-600 hover:underline">
            Retour à la connexion
          </button>
        </div>
      </form>
    </div>
  );
};

export default Restaurer;
