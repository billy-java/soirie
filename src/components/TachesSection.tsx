import React, { useState } from 'react';
import { ITache } from '../lib/interfaces/entites';
import { iconsListe } from '../lib/iconsListe';
import {
  dateJSVersIDate,
  iDateVersInput,
  iDateVersString,
  inputVersIDate,
} from '../lib/functions/convertirDates';
import { Titre3 } from './Titres';
import { convertirPrioriteF } from '../lib/functions/mesFonctions';

interface TachesProps {
  tachesProps: ITache[];
}

interface Data {
  ajouter: ITache | null;
  modifier: ITache | null;
}

const TachesSection: React.FC<TachesProps> = ({ tachesProps = [] }) => {
  const [taches, setTaches] = useState<ITache[]>(tachesProps);
  const [data, setData] = useState<Data>({
    ajouter: null,
    modifier: null,
  });
  const [idConfirmationSuppression, setDeleteConfirmationId] = useState<
    string | null
  >(null);

  const toggleFormulaireAjout = () => {
    if (data.ajouter) {
      setData({ ajouter: null, modifier: null });
    } else {
      setData({
        ajouter: {
          id: Date.now().toString(),
          idEvenement: '1',
          titre: '',
          description: '',
          dateLimite: dateJSVersIDate(new Date()),
          terminee: false,
          priorite: 2,
        },
        modifier: null,
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
      setData({ ajouter: null, modifier: null });
    }
  };

  const demarrerModification = (id: string) => {
    const tacheToEdit = taches.find((tache) => tache.id === id);
    if (tacheToEdit) {
      setData({
        ajouter: null,
        modifier: { ...tacheToEdit },
      });
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
      setData({ ajouter: null, modifier: null });
    }
  };

  const annulerModification = () => {
    setData({ ajouter: null, modifier: null });
  };

  const supprimerTache = (id: string) => {
    setTaches(taches.filter((tache) => tache.id !== id));
    setDeleteConfirmationId(null); // Annule la confirmation après suppression
  };

  const confirmerSuppression = (id: string) => {
    setDeleteConfirmationId(id);
  };

  const annulerSuppression = () => {
    setDeleteConfirmationId(null);
  };

  const changerStatutTache = (id: string) => {
    setTaches(
      taches.map((tache) =>
        tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
      )
    );
  };

  return (
    <section className="flex flex-col gap-10 p-4 rounded-md my-20">
      <div className="flex justify-center w-full">
        <button
          onClick={toggleFormulaireAjout}
          className={`px-6 py-3 text-lg rounded-md shadow-md transition ${
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
            if (idConfirmationSuppression) annulerSuppression();
            ajouterTache(e);
          }}
          className="flex flex-col gap-2 mt-4">
          <p className="text-gray-500">
            Remplissez le formulaire pour ajouter une nouvelle tâche.
          </p>
          <input
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
            className={`flex flex-col shadow-lg rounded-lg ${idConfirmationSuppression === tache.id ? 'bg-red-50' : 'bg-white'}`}>
            <div
              className={`flex justify-between items-center  rounded-lg p-4  ${
                tache.terminee && idConfirmationSuppression !== tache.id
                  ? 'bg-green-100'
                  : ''
              }`}>
              {data.modifier?.id === tache.id ? (
                <form
                  onSubmit={(e) => {
                    if (idConfirmationSuppression) annulerSuppression();
                    validerModification(e);
                  }}
                  className="flex flex-wrap flex-grow gap-2 mr-4">
                  <input
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
                    type="date"
                    value={iDateVersInput(
                      data.modifier?.dateLimite || {
                        jour: 1,
                        mois: 1,
                        annee: 2024,
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
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-2 py-1 flex-grow rounded-md hover:bg-blue-600">
                    Sauvegarder
                  </button>

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
                    if (idConfirmationSuppression) annulerSuppression();
                    changerStatutTache(tache.id);
                  }}
                  className={`text-white rounded-md px-2 py-2 ${tache.terminee ? 'bg-green-600 hover:bg-green-800' : 'border border-gray-300 bg-yellow-600 hover:bg-yellow-800'}
                                    `}>
                  {tache.terminee ? iconsListe.true1 : iconsListe.attention}
                </button>
                <button
                  onClick={() => {
                    if (idConfirmationSuppression) annulerSuppression();
                    demarrerModification(tache.id);
                  }}
                  className="bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-800 transition">
                  {iconsListe.modifier}
                </button>
                <button
                  onClick={() => {
                    if (
                      idConfirmationSuppression &&
                      idConfirmationSuppression === tache.id
                    ) {
                      annulerSuppression();
                    } else {
                      confirmerSuppression(tache.id);
                    }
                  }}
                  className="bg-red-600 text-white px-2 py-2 rounded-md hover:bg-red-800 transition">
                  {iconsListe.supprimer}
                </button>
              </div>
            </div>

            {idConfirmationSuppression === tache.id && (
              <div className="mt-4 p-4 bg-red-100 m-1 rounded-md">
                <p className="text-red-600">
                  Êtes-vous sûr de vouloir supprimer cette tâche ?
                </p>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => supprimerTache(tache.id)}
                    className="bg-red-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-red-600 transition">
                    Oui
                  </button>
                  <button
                    onClick={annulerSuppression}
                    className="bg-gray-300 text-gray-700 font-semibold rounded-md px-4 py-2 hover:bg-gray-400 transition">
                    Non
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TachesSection;
