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
import { iconsListe } from '../../lib/iconsListe';

const Dashboard = () => {
  const { eId } = useParams();

  const cetEvenement = useSelector((state: RootState_DB) =>
    state.evenement.evenementsAttr.find((el) => el.id === eId)
  ) as IEvenement;

  const [showUrgentTasks, setShowUrgentTasks] = useState(false);
  const mesTaches = anniversaireTaches.filter(
    (el) => el.idEvenement === '1' && el.priorite === 3
  );
  const [modifier, setModifier] = useState<boolean>(false);

  const [invitation, setInvitation] = useState<IInvitation>({
    id: '1',
    idEvenement: '1',
    nom: 'Jean Dupont',
    nombrePersonnes: 2,
    nombreConfirmations: 1,
    nombreRejets: 0,
    statut: 1, //ouvert
    lien: 'https://example',
  });

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

  const changeNombrePersonnes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nouvelleValeur = parseInt(e.target.value, 10);
    if (isNaN(nouvelleValeur) || nouvelleValeur < 0) {
      return;
    } else {
      setInvitation({
        ...invitation,
        nombrePersonnes: nouvelleValeur,
      });
    }
  };

  function sauvegarder(): void {
    //dispatch
    setModifier(false);
  }

  function actionModifier(): void {
    setModifier(true);
  }

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

      {/* Lien d'invitation */}
      <section className="mb-6 bg-green-50 shadow-lg text-lg p-6 rounded-lg border border-green-200">
        <Titre3>Votre lien d'invitation :</Titre3>
        <div className="space-y-2">
          {modifier ? (
            <div className="flex items-center gap-4">
              <input
                type="number"
                name="nom"
                value={invitation.nombrePersonnes}
                onChange={changeNombrePersonnes}
                className="border p-2 rounded-md flex-grow"
              />
              <button
                onClick={sauvegarder}
                className="bg-indigo-600 text-white  px-4 py-2 rounded-md hover:bg-indigo-800 flex flex-wrap justify-center items-center space-x-2">
                <p>Sauvegarder</p> {iconsListe.enregister}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p>
                <span className="font-semibold">
                  Nombre de personnes souhaitées:
                </span>{' '}
                {invitation.nombrePersonnes}
              </p>
              <button
                onClick={() => actionModifier()}
                className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-800 transition">
                {iconsListe.modifier}
              </button>
            </div>
          )}

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
      <section className="bg-white shadow-lg p-6 rounded-lg flex flex-col justify-center items-center">
        <Titre3>Tâches urgentes à faire :</Titre3>

        <button
          onClick={() => setShowUrgentTasks(!showUrgentTasks)}
          className={`px-4 py-2 size-fit text-white rounded-lg transition ${showUrgentTasks ? 'bg-red-600 hover:bg-red-800' : 'bg-indigo-600 hover:bg-indigo-800'}`}>
          {showUrgentTasks ? 'Masquer les tâches' : 'Afficher les tâches'}
        </button>

        {showUrgentTasks && <TachesSection tachesProps={mesTaches} />}
      </section>
    </div>
  );
};
export default Dashboard;

import React from 'react';
import { Titre1, Titre2, Titre3 } from '../../components/Titres';
