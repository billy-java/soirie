import React, { useState } from 'react';
import { IUtilisateur } from '../../../lib/interfaces/entites';
import { iconsListe } from '../../../lib/iconsListe';

const Parametres = () => {
  const [userData, setUserData] = useState<IUtilisateur>({
    id: '1',
    idsEvenements: ['1', '2'],
    nom: 'Alice Dupont',
    email: 'alice@example.com',
    motDePasse: 'password123',
    telephone: '0102030405',
    role: 1, // Organisateur
  });

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nom: userData.nom,
    email: userData.email,
    motDePasse: userData.motDePasse,
    telephone: userData.telephone,
  });

  const handleEdit = (field: string) => {
    setIsEditing(field);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (field: string) => {
    setUserData({
      ...userData,
      [field]: formData[field as keyof typeof formData],
    });
    setIsEditing(null);
  };

  const handleSaveAll = () => {
    // Cette méthode sera implémentée ultérieurement
    console.log('Tout sauvegarder : ', formData);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Paramètres</h1>
      <h1 className="text-2xl mb-4 text-center">ID: {userData.id}</h1>
      <div className="space-y-4 text-xl">
        {/* Nom */}
        <div className="shadow-lg p-4 rounded-lg bg-white">
          <label className="block font-semibold">Nom :</label>
          {isEditing === 'nom' ? (
            <div className="flex items-center gap-4">
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
              <button
                onClick={() => handleSave('nom')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Enregistrer
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p>{userData.nom}</p>
              <button
                onClick={() => handleEdit('nom')}
                className="bg-indigo-600 text-white p-2 rounded-md">
                {iconsListe.modifier}
              </button>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="shadow-lg p-4 rounded-lg bg-white">
          <label className="block font-semibold">Email :</label>
          {isEditing === 'email' ? (
            <div className="flex items-center gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
              <button
                onClick={() => handleSave('email')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Enregistrer
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p>{userData.email}</p>
              <button
                onClick={() => handleEdit('email')}
                className="bg-indigo-600 text-white p-2 rounded-md">
                {iconsListe.modifier}
              </button>
            </div>
          )}
        </div>

        {/* Mot de Passe */}
        <div className="shadow-lg p-4 rounded-lg bg-white">
          <label className="block font-semibold">Mot de Passe :</label>
          {isEditing === 'motDePasse' ? (
            <div className="flex items-center gap-4">
              <input
                type="password"
                name="motDePasse"
                value={formData.motDePasse}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
              <button
                onClick={() => handleSave('motDePasse')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Enregistrer
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p>********</p>
              <button
                onClick={() => handleEdit('motDePasse')}
                className="bg-indigo-600 text-white p-2 rounded-md">
                {iconsListe.modifier}
              </button>
            </div>
          )}
        </div>

        {/* Téléphone */}
        <div className="shadow-lg p-4 rounded-lg bg-white">
          <label className="block font-semibold">Téléphone :</label>
          {isEditing === 'telephone' ? (
            <div className="flex items-center gap-4">
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
              <button
                onClick={() => handleSave('telephone')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Enregistrer
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p>{userData.telephone}</p>
              <button
                onClick={() => handleEdit('telephone')}
                className="bg-indigo-600 text-white p-2 rounded-md">
                {iconsListe.modifier}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bouton "Tout sauvegarder" */}
      <div className="mt-6 flex flex-wrap justify-center">
        <button
          onClick={handleSaveAll}
          className="bg-green-500 text-white px-4 py-3 rounded-md text-xl shadow-lg">
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default Parametres;
