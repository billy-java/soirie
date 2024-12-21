import { prestataires } from '../../lib/localDB';

const Prestataires = () => {
  return (
    <div>
      <h1>Gestion des Prestataires</h1>
      <ul>
        {prestataires.map((presta) => (
          <li key={presta.id}>
            <h3>{presta.nom}</h3>
            <p>Type: {presta.type}</p>
            <p>Note: {presta.note}/5</p>
            <p>Localisation: {presta.localisation}</p>
            <button>Réserver</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prestataires;
