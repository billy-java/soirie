import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChampInput from '../../components/ChampInput';
import Bouton1 from '../../components/Boutons';

const Inscription = () => {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    role: 1,
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch login action here
    navigate('/home');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-4 max-w-md mx-auto">
      <p className="text-gray-500">Créez un nouveau compte pour commencer.</p>
      <ChampInput
        type="text"
        name="nom"
        value={form.nom}
        onChange={handleChange}
        placeholder="Nom"
      />
      <ChampInput
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <ChampInput
        type="password"
        name="motDePasse"
        value={form.motDePasse}
        onChange={handleChange}
        placeholder="Mot de passe"
      />
      <ChampInput
        type="tel"
        name="telephone"
        value={form.telephone}
        onChange={handleChange}
        placeholder="Téléphone"
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md">
        <option value={1}>Organisateur</option>
        <option value={2}>Participant</option>
      </select>
      <Bouton1 type="submit" text="S'inscrire" />
      <button
        type="button"
        onClick={() => navigate('/')}
        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800">
        J'ai déjà un compte
      </button>
    </form>
  );
};

export default Inscription;
