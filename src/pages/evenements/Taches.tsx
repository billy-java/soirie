import { anniversaireTaches } from '../../lib/localDB';

const Taches = () => {
  return (
    <div>
      <h1>Gestion des Tâches</h1>
      <ul>
        {anniversaireTaches.map((tache) => (
          <li key={tache.id}>
            <h3>{tache.titre}</h3>
            <p>
              Statut:{' '}
              {tache.statut === 1
                ? 'À faire'
                : tache.statut === 2
                  ? 'En cours'
                  : 'Terminé'}
            </p>
            <p>Priorité: {tache.priorite}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Taches;
