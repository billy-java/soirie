import DepensesSection from '../../components/DepensesSection';
import { Titre1 } from '../../components/Titres';
import { depenses } from '../../lib/localDB';

const Depenses = () => {
  return (
    <div className="px-4 py-10 min-h-screen bg-gray-100">
      <div className="text-center p-4 mb-8">
        <Titre1>Suivi des Dépenses</Titre1>

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
