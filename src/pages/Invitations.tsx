import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  incrementConfirmations,
  incrementDoutes,
  incrementRejections,
} from '../redux/invitationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState_DB } from '../redux/store';

const Invitation: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({ prenom: '', nom: '' });
  const [response, setResponse] = useState(0);

  const cetInvitation = useSelector(
    (state: RootState_DB) => state.invitation.invitation
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (reponseUser: number) => {
    setResponse(reponseUser);

    if (reponseUser === 1) {
      dispatch(incrementConfirmations());
    } else if (reponseUser === 2) {
      dispatch(incrementDoutes());
    } else if (reponseUser === 3) {
      dispatch(incrementRejections());
    }

    // Enregistrez la réponse sur le serveur ou localStorage
    console.log({
      invitationId: id,
      ...formData,
      status: reponseUser,
    });
  };

  return (
    <div className="px-8 py-14 flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white  rounded-lg shadow-lg w-full">
        <h2 className="mb-4 text-xl font-bold text-center">
          Invitation #{id} : {cetInvitation.nombrePersonnes}
        </h2>
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleSubmit(1)}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 flex-grow">
            Confirmer
          </button>
          <button
            onClick={() => handleSubmit(2)}
            className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 flex-grow">
            Peut-être
          </button>
          <button
            onClick={() => handleSubmit(3)}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 flex-grow">
            Ne sera pas là
          </button>
        </div>
        {response && (
          <p className="mt-4 text-center text-green-600">
            Réponse enregistrée : {response}
          </p>
        )}
      </div>
    </div>
  );
};

export default Invitation;
