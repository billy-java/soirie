import React, { useState } from 'react';
import { IInvitation } from '../lib/interfaces/entites';
import { Titre3 } from './Titres';
import { useDispatch } from 'react-redux';
import { mettreAJourInvitation } from '../redux/evenementSlice';
import { iconsListe } from '../lib/iconsListe';

interface Props {
  invitation: IInvitation;
  idEvenement: string;
  onClose: () => void;
}

const ModalInvitation: React.FC<Props> = ({
  invitation,
  idEvenement,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [formulaire, setFormulaire] = useState<IInvitation>(invitation);

  const gererChangement = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormulaire((prevForm) => ({
      ...prevForm,
      [name]:
        name === 'nombrePersonnes' && value === '' // Si vide, mettre null pour "Aucune limite"
          ? null
          : name === 'statut' // Le statut est un nombre, le convertir en entier
            ? Number(value)
            : value,
    }));
  };

  const gererEnregistrement = () => {
    dispatch(
      mettreAJourInvitation({
        idEv: idEvenement,
        invitation: formulaire,
      })
    );
    onClose();
  };

  return (
    <div className="fixed p-8 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full rounded-lg shadow-lg">
        <div className="space-y-4 p-6">
          <Titre3>Modifier l'invitation</Titre3>

          {/* Champ Nombre de personnes */}
          <div>
            <label className="block text-sm font-medium">
              Nombre de personnes souhaitées
            </label>
            <input
              required
              type="number"
              name="nombrePersonnes"
              value={formulaire.nombrePersonnes || ''} // Si null, on affiche une chaîne vide
              placeholder="Aucune limite"
              onChange={gererChangement}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          {/* Champ Nombre de confirmations */}
          <div>
            <label className="block text-sm font-medium">
              Nombre de confirmations
            </label>
            <input
              required
              type="number"
              name="nombreConfirmations"
              value={formulaire.nombreConfirmations}
              onChange={gererChangement}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          {/* Champ Nombre de doutes */}
          <div>
            <label className="block text-sm font-medium">
              Nombre de doutes
            </label>
            <input
              required
              type="number"
              name="nombreDoute"
              value={formulaire.nombreDoute}
              onChange={gererChangement}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          {/* Champ Nombre de rejets */}
          <div>
            <label className="block text-sm font-medium">
              Nombre de rejets
            </label>
            <input
              required
              type="number"
              name="nombreRejets"
              value={formulaire.nombreRejets}
              onChange={gererChangement}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          {/* Champ Statut */}
          <div>
            <label className="block text-sm font-medium">Statut</label>
            <select
              name="statut"
              value={formulaire.statut}
              onChange={gererChangement}
              className="w-full px-4 py-2 border rounded">
              <option value={1}>Ouvert</option>
              <option value={2}>Terminé</option>
              <option value={3}>Annulé</option>
            </select>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={gererEnregistrement}
              className="bg-indigo-600 text-white w-full px-4 py-2 rounded-md hover:bg-indigo-800 flex flex-wrap justify-center items-center space-x-2">
              <span>Sauvegarder</span> {iconsListe.enregister}
            </button>
            <button
              onClick={onClose}
              type="reset"
              className="bg-red-600 text-white w-full px-4 py-2 rounded-md hover:bg-red-800 flex flex-wrap justify-center items-center space-x-2">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInvitation;
