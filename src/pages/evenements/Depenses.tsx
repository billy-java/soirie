import DepensesSection from "../../components/DepensesSection";
import { depenses } from "../../lib/localDB";

const Depenses = () => {
  return (
    <div>
      <h1>Suivi des Dépenses</h1>
      <DepensesSection depensesInitiales={depenses}/>
    </div>
  );
};

export default Depenses;
