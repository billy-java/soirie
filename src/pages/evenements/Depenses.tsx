import { useDispatch, useSelector } from 'react-redux';
import DepensesSection from '../../components/DepensesSection';
import { Titre1 } from '../../components/Titres';
import { RootState_DB, AppDispatch } from '../../redux/store'; // Assurez-vous d'importer AppDispatch
import { useEffect } from 'react';
import { fetchDepenses } from '../../redux/depenseSlice';

const Depenses = () => {
  const dispatch = useDispatch<AppDispatch>(); // Utilisation du type AppDispatch
  const { depenses, loading, error } = useSelector(
    (state: RootState_DB) => state.depense
  );

  useEffect(() => {
    dispatch(fetchDepenses('EVE-M5FWJ2FN-9641')); // Dispatch de l'action
  }, [dispatch]);

  return (
    <div className="px-4 py-10 min-h-screen bg-gray-100">
      <div className="text-center p-4 mb-8">
        <Titre1>Suivi des Dépenses</Titre1>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}

        <p className="text-gray-700 text-lg">
          Cette liste contient les dépenses à venir ainsi que celles que vous
          avez déjà effectuées.
        </p>
      </div>
      <DepensesSection depensesInitiales={depenses} />
    </div>
  );
};

export default Depenses;
