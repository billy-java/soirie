import { Link } from 'react-router-dom';

const Aide = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Centre d'Aide</h1>
      <p>
        Bienvenue dans le centre d'aide. Vous trouverez ci-dessous des guides et
        des ressources pour résoudre vos problèmes rapidement.
      </p>
      <ul className="list-disc ml-6 mt-4 space-y-2">
        <li>
          <strong>Créer un événement :</strong> Consultez le guide pour créer et
          gérer vos événements.
        </li>
        <li>
          <strong>Gérer les invitations :</strong> Apprenez à envoyer, suivre et
          personnaliser vos invitations.
        </li>
        <li>
          <strong>Configurer votre compte :</strong> Mettez à jour vos
          informations et vos préférences.
        </li>
      </ul>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Besoin de plus d'assistance ?</h2>
        <p>
          Contactez notre équipe via la page{' '}
          <Link to="/contact" className="text-blue-500 underline">
            Contact
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Aide;
