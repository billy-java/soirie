//src\pages\evenements\Prestataires.tsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrestatairesSection from '../../components/PrestatairesSection';
import { Titre1 } from '../../components/Titres';
import { RootState_DB, AppDispatch } from '../../redux/store'; // Import de AppDispatch
import { fetchPrestataires } from '../../redux/prestataireSlice';

const Prestataires = () => {
  const dispatch = useDispatch<AppDispatch>(); // Typage de dispatch avec AppDispatch

  // Récupération des prestataires, du loading, et de l'erreur depuis Redux
  const { prestataires, loading, error } = useSelector(
    (state: RootState_DB) => state.prestataire
  );

  // Déclenchement de l'action fetchPrestataires lors du montage du composant
  useEffect(() => {
    dispatch(fetchPrestataires());
  }, [dispatch]);

  return (
    <div className="px-4 py-10 min-h-screen flex flex-col items-center bg-gray-100">
      <Titre1>Prestataires</Titre1>

      {loading && (
          <div className="text-blue-500 text-center">
            Chargement de la liste des prestataires...
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center">Erreur : {error}</div>
        )}

      {/* Si aucune erreur et les données sont chargées, afficher les prestataires */}
      {!loading && !error && (
        <PrestatairesSection prestatairesInitiales={prestataires} />
      )}
    </div>
  );
};

export default Prestataires;
