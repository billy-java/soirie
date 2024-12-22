import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isEventPage = location.pathname.includes('/e/');

  if (!isEventPage) {
    return null; // La navbar ne s'affiche pas en dehors des pages d'événements
  }

  // Extraire l'eId de la route actuelle pour construire des liens absolus
  const eId = location.pathname.split('/')[2]; // `eId` se trouve à la deuxième position

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-800 text-white">
      <ul className="flex justify-around items-center py-3">
        <li>
          <Link
            to={`/e/${eId}/dashboard`}
            className={`${
              location.pathname.includes('/dashboard') ? 'text-blue-400' : ''
            }`}
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to={`/e/${eId}/taches`}
            className={`${
              location.pathname.includes('/taches') ? 'text-blue-400' : ''
            }`}
          >
            Tâches
          </Link>
        </li>

        <li>
          <Link
            to={`/e/${eId}/depenses`}
            className={`${
              location.pathname.includes('/depenses') ? 'text-blue-400' : ''
            }`}
          >
            Dépenses
          </Link>
        </li>

        <li>
          <Link
            to={`/e/${eId}/prestataires`}
            className={`${
              location.pathname.includes('/prestataires') ? 'text-blue-400' : ''
            }`}
          >
            Prestataires
          </Link>
        </li>

        <li>
          <Link
            to={`/e/${eId}/menu`}
            className={`${
              location.pathname.includes('/menu') ? 'text-blue-400' : ''
            }`}
          >
            Menu
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
