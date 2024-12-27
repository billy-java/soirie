import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Titre1 } from '../../components/Titres';

const Restaurer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour envoyer un email de réinitialisation (exemple : appel API)
    console.log('Demande de restauration pour :', email);
    alert('Si un compte existe pour cet email, vous recevrez un lien de réinitialisation.');
    navigate('/connexion');
  };

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
