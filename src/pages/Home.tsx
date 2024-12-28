import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IEvenement } from '../lib/interfaces/entites';
import { iconsListe } from '../lib/iconsListe';
import { useDispatch, useSelector } from 'react-redux';
import { RootState_DB } from '../redux/store';
import { logout, setIdEv } from '../redux/authSlice';
import {
  iDateVersDateJS,
  iDateVersInput,
  inputVersIDate,
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const evenementsInitials = useSelector(
    (state: RootState_DB) => state.evenement.evenementsAttr
  );
  const [evenements, setEvenements] =
    useState<IEvenement[]>(evenementsInitials);

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
        ajouter: initialiserEvenement(),
        modifier: null,
        idSuppression: null,
        sauvegargerListe: true,
      });
    }
  };

  // Ajout d'un nouvel événement
  const gererAjoutEvenement = () => {
    if (data.ajouter?.nom.trim()) {
      setEvenements((elements) => [
        {
          ...data.ajouter,
          id: `${Date.now()}`,
        } as IEvenement,
        ...elements,
      ]);
      /* setAfficherFormulaireAjout(false); */
      setData({
        ajouter: null,
        modifier: null,
        idSuppression: null,
        sauvegargerListe: true,
      });
    }
  };

  const validerModification = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.modifier && data.modifier.nom.trim()) {
      setEvenements((elements) =>
        elements.map((evenement) =>
          evenement.id === data.modifier?.id
            ? { ...evenement, ...data.modifier }
            : evenement
        )
      );
      setData({
        ajouter: null,
        modifier: null,
        idSuppression: null,
        sauvegargerListe: true,
      });
    }
  };

  // Modification d'un événement existant
  const gererModificationEvenement = (id: string) => {
    const evenementAModifier = evenements.find(
      (evenement) => evenement.id === id
    );
    if (evenementAModifier) {
      setData({
        ...data,
        ajouter: null,
        modifier: { ...evenementAModifier },
        idSuppression: null,
      });
    }
  };

  // Suppression d'un événement
  const gererSuppressionEvenement = (id: string) => {
    setEvenements((prev) => prev.filter((evenement) => evenement.id !== id));
    /* setIdConfirmationSuppression(null); */
    setData({ ...data, idSuppression: null });
  };

  const creerParams = (id: string) => {
    dispatch(setIdEv(id));
  };

  const deconnection = () => {
    dispatch(logout());
    setEvenements([]);
    navigate('/');
  };

  const annulerModification = () => {
    const temp = {
      ...data,
      ajouter: null,
      modifier: null,
      idSuppression: null,
    } as IData;
    setData(temp);
  };
  const annulerSuppression = () => {
    const temp = { ...data, idSuppression: null } as IData;
    setData(temp);
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
          className={`px-6 py-3 text-lg rounded-md shadow-md  ${
            data.ajouter
              ? 'bg-red-600 hover:bg-red-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-800 text-white'
          }`}
          onClick={toggleFormulaireAjout}>
          {data.ajouter ? 'Annuler' : 'Créer un nouvel événement'}
        </button>
      </div>

      {/* Formulaire d'ajout d'événement */}
      {data.ajouter && (
        <form
          onSubmit={() => {
            if (data.idSuppression) annulerSuppression();
            gererAjoutEvenement();
          }}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Créer un nouvel événement</h3>
          <input
            type="text"
            placeholder="Nom de l'événement"
            value={data.ajouter?.nom || ''}
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? { ...data.ajouter, nom: e.target.value }
                  : null,
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <input
            type="date"
            value={data.ajouter?.date ? iDateVersInput(data.ajouter.date) : ''}
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? {
                      ...data.ajouter,
                      date: inputVersIDate(e.target.value),
                    }
                  : null,
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <input
            type="text"
            placeholder="Lieu"
            value={data.ajouter?.lieu || ''}
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? { ...data.ajouter, lieu: e.target.value }
                  : null,
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <select
            value={data.ajouter?.type}
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? {
                      ...data.ajouter,
                      type: e.target.value as
                        | 'Fête'
                        | 'Mariage'
                        | 'Anniversaire'
                        | 'Autre',
                    }
                  : null,
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 mb-4">
            <option value="Fête">Fête</option>
            <option value="Mariage">Mariage</option>
            <option value="Anniversaire">Anniversaire</option>
            <option value="Autre">Autre</option>
          </select>

          <input
            type="number"
            placeholder="Budget (€)"
            value={data.ajouter?.budget || ''}
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? { ...data.ajouter, budget: parseFloat(e.target.value) }
                  : null,
              })
            }
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <button
            type="submit"
            /* onClick={() => {
              if (data.idSuppression) setData({ ...data, idSuppression: null });
              gererAjoutEvenement();
            }} */
            className="bg-indigo-600 text-white size-fit px-4 py-2 rounded-md hover:bg-indigo-800 flex flex-nowrap justify-center items-center space-x-2">
            <p>Sauvegarder</p> {iconsListe.enregister}
          </button>
        </form>
      )}

      {/* Liste des événements */}
      <div className="w-full max-w-4xl p-4">
        <Titre2>Vos événements :</Titre2>
        <ul className="space-y-6">
          {evenements.map((evenement) => (
            <li
              key={evenement.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl  relative">
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
                    if (data.idSuppression)
                      setData({ ...data, idSuppression: null });
                    gererModificationEvenement(evenement.id);
                  }}
                  className="bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-800">
                  {iconsListe.modifier}
                </button>
                <button
                  onClick={() => {
                    if (
                      data.idSuppression &&
                      data.idSuppression === evenement.id
                    ) {
                      setData({ ...data, idSuppression: null });
                    } else {
                      setData({ ...data, idSuppression: evenement.id });
                    }
                  }}
                  className="bg-red-600 text-white px-2 py-2 rounded-md hover:bg-red-800">
                  {iconsListe.supprimer}
                </button>
              </div>

              {/* Formulaire de modification */}
              {data.modifier?.id === evenement.id && (
                <form
                  onSubmit={(e) => {
                    if (data.idSuppression) {
                      setData({ ...data, idSuppression: null });
                    }
                    validerModification(e);
                  }}
                  className="mt-4 p-4 bg-gray-100 rounded-md">
                  <h4 className="font-semibold mb-2">Modifier l'événement</h4>

                  <input
                    type="text"
                    placeholder="Nom"
                    value={data.modifier?.nom || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        modifier: data.modifier
                          ? { ...data.modifier, nom: e.target.value }
                          : null,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <input
                    type="date"
                    value={
                      data.modifier?.date
                        ? iDateVersInput(data.modifier.date)
                        : ''
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        modifier: data.modifier
                          ? {
                              ...data.modifier,
                              date: inputVersIDate(e.target.value),
                            }
                          : null,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Lieu"
                    value={data.modifier?.lieu || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        modifier: data.modifier
                          ? { ...data.modifier, lieu: e.target.value }
                          : null,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <select
                    value={data.modifier?.type || evenement.type}
                    onChange={(e) =>
                      setData({
                        ...data,
                        modifier: data.modifier
                          ? {
                              ...data.modifier,
                              type: e.target.value as
                                | 'Fête'
                                | 'Mariage'
                                | 'Anniversaire'
                                | 'Autre',
                            }
                          : null,
                      })
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
                    value={data.modifier?.budget || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        modifier: data.modifier
                          ? {
                              ...data.modifier,
                              budget: parseFloat(e.target.value),
                            }
                          : null,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />

                  <div className="flex justify-center space-x-4">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white w-full px-4 py-2 rounded-md hover:bg-indigo-800 flex flex-wrap justify-center items-center space-x-2">
                      <p>Sauvegarder</p> {iconsListe.enregister}
                    </button>
                    <button
                      onClick={annulerModification}
                      type="reset"
                      className="bg-red-600 text-white w-full px-4 py-2 rounded-md hover:bg-red-800 flex flex-wrap justify-center items-center space-x-2">
                      Annuler
                    </button>
                  </div>
                </form>
              )}

              {/* Confirmation de suppression */}
              {data.idSuppression === evenement.id && (
                <div className="mt-4 p-4 bg-red-100 rounded-md">
                  <p className="text-red-600">
                    Êtes-vous sûr de vouloir supprimer cet événement ?
                  </p>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => gererSuppressionEvenement(evenement.id)}
                      className="bg-red-600 text-white font-semibold rounded-md px-4 py-2 hover:bg-red-800">
                      Oui
                    </button>
                    <button
                      onClick={() => setData({ ...data, idSuppression: null })}
                      className="bg-gray-300 text-gray-700 font-semibold rounded-md px-4 py-2 hover:bg-gray-400">
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
        className={`px-6 py-3 my-10 text-lg rounded-md shadow-md  bg-red-600 hover:bg-red-600 text-white`}
        onClick={deconnection}>
        Se deconnecter
      </button>
    </div>
  );
};

export default Home;
