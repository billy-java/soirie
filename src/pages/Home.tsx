import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IEvenement } from '../lib/interfaces/entites';
import { iconsListe } from '../lib/iconsListe'; // Assurez-vous d'importer les icônes nécessaires
import { useDispatch, useSelector } from 'react-redux';
import { RootState_DB } from '../redux/store';
import { setIdEv } from '../redux/authSlice';
import {
  dateJSVersIDate,
  iDateVersDateJS,
  iDateVersInput,
} from '../lib/functions/convertirDates';

const Home = () => {
  const dispatch = useDispatch();
  const evenementsInitials = useSelector(
    (state: RootState_DB) => state.evenement.evenementsAttr
  );

  const [evenements, setEvenements] =
    useState<IEvenement[]>(evenementsInitials);
  const [afficherFormulaireAjout, setAfficherFormulaireAjout] = useState(false);
  const [idEvenementModification, setIdEvenementModification] = useState<
    string | null
  >(null);
  const [idConfirmationSuppression, setIdConfirmationSuppression] = useState<
    string | null
  >(null);
  const [nouvelEvenement, setNouvelEvenement] = useState<Partial<IEvenement>>({
    nom: '',
    date: dateJSVersIDate(new Date()),
    lieu: '',
    budget: 0,
  });

  // Gestion des champs du formulaire
  const gererChangementChamp = (
    champ: keyof IEvenement,
    valeur: string | number
  ) => {
    setNouvelEvenement((prev) => ({ ...prev, [champ]: valeur }));
  };

  // Ajout d'un nouvel événement
  const gererAjoutEvenement = () => {
    if (
      !nouvelEvenement.nom ||
      !nouvelEvenement.date ||
      !nouvelEvenement.lieu ||
      !nouvelEvenement.budget
    ) {
      alert('Tous les champs sont obligatoires.');
      return;
    }
    setEvenements((prev) => [
      ...prev,
      {
        id: `${Date.now()}`, // Génère un id unique basé sur le temps
        idUtilisateur: '123', // Id utilisateur fictif
        type: 'Fête',
        ...nouvelEvenement,
      } as IEvenement,
    ]);
    setAfficherFormulaireAjout(false);
    setNouvelEvenement({
      nom: '',
      date: dateJSVersIDate(new Date()),
      lieu: '',
      budget: 0,
    });
  };

  // Modification d'un événement existant
  const gererModificationEvenement = (id: string) => {
    const evenementsMisesAJour = evenements.map((evenement) =>
      evenement.id === id ? { ...evenement, ...nouvelEvenement } : evenement
    );
    setEvenements(evenementsMisesAJour);
    setIdEvenementModification(null);
    setNouvelEvenement({
      nom: '',
      date: dateJSVersIDate(new Date()),
      lieu: '',
      budget: 0,
    });
  };

  // Suppression d'un événement
  const gererSuppressionEvenement = (id: string) => {
    setEvenements((prev) => prev.filter((evenement) => evenement.id !== id));
    setIdConfirmationSuppression(null);
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6">
      {/* Titre principal */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Planifiez Votre Événement Facilement
        </h1>
        <p className="text-gray-700 text-lg">
          Une plateforme pour organiser des fêtes, mariages, anniversaires et
          bien plus encore !
        </p>
      </div>

      {/* Bouton pour créer un événement */}
      <div className="mb-8">
        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
          onClick={() => {
            if (idConfirmationSuppression) setIdConfirmationSuppression(null);
            setAfficherFormulaireAjout(!afficherFormulaireAjout);
          }}>
          {afficherFormulaireAjout ? 'Annuler' : 'Créer un nouvel événement'}
        </button>
      </div>

      {/* Formulaire d'ajout d'événement */}
      {afficherFormulaireAjout && (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Créer un nouvel événement</h3>
          <input
            type="text"
            placeholder="Nom de l'événement"
            value={nouvelEvenement.nom || ''}
            onChange={(e) => gererChangementChamp('nom', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <input
            type="date"
            value={iDateVersInput(nouvelEvenement.date!) || ''}
            onChange={(e) => gererChangementChamp('date', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <input
            type="text"
            placeholder="Lieu"
            value={nouvelEvenement.lieu || ''}
            onChange={(e) => gererChangementChamp('lieu', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <input
            type="number"
            placeholder="Budget (€)"
            value={nouvelEvenement.budget || ''}
            onChange={(e) =>
              gererChangementChamp('budget', parseFloat(e.target.value))
            }
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <button
            onClick={() => {
              if (idConfirmationSuppression) setIdConfirmationSuppression(null);
              gererAjoutEvenement();
            }}
            className="w-full bg-green-500 text-white font-semibold rounded-md py-2 hover:bg-green-600 transition">
            Sauvegarder
          </button>
        </div>
      )}

      {/* Liste des événements */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Vos événements :
        </h2>
        <ul className="space-y-6">
          {evenements.map((evenement) => (
            <li
              key={evenement.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition relative">
              <div>
                <Link
                  onClick={() => dispatch(setIdEv(evenement.id))}
                  to={`/e/${evenement.id}/dashboard`}
                  className="block text-gray-800 hover:text-blue-600">
                  <h4 className="text-xl font-bold mb-2">{evenement.nom}</h4>
                  <p className="text-gray-600">
                    <span className="font-semibold">Date :</span>{' '}
                    {iDateVersDateJS(evenement.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Lieu :</span>{' '}
                    {evenement.lieu}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Budget total :</span>{' '}
                    <span className="text-green-700 font-bold">
                      {evenement.budget} €
                    </span>
                  </p>
                </Link>
              </div>

              {/* Actions : Modifier et Supprimer */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => {
                    if (idConfirmationSuppression)
                      setIdConfirmationSuppression(null);
                    setIdEvenementModification(evenement.id);
                    setNouvelEvenement({
                      nom: evenement.nom,
                      date: evenement.date,
                      lieu: evenement.lieu,
                      budget: evenement.budget,
                    });
                  }}
                  className="bg-indigo-400 text-white px-2 py-1 rounded-md hover:bg-indigo-500 transition">
                  {iconsListe.modifier}
                </button>
                <button
                  onClick={() => {
                    if (
                      idConfirmationSuppression &&
                      idConfirmationSuppression === evenement.id
                    ) {
                      setIdConfirmationSuppression(null);
                    } else {
                      setIdConfirmationSuppression(evenement.id);
                    }
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition">
                  {iconsListe.supprimer}
                </button>
              </div>

              {/* Formulaire de modification */}
              {idEvenementModification === evenement.id && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                  <h4 className="font-semibold mb-2">Modifier l'événement</h4>
                  <input
                    type="text"
                    placeholder="Nom"
                    value={nouvelEvenement.nom || ''}
                    onChange={(e) =>
                      gererChangementChamp('nom', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <input
                    type="date"
                    value={iDateVersInput(nouvelEvenement.date!) || ''}
                    onChange={(e) =>
                      gererChangementChamp('date', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Lieu"
                    value={nouvelEvenement.lieu || ''}
                    onChange={(e) =>
                      gererChangementChamp('lieu', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <input
                    type="number"
                    placeholder="Budget (€)"
                    value={nouvelEvenement.budget || ''}
                    onChange={(e) =>
                      gererChangementChamp('budget', parseFloat(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />

                  <button
                    onClick={() => {
                      if (idConfirmationSuppression)
                        setIdConfirmationSuppression(null);
                      gererModificationEvenement(evenement.id);
                    }}
                    type="submit"
                    className="bg-blue-500 text-white w-full px-4 py-2 rounded-md hover:bg-blue-600 flex flex-wrap justify-center items-center space-x-2">
                    <p>Sauvegarder</p> {iconsListe.enregister}
                  </button>
                </div>
              )}

              {/* Confirmation de suppression */}
              {idConfirmationSuppression === evenement.id && (
                <div className="mt-4 p-4 bg-red-100 rounded-md">
                  <p className="text-red-600">
                    Êtes-vous sûr de vouloir supprimer cet événement ?
                  </p>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => gererSuppressionEvenement(evenement.id)}
                      className="bg-red-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-red-600 transition">
                      Oui
                    </button>
                    <button
                      onClick={() => setIdConfirmationSuppression(null)}
                      className="bg-gray-300 text-gray-700 font-semibold rounded-md px-4 py-2 hover:bg-gray-400 transition">
                      Non
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
