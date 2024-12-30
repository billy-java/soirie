import { useDispatch, useSelector } from 'react-redux';
import TachesSection from '../../components/TachesSection';
import { Titre1 } from '../../components/Titres';
import { RootState_DB } from '../../redux/store';
import { chargerTachesParType } from '../../redux/tacheSlice';
import { useParams } from 'react-router-dom';
import { IEvenement } from '../../lib/interfaces/entites';
import { useEffect } from 'react';

const Taches = () => {
  const { eId } = useParams();
  const cetEvenement = useSelector((state: RootState_DB) =>
    state.evenement.evenementsAttr.find((el) => el.id === eId)
  ) as IEvenement;
  const dispatch = useDispatch();

  const listeDesTaches = useSelector(
    (state: RootState_DB) => state.tache.taches
  );

  useEffect(() => {
    dispatch(
      chargerTachesParType({ typeEvenement: cetEvenement.type!, evId: eId! })
    );
  }, [cetEvenement.type, dispatch, eId]);

  return (
    <div className="px-4 py-10 min-h-screen bg-gray-100">
      <div className="text-center p-4 mb-8">
        <Titre1>Tâches à faire</Titre1>
        <p className="text-gray-700 text-lg">
          Voici la liste des tâches à faire si vous voulez réaliser un
          anniversaire parfait.
        </p>
        <p className="text-gray-700 text-lg">
          Vous pouvez marquer une tâche comme Terminée, créer, modifier ou
          supprimer une tâche.
        </p>
      </div>

      <TachesSection tachesProps={listeDesTaches} toutesLesTaches={true} />
    </div>
  );
};

export default Taches;
