import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IEvenement } from '../lib/interfaces/entites';
import { iconsListe } from '../lib/iconsListe';
import { useDispatch, useSelector } from 'react-redux';
import { RootState_DB } from '../redux/store';
import { logout, setIdEv } from '../redux/authSlice';
import {
  dateJSVersIDate,
  iDateVersDateJS,
  iDateVersInput,
} from '../lib/functions/convertirDates';
import { Titre1, Titre2, Titre3 } from '../components/Titres';
import { initialiserEvenement } from '../lib/functions/initialiseEntities';

interface IData {
  ajouter: IEvenement | null;
  modifier: IEvenement | null;
  idSuppression: string | null;
  sauvegargerListe: boolean;
}

const Home = () => {
  const { eId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [data, setData] = useState<IData>({
      ajouter: null,
      modifier: null,
      idSuppression: null,
      sauvegargerListe: false,
  });
  
  const toggleFormulaireAjout = () => {
      if (data.ajouter) {
        setData({
          ...data,
          ajouter: null,
          modifier: null,
          idSuppression: null,
        });
      } else {
        setData({
          ajouter: initialiserEvenement(eId as string),
          modifier: null,
          idSuppression: null,
          sauvegargerListe: true,
        });
      }
    };

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
      {
        id: `${Date.now()}`, // Génère un id unique basé sur le temps
        idUtilisateur: '123', // Id utilisateur fictif
        type: 'Anniversaire',
        ...nouvelEvenement,
      } as IEvenement,
      ...prev,
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

  const creerParams = (id: string) => {
    dispatch(setIdEv(id));
  };

  const deconnection = () => {
    dispatch(logout());
    setEvenements([]);
    navigate('/');
  };

  return (
    <div className="px-4 py-10 min-h-screen flex flex-col items-center bg-gray-100">
      {/* Titre principal */}
      <div className="text-center p-4 mb-8">
        <Titre1> Planifiez Votre Événement Facilement</Titre1>
        <p className="text-gray-700 text-lg">
          Une plateforme pour organiser des fêtes, mariages, anniversaires et
          bien plus encore !
        </p>
      </div>

      {/* Bouton pour créer un événement */}
      <div className="mb-8">
        <button
          className={`px-6 py-3 text-lg rounded-md shadow-md transition ${
            afficherFormulaireAjout
              ? 'bg-red-600 hover:bg-red-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-800 text-white'
          }`}
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
          <select
            value={nouvelEvenement.type}
            onChange={(e) => gererChangementChamp('type', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4">
            <option value="Fête">Fête</option>
            <option value="Mariage">Mariage</option>
            <option value="Anniversaire">Anniversaire</option>
            <option value="Autre">Autre</option>
          </select>

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
            className="bg-indigo-600 text-white size-fit px-4 py-2 rounded-md hover:bg-indigo-800 flex flex-nowrap justify-center items-center space-x-2">
            <p>Sauvegarder</p> {iconsListe.enregister}
          </button>
        </div>
      )}

      {/* Liste des événements */}
      <div className="w-full max-w-4xl p-4">
        <Titre2>Vos événements :</Titre2>
        <ul className="space-y-6">
          {evenements.map((evenement) => (
            <li
              key={evenement.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition relative">
              <div>
                <Link
                  onClick={() => creerParams(evenement.id)}
                  to={`/e/${evenement.id}/dashboard`}
                  className="block text-indigo-600 hover:text-indigo-800">
                  <Titre3>{evenement.nom}</Titre3>
                  <p className="text-gray-600">
                    <span className="font-semibold">Type devenement :</span>{' '}
                    {evenement.type}
                  </p>
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
                  className="bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-800 transition">
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
                  className="bg-red-600 text-white px-2 py-2 rounded-md hover:bg-red-800 transition">
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
                  <select
                    value={nouvelEvenement.type || evenement.type}
                    onChange={(e) =>
                      gererChangementChamp('type', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mb-2">
                    <option value="Fête">Fête</option>
                    <option value="Mariage">Mariage</option>
                    <option value="Anniversaire">Anniversaire</option>
                    <option value="Autre">Autre</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Budget (€)"
                    value={nouvelEvenement.budget || ''}
                    onChange={(e) =>
                      gererChangementChamp('budget', parseFloat(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => {
                        if (idConfirmationSuppression)
                          setIdConfirmationSuppression(null);
                        gererModificationEvenement(evenement.id);
                      }}
                      type="submit"
                      className="bg-indigo-600 text-white w-full px-4 py-2 rounded-md hover:bg-indigo-800 flex flex-wrap justify-center items-center space-x-2">
                      <p>Sauvegarder</p> {iconsListe.enregister}
                    </button>
                    <button
                      onClick={() => setIdEvenementModification(null)}
                      type="submit"
                      className="bg-red-600 text-white w-full px-4 py-2 rounded-md hover:bg-red-800 flex flex-wrap justify-center items-center space-x-2">
                      Annuler
                    </button>
                  </div>
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
                      className="bg-red-600 text-white font-semibold rounded-md px-4 py-2 hover:bg-red-800 transition">
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

      <button
        className={`px-6 py-3 my-10 text-lg rounded-md shadow-md transition bg-red-600 hover:bg-red-600 text-white`}
        onClick={deconnection}>
        Se deconnecter
      </button>
    </div>
  );
};

export default Home;
