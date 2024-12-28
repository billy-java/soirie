import { useSelector } from 'react-redux';
import TachesSection from '../../components/TachesSection';
import { Titre1 } from '../../components/Titres';
import { RootState_DB } from '../../redux/store';

const Taches = () => {
  const anniversaireTaches = useSelector(
    (state: RootState_DB) => state.tache.taches
  );

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

      <TachesSection tachesProps={anniversaireTaches} toutesLesTaches={true} />
    </div>
  );
};

export default Taches;
