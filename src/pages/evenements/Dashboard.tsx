import { useState, useEffect } from 'react';
import CopierLien from '../../components/CopierLien';
import TachesSection from '../../components/TachesSection';
import { IInvitation } from '../../lib/interfaces/entites';
import { anniversaireTaches } from '../../lib/localDB';


const Dashboard = () => {

  const [showUrgentTasks, setShowUrgentTasks] = useState(false); // État pour gérer l'affichage des tâches urgentes
  const mesTaches = anniversaireTaches.filter(
    (el) => el.idEvenement === '1' && el.priorite === 3
  );

  const invitation: IInvitation = {
    id: '1',
    idEvenement: '1',
    nom: 'Jean Dupont',
    nombrePersonnes: 2,
    nombreConfirmations: 1,
    nombreRejets: 0,
    statut: 1, // Ouvert
    lien: 'https://example',
  };

  const cetEvenement = {
    id: '1',
    idUtilisateur: '1',
    nom: "Fête d'anniversaire",
    type: 'Fête',
    date: '2024-12-31T23:59:59.999Z',
    lieu: 'Salle des fêtes',
    budget: 1000,
  };

  // Compte à rebours dynamique
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const eventDate = new Date(cetEvenement.date).getTime();
      const currentDate = new Date().getTime();
      const timeRemaining = eventDate - currentDate;

      if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setCountdown(
          `${days} Jours ${hours} Heures ${minutes} Minutes ${seconds} Secondes`
        );
      } else {
        setCountdown("L'événement est passé!");
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [cetEvenement.date]);

  return (
    <div className="flex flex-col gap-8 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-indigo-600">
        Tableau de Bord
      </h1>

      {/* Informations importantes */}
      <section className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Informations importantes :
        </h2>
        <div className="space-y-2">
          <p className="text-lg font-medium">
            {cetEvenement.nom}:{' '}
            <span className="font-normal">{cetEvenement.type}</span>
          </p>
          <p className="text-lg">
            Votre Budget total :{' '}
            <span className="font-bold">${cetEvenement.budget}</span>
          </p>
          <p className="text-lg">Lieu de la cérémonie : {cetEvenement.lieu}</p>
          <p className="text-lg">
            Date de la cérémonie :{' '}
            {new Date(cetEvenement.date).toLocaleString()}
          </p>
          <p className="text-lg">Nom de l'invitation : {invitation.nom}</p>
        </div>
      </section>

      {/* Lien d'invitation */}
      <section className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Votre lien d'invitation :
        </h2>
        <div className="space-y-2">
          <p className="text-lg">Nom de l'invitation : {invitation.nom}</p>
          <p className="text-lg">
            Nombre de personnes souhaitées : {invitation.nombrePersonnes}
          </p>
          <p className="text-lg">
            Nombre de confirmations : {invitation.nombreConfirmations}
          </p>
          <p className="text-lg">
            Nombre de rejets : {invitation.nombreRejets}
          </p>
          <p className="text-lg">
            Statut de l'invitation :{' '}
            {invitation.statut === 1 ? 'Ouvert' : 'Fermé'}
          </p>
          <CopierLien lien={invitation.lien} />
        </div>
      </section>

      {/* Compte à rebours */}
      <section className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Compte à rebours :
        </h2>
        <p className="text-xl font-bold text-red-600">{countdown}</p>
      </section>

      {/* Tâches urgentes */}
      <section className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Tâches urgentes à faire :
        </h2>
        <button
          onClick={() => setShowUrgentTasks(!showUrgentTasks)}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          {showUrgentTasks ? 'Masquer les tâches' : 'Afficher les tâches'}
        </button>
        {showUrgentTasks && <TachesSection tachesProps={mesTaches} />}
      </section>
    </div>
  );
};

export default Dashboard;
