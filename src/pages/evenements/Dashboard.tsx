import CopierLien from '../../components/CopierLien';
import TachesSection from '../../components/TachesSection';
import { IInvitation } from '../../lib/interfaces/entites';
import { taches } from '../../lib/localDB';

const Dashboard = () => {
  const mesTaches = taches.filter((el) => el.idEvenement === '1');

  const invitation: IInvitation = {
    id: '1',
    idEvenement: '1', // Événement 1
    nom: 'Jean Dupont',
    nombrePersonnes: 2,
    nombreConfirmations: 1,
    nombreRejets: 0,
    statut: 1, // Ouvert
    lien: 'https://example',
  };

  const cetEvenement = {
    id: '1',
    idUtilisateur: '1', // Alice est l'organisateur
    nom: "Fête d'anniversaire",
    type: 'Fête',
    date: '2024-12-31T23:59:59.999Z', // Date au format ISO
    lieu: 'Salle des fêtes',
    budget: 1000,
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>Tableau de Bord</h1>

      <section className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md">
        <h2>Informations importantes :</h2>
        <div>
          <h1>
            {cetEvenement.nom}: <span>{cetEvenement.type}</span>
          </h1>
          <p>Votre Budget total : {cetEvenement.budget}</p>
          <p>Lieu de la ceremonie : {cetEvenement.lieu}</p>
          <p>Date de la ceremonie : {cetEvenement.date}</p>
          <p>Nom de l'invitation : {invitation.nom}</p>
          <p>Nom de l'invitation : {invitation.nom}</p>
        </div>
      </section>

      <section className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md">
        <h2>Votre lien d'invitation :</h2>
        <div>
          <p>Nom de l'invitation : {invitation.nom}</p>
          <p>Nombre de personnes souhaitees :{invitation.nombrePersonnes}</p>
          <p>Nombre de confirmations :{invitation.nombreConfirmations}</p>
          <p>Nombre de rejets : {invitation.nombreRejets}</p>
          <p>Statut de l'invitation : {invitation.statut}</p>
          <CopierLien lien={invitation.lien} />
        </div>
      </section>

      <section className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md">
        <h2>Afficher un compte a rebours ici :</h2>
        <p>J-17 Jours 2 Heures.</p>
      </section>

      <section className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md">
        <h2>Tâches urgentes a faire:</h2>
        <div>
          <TachesSection tachesProps={mesTaches} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
