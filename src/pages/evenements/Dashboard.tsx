import { useState, useEffect } from 'react';
import CopierLien from '../../components/CopierLien';
import TachesSection from '../../components/TachesSection';
import { IEvenement, IInvitation } from '../../lib/interfaces/entites';
import { anniversaireTaches } from '../../lib/localDB';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState_DB } from '../../redux/store';
import {
  iDateVersDateJS,
  iDateVersString,
} from '../../lib/functions/convertirDates';

const Dashboard = () => {
  const { eId } = useParams();

  const cetEvenement = useSelector((state: RootState_DB) =>
    state.evenement.evenementsAttr.find((el) => el.id === eId)
  ) as IEvenement;

  const [showUrgentTasks, setShowUrgentTasks] = useState(false);
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
    statut: 1, //ouvert
    lien: 'https://example',
  };

  const [tempsRestant, setTempsRestant] = useState({
    jours: 0,
    heures: 0,
    minutes: 0,
    secondes: 0,
  });

  useEffect(() => {
    const calculerCompteARebours = () => {
      const dateEvenement = iDateVersDateJS(cetEvenement.date).getTime();
      const dateActuelle = new Date().getTime();
      const tempsRestantEnMillisecondes = dateEvenement - dateActuelle;

      if (tempsRestantEnMillisecondes > 0) {
        const days = Math.floor(
          tempsRestantEnMillisecondes / (1000 * 60 * 60 * 24)
        );
        const hours = Math.floor(
          (tempsRestantEnMillisecondes % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (tempsRestantEnMillisecondes % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor(
          (tempsRestantEnMillisecondes % (1000 * 60)) / 1000
        );

        setTempsRestant({
          jours: days,
          heures: hours,
          minutes: minutes,
          secondes: seconds,
        });
      } else {
        setTempsRestant({ jours: 0, heures: 0, minutes: 0, secondes: 0 });
      }
    };

    const interval = setInterval(calculerCompteARebours, 1000);
    return () => clearInterval(interval);
  }, [cetEvenement.date]);

  return (
    <div className="flex flex-col gap-8 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-indigo-700">
        Tableau de Bord
      </h1>

      {/* Compte à rebours */}
      <section className="bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-lg p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600">
          Compte à rebours ⏳
        </h2>
        {tempsRestant.jours > 0 ||
        tempsRestant.heures > 0 ||
        tempsRestant.minutes > 0 ||
        tempsRestant.secondes > 0 ? (
          <div className="mt-6 flex justify-center space-x-4">
            <div className="bg-red-100 px-4 py-2 rounded-md">
              <p className="text-2xl font-bold text-red-700">
                {tempsRestant.jours}
              </p>
              <p className="text-sm font-medium text-gray-600">Jours</p>
            </div>
            <div className="bg-yellow-100 px-4 py-2 rounded-md">
              <p className="text-2xl font-bold text-yellow-700">
                {tempsRestant.heures}
              </p>
              <p className="text-sm font-medium text-gray-600">Heures</p>
            </div>
            <div className="bg-green-100 px-4 py-2 rounded-md">
              <p className="text-2xl font-bold text-green-700">
                {tempsRestant.minutes}
              </p>
              <p className="text-sm font-medium text-gray-600">Minutes</p>
            </div>
            <div className="bg-blue-100 px-4 py-2 rounded-md">
              <p className="text-2xl font-bold text-blue-700">
                {tempsRestant.secondes}
              </p>
              <p className="text-sm font-medium text-gray-600">Secondes</p>
            </div>
          </div>
        ) : (
          <p className="text-2xl font-semibold text-red-600 mt-4">
            L'événement peut deja commencer !
          </p>
        )}
      </section>

      {/* Informations importantes */}
      <section className="bg-indigo-50 shadow-lg text-lg  p-6 rounded-lg border border-indigo-200">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Informations importantes :
        </h2>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Nom:</span> {cetEvenement.nom}
          </p>
          <p>
            <span className="font-semibold">Type devenement:</span>{' '}
            {cetEvenement.type}
          </p>
          <p>
            <span className="font-semibold">Votre Budget total :</span>{' '}
            <span className="text-green-700 font-bold">
              {cetEvenement.budget} €
            </span>
          </p>
          <p>
            <span className="font-semibold">Lieu de la cérémonie:</span>{' '}
            <span className="text-indigo-600">{cetEvenement.lieu}</span>{' '}
          </p>
          <p>
            <span className="font-semibold">Date de la cérémonie:</span>{' '}
            {iDateVersString(cetEvenement.date, true)}
          </p>
        </div>
      </section>

      {/* Lien d'invitation */}
      <section className="mb-6 bg-green-50 shadow-lg text-lg p-6 rounded-lg border border-green-200">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Votre lien d'invitation :
        </h2>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">
              Nombre de personnes souhaitées:
            </span>{' '}
            {invitation.nombrePersonnes}
          </p>
          <p>
            <span className="font-semibold">Nombre de confirmations:</span>{' '}
            {invitation.nombreConfirmations}
          </p>
          <p>
            <span className="font-semibold">Nombre de rejets:</span>{' '}
            {invitation.nombreRejets}
          </p>
          <p>
            <span className="font-semibold">Statut de l'invitation:</span>{' '}
            <span
              className={`font-bold ${invitation.statut === 1 ? 'text-green-600' : 'text-red-600'}`}>
              {invitation.statut === 1 ? 'Ouvert' : 'Fermé'}
            </span>
          </p>
          <CopierLien lien={invitation.lien} />
        </div>
      </section>

      {/* Tâches urgentes */}
      <section className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Tâches urgentes à faire :
        </h2>
        <button
          onClick={() => setShowUrgentTasks(!showUrgentTasks)}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800 transition">
          {showUrgentTasks ? 'Masquer les tâches' : 'Afficher les tâches'}
        </button>
        {showUrgentTasks && <TachesSection tachesProps={mesTaches} />}
      </section>
    </div>
  );
};
export default Dashboard;
