import TachesSection from '../../components/TachesSection';
import { anniversaireTaches } from '../../lib/localDB';

const Taches = () => {
  return (
    <div>
      <section className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md">
        <h2>
          Voici la liste des actions a faire si vous voulez realiser un
          anniversaire parfait.
        </h2>
        <p>
          Vous pouvez marquer une tache comme Terminée, creer, modifier ou
          supprimer une tache.
        </p>
        <div>
          <TachesSection tachesProps={anniversaireTaches} />
        </div>
      </section>
    </div>
  );
};

export default Taches;
