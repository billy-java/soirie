import { useState, useEffect } from 'react';
import CopierLien from '../../components/CopierLien';
import TachesSection from '../../components/TachesSection';
import { IEvenement, IInvitation } from '../../lib/interfaces/entites';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState_DB } from '../../redux/store';
import {
  iDateVersDateJS,
  iDateVersString,
} from '../../lib/functions/convertirDates';

import { Titre1, Titre2, Titre3 } from '../../components/Titres';
import ModalInvitation from '../../components/ModalInvitation';
import { iconsListe } from '../../lib/iconsListe';

const Dashboard = () => {
  const { eId } = useParams();
  const navigate = useNavigate();
  const cetEvenement = useSelector((state: RootState_DB) =>
    state.evenement.evenementsAttr.find((el) => el.id === eId)
  ) as IEvenement;

  const [showUrgentTasks, setShowUrgentTasks] = useState(false);
  const anniversaireTaches = useSelector(
    (state: RootState_DB) => state.tache.taches
  );

  const mesTaches = anniversaireTaches.filter(
    (el) => el.idEvenement === '1' && el.priorite === 3
  );

  const cetInvitation = useSelector(
      (etat: RootState_DB) => etat.evenement.evenementsAttr.find(el => el.id === eId)?.invitation
    ) as IInvitation;

  const [tempsRestant, setTempsRestant] = useState({
    jours: 0,
    heures: 0,
    minutes: 0,
    secondes: 0,
  });

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const calculerCompteAReboursF = () => {
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

    const interval = setInterval(calculerCompteAReboursF, 1000);
    return () => clearInterval(interval);
  }, [cetEvenement.date]);

  const calculF = () => {
    return (
      Number(cetInvitation.nombreConfirmations) +
      Number(cetInvitation.nombreDoute)
    );
  };

  return (
    <div className="px-8 py-14 mb-10 min-h-screen flex flex-col gap-8 bg-gray-50">
      <Titre1>Tableau de Bord</Titre1>
      {/* Compte à rebours */}
      <section className="bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-lg p-8 rounded-lg text-center">
        <Titre2>Compte à rebours ⏳</Titre2>
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
        <Titre3>Informations importantes :</Titre3>

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
      {/* Lien d'invitation */} {/* partie a modifier grace a chatgpt */}
      <section
        className={`mb-6 shadow-lg text-lg p-6 rounded-lg border ${cetInvitation.statut === 1 ? 'bg-indigo-100 border-indigo-200' : cetInvitation.statut === 2 ? 'bg-green-100 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <Titre3>Votre lien d'invitation :</Titre3>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">
              Nombre de personnes souhaitées:
            </span>{' '}
            {cetInvitation.nombrePersonnes || 'Illimité'}
          </p>
          <p>
            <span className="font-semibold">Nombre d''invites total :</span>{' '}
            <span className="font-bold text-white text-xl bg-green-700 px-2 py-1 rounded-lg">
              {calculF()}
            </span>{' '}
          </p>{' '}
          <p>
            <span className="font-semibold">Nombre de confirmations:</span>{' '}
            {cetInvitation.nombreConfirmations}
          </p>
          <p>
            <span className="font-semibold">Nombre d'hesitation:</span>{' '}
            {cetInvitation.nombreDoute}
          </p>
          <p>
            <span className="font-semibold">Nombre de rejets :</span>{' '}
            {cetInvitation.nombreRejets}
          </p>
          <p>
            <span className="font-semibold">Statut de l'invitation:</span>{' '}
            <span
              className={`font-bold ${cetInvitation.statut === 1 ? 'text-yellow-700' : cetInvitation.statut === 2 ? 'text-green-700' : cetInvitation.statut === 3 ? 'text-red-700' : 'text-black'}`}>
              {cetInvitation.statut === 1
                ? 'Ouvert'
                : cetInvitation.statut === 2
                  ? 'Terminé'
                  : cetInvitation.statut === 3
                    ? 'Annulé'
                    : 'ERREUR'}
            </span>
          </p>
          <p>
            <span className="font-semibold">Partagez ce lien :</span>{' '}
            <span className="text-blue-600 underline">
              {window.location.origin}/e/{eId}/invitation
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <CopierLien lien={`${window.location.origin}/e/${eId}/invitation`} />
            <button
              onClick={() => navigate('/e/'+eId+'/invitation')}
              className={`px-4 py-2 text-white rounded-lg  bg-green-600 hover:bg-green-800`}>
              {iconsListe.voir}
            </button>
            <button
              onClick={() => setModalVisible(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800">
              {iconsListe.modifier}
            </button>
          </div>
        </div>
      </section>
      {/* Tâches urgentes */}
      <section className="py-6 flex flex-col justify-center items-center">
        <Titre3>Tâches urgentes à faire :</Titre3>

        <button
          onClick={() => setShowUrgentTasks(!showUrgentTasks)}
          className={`px-4 py-2 size-fit text-white rounded-lg  ${showUrgentTasks ? 'bg-red-600 hover:bg-red-800' : 'bg-indigo-600 hover:bg-indigo-800'}`}>
          {showUrgentTasks ? 'Masquer les tâches' : 'Afficher les tâches'}
        </button>

        {showUrgentTasks && (
          <TachesSection tachesProps={mesTaches} toutesLesTaches={false} />
        )}
      </section>
      {/* Modal de modification */}
      {modalVisible && (
        <ModalInvitation
          invitation={cetInvitation}
          onClose={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};
export default Dashboard;
