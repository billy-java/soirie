import PrestatairesSection from '../../components/PrestatairesSection';
import { prestataires } from '../../lib/localDB';

const Prestataires = () => {
  return (
    <div>
      <h1>Gestion des Prestataires</h1>
     
      <PrestatairesSection prestatairesInitiales={prestataires}/>
   
    </div>
  );
};

export default Prestataires;
