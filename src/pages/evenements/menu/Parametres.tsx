import React, { useState } from 'react';
import { IUtilisateur } from '../../../lib/interfaces/entites';
import { iconsListe } from '../../../lib/iconsListe';

const Parametres = () => {
  const [actuelUser, setActuelUser] = useState<IUtilisateur>({
    id: '1',
    idsEvenements: ['1', '2'],
    nom: 'Alice Dupont',
    email: 'alice@example.com',
    motDePasse: 'password123',
    telephone: '0102030405',
    role: 1, // Organisateur
  });

  const [modifier, setModifier] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nom: actuelUser.nom,
    email: actuelUser.email,
    motDePasse: actuelUser.motDePasse,
    telephone: actuelUser.telephone,
  });

  const modifierF = (field: string) => {
    setModifier(field);
  };

  const mettreAJourF = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sauvegarderF = (field: string) => {
    setActuelUser({
      ...actuelUser,
      [field]: formData[field as keyof typeof formData],
    });
    setModifier(null);
  };

  const toutSauvegarderF = () => {
    // Cette méthode sera implémentée ultérieurement
    console.log('Tout sauvegarder : ', formData);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Paramètres</h1>
      <h1 className="text-2xl mb-4 text-center">ID: {actuelUser.id}</h1>
      <div className="space-y-4 text-xl">
        {/* Nom */}
        <div className="shadow-lg p-4 rounded-lg bg-white">
          <label className="block font-semibold">Nom :</label>
          {modifier === 'nom' ? (
            <div className="flex items-center gap-4">
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={mettreAJourF}
                className="border p-2 rounded-md flex-grow"
              />
              <button
                onClick={() => sauvegarderF('nom')}
                className="bg-indigo-600 text-white  px-4 py-2 rounded-md hover:bg-indigo-800 flex flex-wrap justify-center items-center space-x-2">
                <p>Sauvegarder</p> {iconsListe.enregister}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p>{actuelUser.nom}</p>
              <button
                onClick={() => modifierF('nom')}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-800">
                {iconsListe.modifier}
              </button>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="shadow-lg p-4 rounded-lg bg-white">
          <label className="block font-semibold">Email :</label>
          {modifier === 'email' ? (
            <div className="flex items-center gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={mettreAJourF}
                className="border p-2 rounded-md flex-grow"
              />
              <button
                onClick={() => sauvegarderF('email')}
                className="bg-indigo-600 text-white  px-4 py-2 rounded-md hover:bg-indigo-800 flex flex-wrap justify-center items-center space-x-2">
                <p>Sauvegarder</p> {iconsListe.enregister}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p>{actuelUser.email}</p>
              <button
                onClick={() => modifierF('email')}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-800">
                {iconsListe.modifier}
              </button>
            </div>
          )}
        </div>

        {/* Mot de Passe */}
        <div className="shadow-lg p-4 rounded-lg bg-white">
          <label className="block font-semibold">Mot de Passe :</label>
          {modifier === 'motDePasse' ? (
            <div className="flex items-center gap-4">
              <input
                type="password"
                name="motDePasse"
                value={formData.motDePasse}
                onChange={mettreAJourF}
                className="border p-2 rounded-md flex-grow"
              />
              <button
                onClick={() => sauvegarderF('motDePasse')}
                className="bg-indigo-600 text-white  px-4 py-2 rounded-md hover:bg-indigo-800 flex flex-wrap justify-center items-center space-x-2">
                <p>Sauvegarder</p> {iconsListe.enregister}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p>********</p>
              <button
                onClick={() => modifierF('motDePasse')}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-800">
                {iconsListe.modifier}
              </button>
            </div>
          )}
        </div>

        {/* Téléphone */}
        <div className="shadow-lg p-4 rounded-lg bg-white">
          <label className="block font-semibold">Téléphone :</label>
          {modifier === 'telephone' ? (
            <div className="flex items-center gap-4">
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={mettreAJourF}
                className="border p-2 rounded-md flex-grow"
              />
              <button
                onClick={() => sauvegarderF('telephone')}
                className="bg-indigo-600 text-white  px-4 py-2 rounded-md hover:bg-indigo-800 flex flex-wrap justify-center items-center space-x-2">
                <p>Sauvegarder</p> {iconsListe.enregister}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p>{actuelUser.telephone}</p>
              <button
                onClick={() => modifierF('telephone')}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-800">
                {iconsListe.modifier}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bouton "Tout sauvegarder" */}
      <div className="mt-6 flex flex-wrap justify-center">
        <button
          onClick={toutSauvegarderF}
          className="bg-indigo-600 text-white  px-4 py-3 rounded-md hover:bg-indigo-800 flex flex-wrap justify-center items-center space-x-2">
          <p>Sauvegarder</p> {iconsListe.enregister}
        </button>
      </div>
    </div>
  );
};

export default Parametres;
