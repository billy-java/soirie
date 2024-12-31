import React, { useState } from 'react';
import { IUtilisateur } from '../../../lib/interfaces/entites';
import { iconsListe } from '../../../lib/iconsListe';
import { useSelector } from 'react-redux';
import { RootState_DB } from '../../../redux/store';
import { mettreAJourUtilisateur } from '../../../redux/authSlice';
import { useDispatch } from 'react-redux';

const Parametres = () => {
  const dispatch = useDispatch();
  const utilisateurEnLigne = useSelector(
    (state: RootState_DB) => state.auth.userActuel
  ) as IUtilisateur;
  const [actuelUser, setActuelUser] =
    useState<IUtilisateur>(utilisateurEnLigne);

  const [modifier, setModifier] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nom: actuelUser.nom,
    email: actuelUser.email,
    motDePasse: actuelUser.motDePasse,
    telephone: actuelUser.telephone,
  });
  const [toutSauvegarder, setToutSauvegarder] = useState(false);

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
    setToutSauvegarder(true);
  };

  const toutSauvegarderF = () => {
    if (
      formData.nom &&
      formData.email &&
      formData.motDePasse &&
      formData.telephone
    ) {
      dispatch(mettreAJourUtilisateur(formData));
      setToutSauvegarder(false);
    }
  };

  const annulerF = () => {
    // Réinitialiser les champs du formulaire avec les valeurs initiales de l'utilisateur actuel
    setFormData({
      nom: actuelUser.nom,
      email: actuelUser.email,
      motDePasse: actuelUser.motDePasse,
      telephone: actuelUser.telephone,
    });
    // Annuler le mode de modification
    setModifier(null);
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
                required
                type="text"
                name="nom"
                value={formData.nom}
                onChange={mettreAJourF}
                className="border p-2 rounded-md flex-grow"
              />

              <div className="flex flex-nowrap justify-center items-center space-x-1">
                <button
                  onClick={() => sauvegarderF('nom')}
                  className="bg-indigo-600 text-white p-2  rounded-md hover:bg-indigo-800">
                  {iconsListe.enregister}
                </button>
                <button
                  onClick={annulerF}
                  type="reset"
                  className="bg-red-600 text-white w-full p-2  rounded-md hover:bg-red-800">
                  {iconsListe.annuler}
                </button>
              </div>
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
              <div className="flex flex-nowrap justify-center items-center space-x-1">
                <button
                  onClick={() => sauvegarderF('nom')}
                  className="bg-indigo-600 text-white p-2  rounded-md hover:bg-indigo-800">
                  {iconsListe.enregister}
                </button>
                <button
                  onClick={annulerF}
                  type="reset"
                  className="bg-red-600 text-white w-full p-2  rounded-md hover:bg-red-800">
                  {iconsListe.annuler}
                </button>
              </div>
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
              <div className="flex flex-nowrap justify-center items-center space-x-1">
                <button
                  onClick={() => sauvegarderF('nom')}
                  className="bg-indigo-600 text-white p-2  rounded-md hover:bg-indigo-800">
                  {iconsListe.enregister}
                </button>
                <button
                  onClick={annulerF}
                  type="reset"
                  className="bg-red-600 text-white w-full p-2  rounded-md hover:bg-red-800">
                  {iconsListe.annuler}
                </button>
              </div>
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
              <div className="flex flex-nowrap justify-center items-center space-x-1">
                <button
                  onClick={() => sauvegarderF('nom')}
                  className="bg-indigo-600 text-white p-2  rounded-md hover:bg-indigo-800">
                  {iconsListe.enregister}
                </button>
                <button
                  onClick={annulerF}
                  type="reset"
                  className="bg-red-600 text-white w-full p-2  rounded-md hover:bg-red-800">
                  {iconsListe.annuler}
                </button>
              </div>
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
      {toutSauvegarder && (
        <div className="mt-6 flex flex-wrap justify-center">
          <button
            onClick={toutSauvegarderF}
            className="bg-indigo-600 text-white  px-4 py-3 rounded-md hover:bg-indigo-800 flex flex-nowrap justify-center items-center space-x-2">
            <span>Sauvegarder</span> {iconsListe.enregister}
          </button>
        </div>
      )}
    </div>
  );
};

export default Parametres;
