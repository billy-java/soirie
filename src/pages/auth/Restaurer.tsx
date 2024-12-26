import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Restaurer = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for dispatching the reset password action
    /* dispatch(resetPassword(email)); */
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <p className="text-gray-500">
        Entrez votre email pour réinitialiser votre mot de passe.
      </p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white w-full px-4 py-2 rounded-md hover:bg-indigo-800">
        Réinitialiser
      </button>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-2 bg-gray-600 text-white w-full px-4 py-2 rounded-md hover:bg-gray-800">
        Retour à la connexion
      </button>
      <button
        type="button"
        onClick={() => navigate('/inscription')}
        className="mt-2 bg-gray-600 text-white w-full px-4 py-2 rounded-md hover:bg-gray-800">
        Créer un compte
      </button>
    </form>
  );
};

export default Restaurer;
