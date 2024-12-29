import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  incrementConfirmations,
  incrementDoutes,
  incrementRejections,
} from '../redux/evenementSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState_DB } from '../redux/store';
import { IInvitation } from '../lib/interfaces/entites';

const Invitation: React.FC = () => {
  const { eId } = useParams();
  const dispatch = useDispatch();
  const naviguer = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formulaire, setFormulaire] = useState({ prenom: '', nom: '' });
  const [popupVisible, setPopupVisible] = useState(false);
  const [reponseSelectionnee, setReponseSelectionnee] = useState<number | null>(
    null
  );
  const enLigne = useSelector((state:RootState_DB) => state.auth.token); 
  // Remplacez par votre logique de récupération de l'utilisateur connecté

  const cetteInvitation = useSelector(
    (etat: RootState_DB) => etat.evenement.evenementsAttr.find(el => el.id === eId)?.invitation
  ) as IInvitation;

  const libellesReponses: Record<number, string> = {
    1: 'Je serais là',
    2: 'Peut-être',
    3: 'Ne sera pas là',
  };

  const gererChangementInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulaire({ ...formulaire, [name]: value });
  };

  const gererClicReponse = (reponseUtilisateur: number) => {
    setReponseSelectionnee(reponseUtilisateur);
    setPopupVisible(true); // Affiche le popup
  };

  const confirmerReponse = () => {
    if (reponseSelectionnee === 1) {
      dispatch(incrementConfirmations(eId!));
    } else if (reponseSelectionnee === 2) {
      dispatch(incrementDoutes(eId!));
    } else if (reponseSelectionnee === 3) {
      dispatch(incrementRejections(eId!));
    }

    // Enregistrez la réponse sur le serveur ou localStorage
    console.log({
      idInvitation: id,
      ...formulaire,
      statut: reponseSelectionnee,
    });

    setPopupVisible(false); // Masque le popup
    naviguer('/'); // Redirige vers la page d'accueil
    if (enLigne) {
      naviguer(`/e/${eId}/dashboard/`);
    } else {
      naviguer('/');
    }
  };

  const annulerReponse = () => {
    setPopupVisible(false); // Masque le popup sans rien faire
  };

  return (
    <div className="px-8 py-14 flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-full">
        <h2 className="mb-4 text-xl font-bold text-center">
          Invitation #{id} : {cetteInvitation.nombrePersonnes}
        </h2>
        <label htmlFor="prenom" className="text-gray-500">
          Prénom:
        </label>
        <input
          required
          type="text"
          id="prenom"
          name="prenom"
          placeholder="Prénom"
          value={formulaire.prenom}
          onChange={gererChangementInput}
          className="w-full px-4 py-2 mt-1 mb-4 border rounded"
        />
        <label htmlFor="nom" className="text-gray-500">
          Nom:
        </label>

        <input
          required
          type="text"
          id="nom"
          name="nom"
          placeholder="Nom"
          value={formulaire.nom}
          onChange={gererChangementInput}
          className="w-full px-4 py-2 mt-1 mb-4 border rounded"
        />
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => gererClicReponse(1)}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-800 flex-grow">
            Je serais là
          </button>
          <button
            onClick={() => gererClicReponse(2)}
            className="px-4 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-800 flex-grow">
            Peut-être
          </button>
          <button
            onClick={() => gererClicReponse(3)}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-800 flex-grow">
            Ne sera pas là
          </button>
        </div>
      </div>

      {/* Affichage conditionnel du bouton Retour à l'événement */}
      {enLigne && (
        <div className="mt-4">
          <button
            onClick={() => naviguer(`/e/${eId}/dashboard/`)}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800">
            Retour à l'événement
          </button>
        </div>
      )}

      {/* Popup de confirmation */}
      {popupVisible && (
        <div className="px-8 py-14 fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4">Confirmer votre choix</h3>
            <p className="mb-6">
              Vous avez choisi :{' '}
              <strong>{libellesReponses[reponseSelectionnee!]}</strong>.
              Êtes-vous sûr de vouloir confirmer ?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmerReponse}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800">
                Confirmer
              </button>
              <button
                onClick={annulerReponse}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invitation;
