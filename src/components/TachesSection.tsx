import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

import { ITache } from '../lib/interfaces/entites';

interface tachesProps {
  tachesProps: ITache[];
}

const TachesSection: React.FC<tachesProps> = ({ tachesProps }) => {
  const [taches, setTaches] = useState<ITache[]>(tachesProps);
  const [editingTask, setEditingTask] = useState<string | null>(null); // Stocke l'id de la tâche en cours de modification
  const [newTitle, setNewTitle] = useState<string>('');

  // Gestion de l'ajout d'une tâche
  const ajouterTache = () => {
    const titre = prompt('Entrez le titre de la nouvelle tâche :');
    if (titre) {
      setTaches([
        ...taches,
        {
          id: Date.now().toString(),
          idEvenement: '1',
          titre,
          statut: 1,
          priorite: 2,
        },
      ]);
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
      setEditingTask(null); // Réinitialiser l'état de modification
      setNewTitle(''); // Réinitialiser le titre
    }
  };

  // Gestion du déplacement des tâches
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return; // Si la tâche est déplacée hors de la liste

    const tachesReordonnees = Array.from(taches);
    const [movedItem] = tachesReordonnees.splice(source.index, 1);
    tachesReordonnees.splice(destination.index, 0, movedItem);

    setTaches(tachesReordonnees);
  };

  return (
    <section className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md">
      <h2 className="text-lg font-bold">Gestion des Tâches :</h2>
      <button
        onClick={ajouterTache}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Ajouter une tâche
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taches">
          {(provided) => (
            <ul
              className="bg-white rounded-md p-2"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {taches.map((tache, index) => (
                <Draggable key={tache.id} draggableId={tache.id} index={index}>
                  {(provided) => (
                    <li
                      className="flex justify-between items-center p-2 border-b last:border-none"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
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
                            className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                          >
                            Sauvegarder
                          </button>
                        </form>
                      ) : (
                        <span>{tache.titre}</span>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => modifierTache(tache.id, tache.titre)}
                          className="bg-yellow-400 text-white px-2 py-1 rounded-md hover:bg-yellow-500"
                        >
                          M
                        </button>
                        <button
                          onClick={() => supprimerTache(tache.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                        >
                          X
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default TachesSection;
