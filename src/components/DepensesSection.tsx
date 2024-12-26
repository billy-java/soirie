import React, { useEffect, useState } from 'react';
import { IDepense } from '../lib/interfaces/entites';
import { iconsListe } from '../lib/iconsListe';
import {
  dateJSVersIDate,
  iDateVersInput,
  iDateVersString,
  inputVersIDate,
} from '../lib/functions/convertirDates';
import { Titre3 } from './Titres';
import ExportPDFButton from './ExportPDFButton';

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
  const [resultatCalculs, setResultatCalculs] = useState<{
    totalDepense: number; // Montant total dépensé
    reste: number; // Montant restant
    pourcentageUtilise: number; // Pourcentage du budget utilisé
    pourcentageRestant: number; // Pourcentage du budget restant
    totalPrevues: number; // Total des dépenses prévues (non effectuées)
    depensesEffectueesCount: number; // Nombre de dépenses effectuées
    depensesRestantesCount: number; // Nombre de dépenses restantes
    budgetApresToutesDepenses: number; // Budget restant si toutes les dépenses prévues sont effectuées
    depassement: boolean; // Indicateur de dépassement de budget
  }>({
    totalDepense: 0,
    reste: 0,
    pourcentageUtilise: 0,
    pourcentageRestant: 100,
    totalPrevues: 0,
    depensesEffectueesCount: 0,
    depensesRestantesCount: 0,
    budgetApresToutesDepenses: 0,
    depassement: false,
  });

  const [data, setData] = useState<Data>({
    ajouter: null,
    modifier: null,
  });
  const [idConfirmationSuppression, setDeleteConfirmationId] = useState<
    string | null
  >(null);

  const [triCritere, setTriCritere] = useState<'date' | 'montant' | 'terminee'>(
    'date'
  );
  const [ordreCroissant, setOrdreCroissant] = useState<boolean>(true);

  useEffect(() => {
    const calculF = () => {
      // Filtrer les dépenses terminées et non terminées
      const depensesEffectuees = depenses.filter(
        (depense) => depense?.terminee
      );
      const depensesPrevues = depenses.filter((depense) => !depense?.terminee);

      // Calculer le total des montants des dépenses effectuées
      const totalDepense = depensesEffectuees.reduce(
        (total, depense) => total + (depense?.montant || 0),
        0
      );

      // Calculer le total des montants des dépenses prévues
      const totalPrevues = depensesPrevues.reduce(
        (total, depense) => total + (depense?.montant || 0),
        0
      );

      // Calculs principaux
      const budgetInitial = 400; // Vous pouvez rendre ce paramètre dynamique
      const reste = budgetInitial - totalDepense;
      const pourcentageUtilise =
        totalDepense > 0 ? (totalDepense / budgetInitial) * 100 : 0;
      const pourcentageRestant = 100 - pourcentageUtilise;

      // Comptage des dépenses
      const depensesEffectueesCount = depensesEffectuees.length;
      const depensesRestantesCount = depensesPrevues.length;

      // Calcul du budget après toutes les dépenses
      const budgetApresToutesDepenses =
        budgetInitial - (totalDepense + totalPrevues);
      const depassement = budgetApresToutesDepenses < 0;

      // Résultat
      setResultatCalculs({
        totalDepense, // Total des dépenses terminées
        reste, // Budget restant après les dépenses terminées
        pourcentageUtilise, // Pourcentage du budget utilisé
        pourcentageRestant, // Pourcentage du budget restant
        totalPrevues, // Total des dépenses a venir
        depensesEffectueesCount, // Nombre de dépenses terminées
        depensesRestantesCount, // Nombre de dépenses non terminées
        budgetApresToutesDepenses, // Budget après toutes les dépenses (terminées + prévues)
        depassement, // Indicateur de dépassement de budget
      });
    };

    calculF();
  }, [depenses]);

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
          date: dateJSVersIDate(new Date()),
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

  const demarrerModification = (id: string) => {
    const depenseToEdit = depenses.find((depense) => depense.id === id);
    if (depenseToEdit) {
      setData({
        ajouter: null,
        modifier: { ...depenseToEdit },
      });
    }
  };

  const annulerModification = () => {
    setData({ ajouter: null, modifier: null });
  };

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

  const supprimerDepense = (id: string) => {
    setDepenses(depenses.filter((depense) => depense.id !== id));
  };

  const changerStatutDepense = (id: string) => {
    setDepenses(
      depenses.map((depense) =>
        depense.id === id
          ? { ...depense, terminee: !depense.terminee }
          : depense
      )
    );

    setDeleteConfirmationId(null);
  };

  const confirmerSuppression = (id: string) => {
    setDeleteConfirmationId(id);
  };

  const annulerSuppression = () => {
    setDeleteConfirmationId(null);
  };

  const trierDepenses = (
    critere: 'date' | 'montant' | 'terminee',
    croissant: boolean
  ) => {
    const depensesTriees = [...depenses];

    depensesTriees.sort((a, b) => {
      if (critere === 'date') {
        const dateA = new Date(a.date.annee, a.date.mois - 1, a.date.jour);
        const dateB = new Date(b.date.annee, b.date.mois - 1, b.date.jour);
        return croissant
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      if (critere === 'montant') {
        return croissant ? a.montant - b.montant : b.montant - a.montant;
      }

      if (critere === 'terminee') {
        return croissant ? (a.terminee ? 1 : -1) : a.terminee ? -1 : 1;
      }

      return 0;
    });

    setDepenses(depensesTriees);
  };

  return (
    <section className="flex flex-col gap-10 bg-gray-100 p-4 rounded-md mb-20">
      <div className="flex justify-center w-full">
        <button
          onClick={toggleFormulaireAjout}
          className={`px-6 py-3 text-lg rounded-md shadow-md transition ${
            data.ajouter
              ? 'bg-red-600 hover:bg-red-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-800 text-white'
          }`}
          title="Cliquez pour ajouter une nouvelle dépense.">
          {data.ajouter ? 'Annuler' : 'Ajouter une dépense'}
        </button>
      </div>

      {data.ajouter && (
        <form
          onSubmit={(e) => {
            if (idConfirmationSuppression) annulerSuppression();
            ajouterDepense(e);
          }}
          className="flex flex-col gap-2 mt-4">
          <p className="text-gray-500">
            Remplissez le formulaire pour ajouter une nouvelle dépense.
          </p>
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
            title="Entrez le nom de la dépense."
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
            title="Entrez une brève description de la dépense."
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
            title="Entrez le montant de la dépense."
          />
          <input
            type="date"
            value={iDateVersInput(data.ajouter?.date) || ''}
            onChange={(e) =>
              setData({
                ...data,
                ajouter: data.ajouter
                  ? { ...data.ajouter, date: inputVersIDate(e.target.value) }
                  : null,
              })
            }
            className="p-2 border border-gray-300 rounded-md"
            title="Sélectionnez la date de la dépense."
          />

          <button
            type="submit"
            title="Cliquez pour sauvegarder la dépense."
            className="bg-indigo-600 text-white w-full px-4 py-2 rounded-md hover:bg-indigo-800 flex flex-wrap justify-center items-center space-x-2">
            <p>Sauvegarder</p> {iconsListe.enregister}
          </button>
        </form>
      )}

      {/* Informations sur largent de lutilisateur */}
      <section
        id="pdf"
        className="bg-indigo-50 shadow-lg text-lg p-6 rounded-lg border border-indigo-200">
        <h3 className="font-bold text-2xl mb-4">Votre argent :</h3>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">
              Votre budget total pour cet événement :
            </span>{' '}
            <span className="text-indigo-700 font-bold">400 €</span>
          </p>
          <p>
            <span className="font-semibold">Vous avez déjà dépensé :</span>{' '}
            <span
              className={`font-bold ${resultatCalculs.totalDepense > 400 ? 'text-red-700' : 'text-green-700'}`}>
              {resultatCalculs.totalDepense} € (
              {resultatCalculs.pourcentageUtilise.toFixed(2)}%){' '}
              {resultatCalculs.totalDepense > 400 ? '⚠️' : ''}
            </span>
          </p>
          <p>
            <span className="font-semibold">Il vous reste :</span>{' '}
            <span
              className={`font-bold ${resultatCalculs.reste < 0 ? 'text-red-700' : 'text-blue-700'}`}>
              {resultatCalculs.reste +
                ' € (' +
                resultatCalculs.pourcentageRestant.toFixed(2) +
                '%)'}
              {resultatCalculs.reste < 0 ? '⚠️' : ''}
            </span>
          </p>

          <p>
            <span className="font-semibold">
              Total des dépenses prévues (dans votre liste de dépenses mais non
              effectuées) :
            </span>{' '}
            <span className="text-orange-700 font-bold">
              {resultatCalculs.totalPrevues} €
            </span>
          </p>
          <p>
            <span className="font-semibold">
              Nombre de dépenses effectuées :
            </span>{' '}
            <span className="text-blue-600 font-bold">
              {resultatCalculs.depensesEffectueesCount}
            </span>
          </p>
          <p>
            <span className="font-semibold">
              Nombre de dépenses restantes :
            </span>{' '}
            <span className="text-gray-600 font-bold">
              {resultatCalculs.depensesRestantesCount}
            </span>
          </p>
          <p>
            <span className="font-semibold">
              Budget restant si toutes les dépenses prévues sont effectuées :
            </span>{' '}
            <span
              className={`font-bold ${resultatCalculs.budgetApresToutesDepenses < 0 ? 'text-red-700' : 'text-green-700'}`}>
              {resultatCalculs.budgetApresToutesDepenses} €
            </span>
          </p>
          {resultatCalculs.depassement && (
            <p className="text-red-600 font-bold">
              ⚠️ Attention : Vous dépasserez le budget si toutes les dépenses
              prévues sont effectuées !
            </p>
          )}
        </div>
      </section>

      <ExportPDFButton sectionString="pdf" />

      <div className="rounded-md p-4">
        <Titre3>Liste des dépenses :</Titre3>
        <p className="text-gray-700 text-lg">
          Utilisez cette section pour ajouter, modifier ou supprimer vos
          dépenses.
        </p>
        <p className="text-gray-700 text-lg mb-10">
          Vous pouvez également marquer les dépenses comme effectuées (⚠️).
        </p>

        <div className="flex flex-wrap gap-4 mb-10">
          {/* Liste déroulante pour le critère de tri */}
          <select
            value={triCritere}
            onChange={(e) => {
              const critere = e.target.value as 'date' | 'montant' | 'terminee';
              setTriCritere(critere);
              trierDepenses(critere, ordreCroissant);
            }}
            className="p-2 border border-gray-300 rounded-md flex-grow">
            <option value="date">Trier par Date</option>
            <option value="montant">Trier par Montant</option>
            <option value="terminee">Trier par Statut</option>
          </select>

          {/* Bouton pour permuter entre Croissant/Décroissant */}
          <button
            onClick={() => {
              setOrdreCroissant(!ordreCroissant);
              trierDepenses(triCritere, !ordreCroissant);
            }}
            className="p-2 border bg-white border-gray-300 rounded-md flex-grow">
            Trie {ordreCroissant ? 'Croissant' : 'Décroissant'}
          </button>
        </div>

        <ul className="space-y-6">
          {depenses.map((depense) => (
            <li
              key={depense.id}
              className={`flex flex-col shadow-lg rounded-lg ${idConfirmationSuppression === depense.id ? 'bg-red-50' : 'bg-white'}`}>
              <div
                className={`flex justify-between items-center  rounded-lg p-4  ${
                  depense.terminee && idConfirmationSuppression !== depense.id
                    ? 'bg-green-100'
                    : ''
                }`}>
                {data.modifier?.id === depense.id ? (
                  <form
                    onSubmit={(e) => {
                      if (idConfirmationSuppression) annulerSuppression();
                      validerModification(e);
                    }}
                    className="flex flex-wrap flex-grow gap-2 mr-4">
                    {/* Formulaire de modification */}
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
                      title="Modifiez le nom de la dépense."
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
                      title="Modifiez la description de la dépense."
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
                      title="Modifiez le montant de la dépense."
                    />
                    <input
                      type="date"
                      value={iDateVersInput(data.modifier?.date) || ''}
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
                      className="p-2 border border-gray-300 rounded-md flex-grow"
                      title="Modifiez la date de la dépense."
                    />

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
                  <div className="flex-grow mr-2">
                    <p className="text-lg font-medium">{depense.nom}</p>
                    <span>{depense.description}</span>
                    <p>
                      Coût :{' '}
                      <span className="bg-slate-200  px-2 rounded-lg text-lg">
                        {depense.montant} €
                      </span>
                    </p>
                    <p>Date : {iDateVersString(depense.date)}</p>
                  </div>
                )}

                <div className="flex flex-col  items-center gap-2">
                  <button
                    onClick={() => {
                      if (idConfirmationSuppression) annulerSuppression();
                      changerStatutDepense(depense.id);
                    }}
                    title={
                      depense.terminee
                        ? 'Marquer comme non effectué'
                        : 'Marquer comme effectué'
                    }
                    className={`text-white rounded-md px-2 py-2 ${depense.terminee ? 'bg-green-600 hover:bg-green-800' : 'border border-gray-300 bg-yellow-600 hover:bg-yellow-800'}
                  `}>
                    {depense.terminee ? iconsListe.true1 : iconsListe.attention}
                  </button>
                  <button
                    onClick={() => {
                      if (idConfirmationSuppression) annulerSuppression();
                      demarrerModification(depense.id);
                    }}
                    className="bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-800 transition">
                    {iconsListe.modifier}
                  </button>
                  <button
                    onClick={() => {
                      if (
                        idConfirmationSuppression &&
                        idConfirmationSuppression === depense.id
                      ) {
                        annulerSuppression();
                      } else {
                        confirmerSuppression(depense.id);
                      }
                    }}
                    className="bg-red-600 text-white px-2 py-2 rounded-md hover:bg-red-800 transition">
                    {iconsListe.supprimer}
                  </button>
                </div>
              </div>

              {idConfirmationSuppression === depense.id && (
                <div className="mt-4 p-4 bg-red-100 rounded-md m-2">
                  <p className="text-red-600">
                    Êtes-vous sûr de vouloir supprimer cette tâche ?
                  </p>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => supprimerDepense(depense.id)}
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
      </div>
    </section>
  );
};

export default SectionDepenses;
