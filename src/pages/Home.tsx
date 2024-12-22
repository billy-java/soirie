import { Link } from 'react-router-dom'; // Importer Link pour la redirection
import { evenements } from '../lib/localDB';
// Importer le tableau des événements

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1>Planifiez Votre Événement Facilement</h1>
      <p>
        Une plateforme pour organiser des fêtes, mariages, anniversaires et plus
        encore!
      </p>

      <h2>Vos événements :</h2>

      <button className="p-2 bg-blue-500 rounded-md">
        Créer un nouvel événement
      </button>
      <h3>Liste de tous vos événements :</h3>
      <ul>
        {evenements.map((evenement) => (
          <li key={evenement.id} className="bg-gray-100 my-5 p-2 rounded-md">
            <Link to={`/e/${evenement.id}/dashboard`}>
              <h4>{evenement.nom}</h4>
              <p>Date : {new Date(evenement.date).toLocaleDateString()}</p>
              <p>Lieu : {evenement.lieu}</p>
              <p>Budget : {evenement.budget} €</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
