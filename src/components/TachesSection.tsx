import React, { useState } from 'react';
import { ITache } from '../lib/interfaces/entites';
import { iconsListe } from '../lib/iconsListe';

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

  const toggleFormulaireAjout = () => {
    if (data.ajouter) {
      setData({ ajouter: null, modifier: null }); // Réinitialiser l'état si on annule
    } else {
      setData({
        ajouter: {
          id: Date.now().toString(),
          idEvenement: '1',
          titre: '',
          description: '',
          dateLimite: new Date().toISOString().split('T')[0],
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

  const supprimerTache = (id: string) => {
    setTaches(taches.filter((tache) => tache.id !== id));
  };

  const changerStatutTache = (id: string) => {
    setTaches(
      taches.map((tache) =>
        tache.id === id ? { ...tache, terminee: !tache.terminee } : tache
      )
    );
  };

  return (
    <section className="flex flex-col gap-4 rounded-md mb-20">
      <h2 className="text-lg font-bold">Gestion des Tâches :</h2>
      <button
        onClick={toggleFormulaireAjout}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
        {data.ajouter ? 'Annuler' : 'Ajouter une tâche'}
      </button>

      {data.ajouter && (
        <form onSubmit={ajouterTache} className="flex flex-col gap-2 mt-4">
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
            value={data.ajouter?.dateLimite || ''}
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? { ...data.ajouter, dateLimite: e.target.value }
                  : null,
              })
            }
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Sauvegarder
          </button>
        </form>
      )}

      <ul className="bg-white rounded-md p-2">
        {taches.map((tache) => (
          <li
            key={tache.id}
            className={`flex justify-between items-center p-2 border-b last:border-none ${
              tache.terminee ? 'bg-green-100' : ''
            }`}>
            {data.modifier?.id === tache.id ? (
              <form
                onSubmit={validerModification}
                className="flex flex-wrap gap-2 mr-4">
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
                  value={data.modifier?.dateLimite || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      modifier: data.modifier
                        ? { ...data.modifier, dateLimite: e.target.value }
                        : null,
                    })
                  }
                  className="p-2 border border-gray-300 rounded-md flex-grow"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                  Sauvegarder
                </button>
              </form>
            ) : (
              <div className="mr-4">
                <p className="text-lg font-medium">{tache.titre}</p>
                <p>{tache.description}</p>
                <p>{tache.dateLimite}</p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={() => changerStatutTache(tache.id)}
                className={`${tache.terminee ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'}
                               text-white px-2 py-1 rounded-md flex justify-center items-center w-24 h-10`}>
                {tache.terminee ? 'Terminée' : 'À faire'}
              </button>
              <button
                onClick={() => demarrerModification(tache.id)}
                className="bg-indigo-400 text-white px-2 py-1 rounded-md hover:bg-indigo-500 w-10 h-10">
                {iconsListe.modifier}
              </button>
              <button
                onClick={() => supprimerTache(tache.id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 w-10 h-10">
                {iconsListe.supprimer}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TachesSection;
