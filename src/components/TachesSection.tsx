import React, { useState } from 'react';
import { ITache } from '../lib/interfaces/entites';
import { iconsListe } from '../lib/iconsListe';

interface TachesProps {
  tachesProps: ITache[];
}

const TachesSection: React.FC<TachesProps> = ({ tachesProps = [] }) => {
  const [taches, setTaches] = useState<ITache[]>(tachesProps);
  const [editingTask, setEditingTask] = useState<string | null>(null); // Stocke l'id de la tâche en cours de modification
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>(''); // Added state for new description
  const [showAddForm, setShowAddForm] = useState<boolean>(false); // Contrôle la visibilité du formulaire d'ajout
  const [addTitle, setAddTitle] = useState<string>(''); // Contient le titre de la nouvelle tâche
  const [addDescription, setAddDescription] = useState<string>(''); // Contient la description de la nouvelle tâche

  // Gestion de l'affichage du formulaire d'ajout
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setAddTitle(''); // Réinitialise le champ
    setAddDescription(''); // Réinitialise le champ
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
          description: addDescription,
          dateLimite: '',
          terminee: false, // Nouvelle tâche "à faire" par défaut
          priorite: 2, // Priorité moyenne par défaut
        },
        ...taches,
      ]);
      setAddTitle(''); // Réinitialise le titre
      setAddDescription(''); // Réinitialise la description
      setShowAddForm(false); // Cache le formulaire après ajout
    }
  };

  // Gestion de la suppression d'une tâche
  const supprimerTache = (id: string) => {
    setTaches(taches.filter((tache) => tache.id !== id));
  };

  // Gestion de la modification d'une tâche
  const modifierTache = (id: string, titre: string, description: string) => {
    setEditingTask(id);
    setNewTitle(titre);
    setNewDescription(description);
  };

  // Gestion de la soumission du formulaire de modification
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask && newTitle && newDescription) {
      setTaches(
        taches.map((t) =>
          t.id === editingTask
            ? { ...t, titre: newTitle, description: newDescription }
            : t
        )
      );
      setEditingTask(null); // Réinitialise l'état de modification
      setNewTitle(''); // Réinitialise le titre
      setNewDescription(''); // Réinitialise la description
    }
  };

  // Gestion du changement de statut (marquer comme terminé ou non)
  const changerStatut = (id: string) => {
    setTaches(
      taches.map((tache) =>
        tache.id === id
          ? { ...tache, terminee: !tache.terminee } // Correct toggle for terminee
          : tache
      )
    );
  };

  return (
    <section className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md mb-20">
      <h2 className="text-lg font-bold">Gestion des Tâches :</h2>
      <button
        onClick={toggleAddForm}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
        {showAddForm ? 'Annuler' : 'Ajouter une tâche'}
      </button>

      {showAddForm && (
        <form onSubmit={handleAddTask} className="flex flex-col gap-2 mt-4">
          <input
            type="text"
            value={addTitle}
            onChange={(e) => setAddTitle(e.target.value)}
            placeholder="Titre de la tâche"
            className="p-2 border border-gray-300 rounded-md"
          />
          <textarea
            value={addDescription}
            onChange={(e) => setAddDescription(e.target.value)}
            placeholder="Description de la tâche"
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
            {editingTask === tache.id ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-wrap gap-2 mr-2">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md flex-grow"
                />
                <input
                  type="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md flex-grow"
                />
                <button
                  type="submit"
                  className="bg-blue-500 w-fit text-white px-2 py-1 rounded-md hover:bg-blue-600">
                  Sauvegarder
                </button>
              </form>
            ) : (
              <div>
                <p className="text-lg font-medium">{tache.titre}</p>
                <span>{tache.description}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={() => changerStatut(tache.id)}
                className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 w-20 h-10">
                {tache.terminee ? 'Terminée' : 'A faire'}
              </button>
              <button
                onClick={() =>
                  modifierTache(
                    tache.id,
                    tache.titre ?? '',
                    tache.description ?? ''
                  )
                }
                className="bg-indigo-400 text-white px-2 py-1 rounded-md hover:bg-yellow-500 w-10 h-10">
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
