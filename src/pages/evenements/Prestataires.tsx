import PrestatairesSection from '../../components/PrestatairesSection';
import { prestataires } from '../../lib/localDB';

const Prestataires = () => {
  return (
    <div className="px-4 py-10 flex flex-col items-center bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">
        Gestion des Prestataires
      </h1>
      <PrestatairesSection prestatairesInitiales={prestataires} />
    </div>
  );
};

export default Prestataires;
