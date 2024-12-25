import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IEvenement } from '../lib/interfaces/entites';
import { iconsListe } from '../lib/iconsListe'; // Assurez-vous d'importer les icônes nécessaires
import { useDispatch, useSelector } from 'react-redux';
import { RootState_DB } from '../redux/store';
import { setIdEv } from '../redux/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const initialEvenements = useSelector(
    (state: RootState_DB) => state.evenement.evenementsAttr
  );

  const [evenements, setEvenements] = useState<IEvenement[]>(initialEvenements);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<
    string | null
  >(null);
  const [newEvent, setNewEvent] = useState<Partial<IEvenement>>({
    nom: '',
    date: '',
    lieu: '',
    budget: 0,
  });

  // Gestion des champs du formulaire
  const handleInputChange = (
    field: keyof IEvenement,
    value: string | number
  ) => {
    setNewEvent((prev) => ({ ...prev, [field]: value }));
  };

  // Ajout d'un nouvel événement
  const handleAddEvent = () => {
    if (!newEvent.nom || !newEvent.date || !newEvent.lieu || !newEvent.budget) {
      alert('Tous les champs sont obligatoires.');
      return;
    }
    setEvenements((prev) => [
      ...prev,
      {
        id: `${Date.now()}`, // Génère un id unique basé sur le temps
        idUtilisateur: '123', // Id utilisateur fictif
        type: 'Fête',
        ...newEvent,
      } as IEvenement,
    ]);
    setShowAddForm(false);
    setNewEvent({ nom: '', date: '', lieu: '', budget: 0 });
  };

  // Modification d'un événement existant
  const handleEditEvent = (id: string) => {
    const updatedEvents = evenements.map((event) =>
      event.id === id ? { ...event, ...newEvent } : event
    );
    setEvenements(updatedEvents);
    setEditEventId(null);
    setNewEvent({ nom: '', date: '', lieu: '', budget: 0 });
  };

  // Suppression d'un événement
  const handleDeleteEvent = (id: string) => {
    setEvenements((prev) => prev.filter((event) => event.id !== id));
    setDeleteConfirmationId(null);
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6">
      {/* Titre principal */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Planifiez Votre Événement Facilement
        </h1>
        <p className="text-gray-700 text-lg">
          Une plateforme pour organiser des fêtes, mariages, anniversaires et
          bien plus encore !
        </p>
      </div>

      {/* Bouton pour créer un événement */}
      <div className="mb-8">
        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
          onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Annuler' : 'Créer un nouvel événement'}
        </button>
      </div>

      {/* Formulaire d'ajout d'événement */}
      {showAddForm && (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Créer un nouvel événement</h3>
          <input
            type="text"
            placeholder="Nom de l'événement"
            value={newEvent.nom || ''}
            onChange={(e) => handleInputChange('nom', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <input
            type="date"
            value={newEvent.date || ''}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <input
            type="text"
            placeholder="Lieu"
            value={newEvent.lieu || ''}
            onChange={(e) => handleInputChange('lieu', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <input
            type="number"
            placeholder="Budget (€)"
            value={newEvent.budget || ''}
            onChange={(e) =>
              handleInputChange('budget', parseFloat(e.target.value))
            }
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
          />
          <button
            onClick={handleAddEvent}
            className="w-full bg-green-500 text-white font-semibold rounded-md py-2 hover:bg-green-600 transition">
            Sauvegarder
          </button>
        </div>
      )}

      {/* Liste des événements */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Vos événements :
        </h2>
        <ul className="space-y-6">
          {evenements.map((evenement) => (
            <li
              key={evenement.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition relative">
              <div>
                <Link
                  onClick={() => dispatch(setIdEv(evenement.id))}
                  to={`/e/${evenement.id}/dashboard`}
                  className="block text-gray-800 hover:text-blue-600">
                  <h4 className="text-xl font-bold mb-2">{evenement.nom}</h4>
                  <p className="text-gray-600">
                    <span className="font-semibold">Date :</span>{' '}
                    {new Date(evenement.date).toLocaleDateString()}
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
                    setEditEventId(evenement.id);
                    setNewEvent({
                      nom: evenement.nom,
                      date: evenement.date,
                      lieu: evenement.lieu,
                      budget: evenement.budget,
                    });
                  }}
                  className="bg-indigo-400 text-white px-2 py-1 rounded-md hover:bg-indigo-500 transition">
                  {iconsListe.modifier}
                </button>
                <button
                  onClick={() => setDeleteConfirmationId(evenement.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition">
                  {iconsListe.supprimer}
                </button>
              </div>

              {/* Formulaire de modification */}
              {editEventId === evenement.id && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                  <h4 className="font-semibold mb-2">Modifier l'événement</h4>
                  <input
                    type="text"
                    placeholder="Nom"
                    value={newEvent.nom || ''}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <input
                    type="date"
                    value={newEvent.date || ''}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Lieu"
                    value={newEvent.lieu || ''}
                    onChange={(e) => handleInputChange('lieu', e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <input
                    type="number"
                    placeholder="Budget (€)"
                    value={newEvent.budget || ''}
                    onChange={(e) =>
                      handleInputChange('budget', parseFloat(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  />

                  <button
                    onClick={() => handleEditEvent(evenement.id)}
                    type="submit"
                    className="bg-blue-500 text-white w-full px-4 py-2 rounded-md hover:bg-blue-600 flex flex-wrap justify-center items-center space-x-2">
                    <p>Sauvegarder</p> {iconsListe.enregister}
                  </button>
                </div>
              )}

              {/* Confirmation de suppression */}
              {deleteConfirmationId === evenement.id && (
                <div className="mt-4 p-4 bg-red-100 rounded-md">
                  <p className="text-red-600">
                    Êtes-vous sûr de vouloir supprimer cet événement ?
                  </p>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => handleDeleteEvent(evenement.id)}
                      className="bg-red-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-red-600 transition">
                      Oui
                    </button>
                    <button
                      onClick={() => setDeleteConfirmationId(null)}
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
    </div>
  );
};

export default Home;
