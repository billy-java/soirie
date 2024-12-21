import { evenements } from '../../lib/localDB';

const Depenses = () => {
  return (
    <div>
      <h1>Suivi des Dépenses</h1>
      <ul>
        {evenements.map((event) => (
          <li key={event.id}>
            <h3>{event.nom}</h3>
            <p>Budget: {event.budget}€</p>
            <p>Dépenser: {/* Total des dépenses calculées ici */}€</p>
            <button>Ajouter une dépense</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Depenses;
