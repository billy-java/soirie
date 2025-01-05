import { useDispatch, useSelector } from 'react-redux';
import TachesSection from '../../components/TachesSection';
import { Titre1 } from '../../components/Titres';
import { AppDispatch, RootState_DB } from '../../redux/store';
import {
  fetchTachesByEvenement,
} from '../../redux/tacheSlice';
import { useParams } from 'react-router-dom';
import {  ITache } from '../../lib/interfaces/entites';
import { useEffect } from 'react';

const Taches = () => {
  const { eId } = useParams(); // Récupère l'ID de l'événement depuis l'URL
  const dispatch = useDispatch<AppDispatch>();


  // Récupère les états des tâches
  const { taches: listeDesTaches, loading, error } = useSelector(
    (state: RootState_DB) => state.tache
  );

  // Charger les tâches de l'événement courant au montage du composant
  useEffect(() => {
    if (eId) {
      dispatch(fetchTachesByEvenement(eId));
    }
  }, [dispatch, eId]);



  return (
    <div className="px-4 py-10 min-h-screen bg-gray-100">
      <div className="text-center p-4 mb-8">
        <Titre1>Tâches à faire</Titre1>

        {/* Affichage des états */}
        {loading && (
          <div className="text-blue-500 text-center">
            Chargement des tâches...
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center">Erreur : {error}</div>
        )}

        {/* Description */}
        {!loading && !error && (
          <>
            <p className="text-gray-700 text-lg">
              Voici la liste des tâches à faire si vous voulez réaliser un
              anniversaire parfait.
            </p>
            <p className="text-gray-700 text-lg">
              Vous pouvez marquer une tâche comme Terminée, créer, modifier ou
              supprimer une tâche.
            </p>
          </>
        )}
      </div>

      {/* Liste des tâches */}
      {!loading && !error && (
        <TachesSection
          tachesProps={listeDesTaches as ITache[]}
          toutesLesTaches={true}
        />
      )}
    </div>
  );
};

export default Taches;
