
import { evenements } from '../lib/localDB';

const Evenement = () => {
  return (
    <div>
      <h1>Gestion des Événements</h1>
      <button>Créer un Nouvel Événement</button>
      <ul>
        {evenements.map((event) => (
          <li key={event.id}>
            <h3>{event.nom}</h3>
            <p>Date: {event.date}</p>
            <p>Lieu: {event.lieu}</p>
            <p>Budget: {event.budget}€</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Evenement;
