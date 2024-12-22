import React, { useState } from 'react';
import { ITache } from '../lib/interfaces/entites';

interface TachesProps {
  tachesProps: ITache[];
}

const TachesSection: React.FC<TachesProps> = ({ tachesProps = [] }) => {
  const [taches, setTaches] = useState<ITache[]>(tachesProps);
  const [editingTask, setEditingTask] = useState<string | null>(null); // Stocke l'id de la tâche en cours de modification
  const [newTitle, setNewTitle] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false); // Contrôle la visibilité du formulaire d'ajout
  const [addTitle, setAddTitle] = useState<string>(''); // Contient le titre de la nouvelle tâche

  // Gestion de l'affichage du formulaire d'ajout
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setAddTitle(''); // Réinitialise le champ
  };

  // Gestion de l'ajout d'une tâche
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (addTitle.trim()) {
      setTaches([
        {
          id: Date.now().toString(),
          idEvenement: '1',
          titre: addTitle,
          statut: 1,
          priorite: 2,
        },
        ...taches,
      ]);
      setAddTitle(''); // Réinitialise le titre
      setShowAddForm(false); // Cache le formulaire après ajout
    }
  };

  // Gestion de la suppression d'une tâche
  const supprimerTache = (id: string) => {
    setTaches(taches.filter((tache) => tache.id !== id));
  };

  // Gestion de la modification d'une tâche
  const modifierTache = (id: string, titre: string) => {
    setEditingTask(id);
    setNewTitle(titre);
  };

  // Gestion de la soumission du formulaire de modification
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask && newTitle) {
      setTaches(
        taches.map((t) =>
          t.id === editingTask ? { ...t, titre: newTitle } : t
        )
      );
      setEditingTask(null); // Réinitialise l'état de modification
      setNewTitle(''); // Réinitialise le titre
    }
  };

  return (
    <section className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md">
      <h2 className="text-lg font-bold">Gestion des Tâches :</h2>
      <button
        onClick={toggleAddForm}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
        {showAddForm ? 'Annuler' : 'Ajouter une tâche'}
      </button>

      {showAddForm && (
        <form onSubmit={handleAddTask} className="flex gap-2 mt-4">
          <input
            type="text"
            value={addTitle}
            onChange={(e) => setAddTitle(e.target.value)}
            placeholder="Titre de la tâche"
            className="flex-1 p-2 border border-gray-300 rounded-md"
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
            className="flex justify-between items-center p-2 border-b last:border-none">
            {editingTask === tache.id ? (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                  Sauvegarder
                </button>
              </form>
            ) : (
              <span>{tache.titre}</span>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => modifierTache(tache.id, tache.titre)}
                className="bg-yellow-400 text-white px-2 py-1 rounded-md hover:bg-yellow-500">
                M
              </button>
              <button
                onClick={() => supprimerTache(tache.id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TachesSection;
