import PrestatairesSection from '../../components/PrestatairesSection';
import { Titre1 } from '../../components/Titres';
import { prestataires } from '../../lib/localDB';

const Prestataires = () => {
  return (
    <div className="px-4 py-10 min-h-screen flex flex-col items-center bg-gray-100">
      <Titre1>Prestataires</Titre1>
      <PrestatairesSection prestatairesInitiales={prestataires} />
    </div>
  );
};

export default Prestataires;
