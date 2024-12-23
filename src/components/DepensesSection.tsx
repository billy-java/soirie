import React, { useState } from 'react';
import { IDepense } from '../lib/interfaces/entites';
import { iconsListe } from '../lib/iconsListe';

interface DepensesProps {
  depensesInitiales: IDepense[];
}

interface Data {
  ajouter: IDepense | null;
  modifier: IDepense | null;
}

const SectionDepenses: React.FC<DepensesProps> = ({
  depensesInitiales = [],
}) => {
  const [depenses, setDepenses] = useState<IDepense[]>(depensesInitiales);
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
          nom: '',
          description: '',
          montant: 0,
          date: new Date().toISOString().split('T')[0],
          terminee: false,
        },
        modifier: null,
      });
    }
  };

  const ajouterDepense = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.ajouter?.nom.trim()) {
      setDepenses([
        {
          ...data.ajouter,
          id: Date.now().toString(),
        },
        ...depenses,
      ]);
      setData({ ajouter: null, modifier: null });
    }
  };

  // Fonction pour démarrer la modification d'une dépense
  const demarrerModification = (id: string) => {
    const depenseToEdit = depenses.find((depense) => depense.id === id);
    if (depenseToEdit) {
      setData({
        ajouter: null,
        modifier: { ...depenseToEdit },
      });
    }
  };

  // Fonction pour valider la modification
  const validerModification = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.modifier && data.modifier.nom.trim()) {
      setDepenses(
        depenses.map((depense) =>
          depense.id === data.modifier?.id
            ? {
                ...depense,
                nom: data.modifier.nom,
                description: data.modifier.description,
                montant: data.modifier.montant,
                date: data.modifier.date,
              }
            : depense
        )
      );
      setData({ ajouter: null, modifier: null });
    }
  };

  // Fonction pour supprimer une dépense
  const supprimerDepense = (id: string) => {
    setDepenses(depenses.filter((depense) => depense.id !== id));
  };

  // Fonction pour changer le statut d'une dépense
  const changerStatutDepense = (id: string) => {
    setDepenses(
      depenses.map((depense) =>
        depense.id === id
          ? { ...depense, terminee: !depense.terminee }
          : depense
      )
    );
  };

  return (
    <section className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md mb-20">
      <h2 className="text-lg font-bold">Gestion des Dépenses :</h2>
      <button
        onClick={toggleFormulaireAjout}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
        {data.ajouter ? 'Annuler' : 'Ajouter une dépense'}
      </button>

      {data.ajouter && (
        <form onSubmit={ajouterDepense} className="flex flex-col gap-2 mt-4">
          <input
            type="text"
            value={data.ajouter?.nom || ''}
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? { ...data.ajouter, nom: e.target.value }
                  : null,
              })
            }
            placeholder="Nom de la dépense"
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
            placeholder="Description de la dépense"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            value={data.ajouter?.montant || 0}
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? { ...data.ajouter, montant: parseFloat(e.target.value) }
                  : null,
              })
            }
            placeholder="Montant"
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            value={data.ajouter?.date || ''}
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? { ...data.ajouter, date: e.target.value }
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
        {depenses.map((depense) => (
          <li
            key={depense.id}
            className={`flex justify-between items-center p-2 border-b last:border-none ${
              depense.terminee ? 'bg-green-100' : ''
            }`}>
            {data.modifier?.id === depense.id ? (
              <form
                onSubmit={validerModification}
                className="flex flex-wrap gap-2 mr-4">
                <input
                  type="text"
                  value={data.modifier?.nom || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      modifier: data.modifier
                        ? { ...data.modifier, nom: e.target.value }
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
                  type="number"
                  value={data.modifier?.montant || 0}
                  onChange={(e) =>
                    setData({
                      ...data,
                      modifier: data.modifier
                        ? {
                            ...data.modifier,
                            montant: parseFloat(e.target.value),
                          }
                        : null,
                    })
                  }
                  className="p-2 border border-gray-300 rounded-md flex-grow"
                />
                <input
                  type="date"
                  value={data.modifier?.date || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      modifier: data.modifier
                        ? { ...data.modifier, date: e.target.value }
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
              <div>
                <p className="text-lg font-medium">{depense.nom}</p>
                <span>{depense.description}</span>
                <p>
                  Montant :{' '}
                  <span className="bg-slate-200 p-1 rounded-lg text-lg">
                    {depense.montant} €
                  </span>
                </p>
                <p>Date : {depense.date}</p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={() => changerStatutDepense(depense.id)}
                className={`${depense.terminee ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'}
                  text-white px-2 py-1 rounded-md flex justify-center items-center w-28 h-10`}>
                {iconsListe.badge2}
                <p>{depense.terminee ? 'Effectué' : 'En cours'}</p>
              </button>
              <button
                onClick={() => demarrerModification(depense.id)}
                className="bg-indigo-400 text-white px-2 py-1 rounded-md hover:bg-indigo-500 w-10 h-10">
                {iconsListe.modifier}
              </button>
              <button
                onClick={() => supprimerDepense(depense.id)}
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

export default SectionDepenses;
