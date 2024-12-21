import { taches, invitations, evenements } from '../../lib/localDB';

const Dashboard = () => {
  const urgentTasks = taches.filter((tache) => tache.priorite === 1);
  const pendingInvitations = invitations.filter(
    (invite) => invite.statut === 1
  );

  return (
    <div>
      <h1>Tableau de Bord</h1>

      <section>
        <h2>Événements en cours</h2>
        <ul>
          {evenements.map((event) => (
            <li key={event.id}>
              {event.nom} - {event.date}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Tâches urgentes</h2>
        <ul>
          {urgentTasks.map((tache) => (
            <li key={tache.id}>
              {tache.titre} - {tache.statut}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Invitations en attente</h2>
        <ul>
          {pendingInvitations.map((invite) => (
            <li key={invite.id}>
              {invite.nom} - {invite.statut}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
