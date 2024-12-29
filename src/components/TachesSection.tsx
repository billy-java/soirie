import React, { useState } from 'react';
import { ITache } from '../lib/interfaces/entites';
import { iconsListe } from '../lib/iconsListe';
import {
  iDateVersInput,
  iDateVersString,
  inputVersIDate,
} from '../lib/functions/convertirDates';
import { Titre3 } from './Titres';
import { convertirPrioriteF } from '../lib/functions/mesFonctions';
import { useParams } from 'react-router-dom';
import { initialiserTache } from '../lib/functions/initialiseEntities';
import { useDispatch } from 'react-redux';
import {
  setToutesLesTaches,
  setToutesLesTachesPrioritaires,
} from '../redux/tacheSlice';

interface TachesProps {
  tachesProps: ITache[];
  toutesLesTaches: boolean;
}

interface IData {
  ajouter: ITache | null;
  modifier: ITache | null;
  idSuppression: string | null;
  sauvegargerListe: boolean;
}

const TachesSection: React.FC<TachesProps> = ({
  tachesProps = [],
  toutesLesTaches,
}) => {
  const dispatch = useDispatch();
  const { eId } = useParams();
  const [taches, setTaches] = useState<ITache[]>(tachesProps);
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
        ajouter: initialiserTache(eId as string),
        modifier: null,
        idSuppression: null,
        sauvegargerListe: true,
      });
    }
  };

  const ajouterTache = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.ajouter?.titre.trim()) {
      setTaches([
        {
          ...data.ajouter,
          id: Date.now().toString(),
        },
        ...taches,
      ]);
      setData({
        ajouter: null,
        modifier: null,
        idSuppression: null,
        sauvegargerListe: true,
      });
    }
  };

  const demarrerModification = (id: string) => {
    const tacheToEdit = taches.find((tache) => tache.id === id);
    if (tacheToEdit) {
      setData({
        ...data,
        ajouter: null,
        modifier: { ...tacheToEdit },
        idSuppression: null,
      });
    }
  };

  const sauvegardeSurleServeur = () => {
    setData({ ...data, sauvegargerListe: false });
    if (toutesLesTaches) {
      dispatch(setToutesLesTaches(taches));
    } else {
      dispatch(setToutesLesTachesPrioritaires(taches));
    }
  };

  const validerModification = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.modifier && data.modifier.titre.trim()) {
      setTaches(
        taches.map((tache) =>
          tache.id === data.modifier?.id
            ? { ...tache, ...data.modifier }
            : tache
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

  const annulerModification = () => {
    setData({
      ...data,
      ajouter: null,
      modifier: null,
      idSuppression: null,
    });
  };

  const supprimerTache = (id: string) => {
    setTaches(taches.filter((tache) => tache.id !== id));
    const temp = {
      ...data,
      idSuppression: null,
      sauvegargerListe: true,
    } as IData;
    setData(temp);
  };

  const confirmerSuppression = (id: string) => {
    const temp = { ...data, idSuppression: id } as IData;
    setData(temp);
  };

  const annulerSuppression = () => {
    const temp = { ...data, idSuppression: null } as IData;
    setData(temp);
  };

  const changerStatutTache = (id: string) => {
    setTaches(
      taches.map((tache) =>
        tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
      )
    );
    setData({
      ajouter: null,
      modifier: null,
      idSuppression: null,
      sauvegargerListe: true,
    });
  };

  return (
    <section className="flex flex-col gap-10 p-4 rounded-md my-20">
      <div className="flex justify-center w-full">
        <button
          onClick={toggleFormulaireAjout}
          className={`px-6 py-3 text-lg rounded-md shadow-md  ${
            data.ajouter
              ? 'bg-red-600 hover:bg-red-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-800 text-white'
          }`}
          title="Cliquez pour ajouter une nouvelle dépense.">
          {data.ajouter ? 'Annuler' : 'Ajouter une tâche'}
        </button>
      </div>

      {data.ajouter && (
        <form
          onSubmit={(e) => {
            if (data.idSuppression) annulerSuppression();
            ajouterTache(e);
          }}
          className="flex flex-col gap-2 mt-4">
          <p className="text-gray-500">
            Remplissez le formulaire pour ajouter une nouvelle tâche.
          </p>
          <input
            required
            type="text"
            value={data.ajouter?.titre || ''}
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? { ...data.ajouter, titre: e.target.value }
                  : null,
              })
            }
            placeholder="Titre de la tâche"
            className="p-2 border border-gray-300 rounded-md"
          />
          <textarea
            value={data.ajouter?.description || ''}
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? { ...data.ajouter, description: e.target.value }
                  : null,
              })
            }
            placeholder="Description de la tâche"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            required
            type="date"
            value={
              data.ajouter?.dateLimite
                ? iDateVersInput(data.ajouter.dateLimite)
                : ''
            }
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? {
                      ...data.ajouter,
                      dateLimite: inputVersIDate(e.target.value),
                    }
                  : null,
              })
            }
            className="p-2 border border-gray-300 rounded-md"
          />

          <select
            value={data.ajouter?.priorite || 2}
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? {
                      ...data.ajouter,
                      priorite: parseInt(e.target.value) as 1 | 2 | 3,
                    }
                  : null,
              })
            }
            className="p-2 border border-gray-300 rounded-md">
            <option value={1}>Basse</option>
            <option value={2}>Moyenne</option>
            <option value={3}>Haute</option>
          </select>

          <button
            type="submit"
            title="Cliquez pour sauvegarder la dépense."
            className="bg-indigo-600 text-white w-full px-4 py-2 rounded-md hover:bg-indigo-800 flex flex-wrap justify-center items-center space-x-2">
            <p>Sauvegarder</p> {iconsListe.enregister}
          </button>
        </form>
      )}

      <ul className="space-y-6">
        <p className="text-gray-700">
          Utilisez les boutons a droite pour valider(⚠️), modifier ou supprimer
          vos tâches.
        </p>
        {taches.map((tache) => (
          <li
            key={tache.id}
            className={`flex flex-col shadow-lg rounded-lg ${data.idSuppression === tache.id ? 'bg-red-50' : 'bg-white'}`}>
            <div
              className={`flex justify-between items-center  rounded-lg p-4  ${
                tache.terminee && data.idSuppression !== tache.id
                  ? 'bg-green-100'
                  : ''
              }`}>
              {data.modifier?.id === tache.id ? (
                <form
                  onSubmit={(e) => {
                    if (data.idSuppression) annulerSuppression();
                    validerModification(e);
                  }}
                  className="flex flex-wrap flex-grow gap-2 mr-4">
                  <input
                    required
                    type="text"
                    value={data.modifier?.titre || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        modifier: data.modifier
                          ? { ...data.modifier, titre: e.target.value }
                          : null,
                      })
                    }
                    className="p-2 border border-gray-300 rounded-md flex-grow"
                  />
                  <input
                    required
                    value={data.modifier?.description || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        modifier: data.modifier
                          ? { ...data.modifier, description: e.target.value }
                          : null,
                      })
                    }
                    className="p-2 border border-gray-300 rounded-md flex-grow"
                  />
                  <input
                    required
                    type="date"
                    value={iDateVersInput(
                      data.modifier?.dateLimite || {
                        jour: 1,
                        mois: 1,
                        annee: 2025,
                        heure: 0,
                        minute: 0,
                      }
                    )}
                    onChange={(e) =>
                      setData({
                        ...data,
                        modifier: data.modifier
                          ? {
                              ...data.modifier,
                              dateLimite: inputVersIDate(e.target.value),
                            }
                          : null,
                      })
                    }
                    className="p-2 border border-gray-300 rounded-md flex-grow"
                  />

                  <select
                    value={data.modifier?.priorite || 2}
                    onChange={(e) =>
                      setData({
                        ...data,
                        modifier: data.modifier
                          ? {
                              ...data.modifier,
                              priorite: parseInt(e.target.value) as 1 | 2 | 3,
                            }
                          : null,
                      })
                    }
                    className="p-2 border border-gray-300 rounded-md">
                    <option value={1}>Basse</option>
                    <option value={2}>Moyenne</option>
                    <option value={3}>Haute</option>
                  </select>
                  <div className="w-full flex justify-center space-x-4">
                    <button
                      type="submit"
                      title="Cliquez pour enregistrer les modifications."
                      className="bg-indigo-600 text-white w-full px-4 py-2 size-fit rounded-md hover:bg-indigo-800 flex flex-wrap justify-center items-center space-x-2">
                      <p>Sauvegarder</p> {iconsListe.enregister}
                    </button>
                    <button
                      onClick={annulerModification}
                      type="reset"
                      className="bg-red-600 text-white w-full px-4 py-2 size-fit rounded-md hover:bg-red-800 flex flex-wrap justify-center items-center space-x-2">
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex-grow mr-4">
                  <Titre3>{tache.titre}</Titre3>
                  <p>{tache.description}</p>
                  <p>Date limite : {iDateVersString(tache.dateLimite!)}</p>
                  <p>Priorite : {convertirPrioriteF(tache.priorite)}</p>
                </div>
              )}

              <div className="flex flex-col  items-center gap-2">
                <button
                  onClick={() => {
                    if (data.idSuppression) annulerSuppression();
                    changerStatutTache(tache.id);
                  }}
                  className={`text-white rounded-md px-2 py-2 ${tache.terminee ? 'bg-green-600 hover:bg-green-800' : 'border border-gray-300 bg-yellow-600 hover:bg-yellow-800'}
                                    `}>
                  {tache.terminee ? iconsListe.true1 : iconsListe.attention}
                </button>
                <button
                  onClick={() => {
                    if (data.idSuppression) annulerSuppression();
                    demarrerModification(tache.id);
                  }}
                  className="bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-800">
                  {iconsListe.modifier}
                </button>
                <button
                  onClick={() => {
                    if (data.idSuppression && data.idSuppression === tache.id) {
                      annulerSuppression();
                    } else {
                      confirmerSuppression(tache.id);
                    }
                  }}
                  className="bg-red-600 text-white px-2 py-2 rounded-md hover:bg-red-800">
                  {iconsListe.supprimer}
                </button>
              </div>
            </div>

            {data.idSuppression === tache.id && (
              <div className="mt-4 p-4 bg-red-100 m-1 rounded-md">
                <p className="text-red-600">
                  Êtes-vous sûr de vouloir supprimer cette tâche ?
                </p>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => supprimerTache(tache.id)}
                    className="bg-red-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-red-600">
                    Oui
                  </button>
                  <button
                    onClick={annulerSuppression}
                    className="bg-gray-300 text-gray-700 font-semibold rounded-md px-4 py-2 hover:bg-gray-400">
                    Non
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="flex justify-center w-full">
        {data.sauvegargerListe && (
          <button
            onClick={sauvegardeSurleServeur}
            className={`px-6 py-3 text-lg rounded-md shadow-md  bg-indigo-600 hover:bg-indigo-800 text-white`}
            title="Cliquez pour Sauvegarder tout la liste de taches.">
            {taches.length === 0
              ? 'Sauvegarger une liste vide'
              : 'Sauvegarder tout la liste de taches'}
          </button>
        )}
      </div>
    </section>
  );
};
export default TachesSection;
