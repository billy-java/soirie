import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { menu } from '../lib/menu';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isEventPage = location.pathname.includes('/e/');
  const displayNavbarPages = ['/parametres', '/faq', '/contact', '/aide'];

  if (!isEventPage && !displayNavbarPages.includes(location.pathname)) {
    return null; // La navbar ne s'affiche pas si l'ID de l'événement n'est pas disponible et la page ne fait pas partie des pages spécifiées }
  }
  // Extraire l'eId de la route actuelle pour construire des liens absolus
  const eId = location.pathname.split('/')[2]; // `eId` se trouve à la deuxième position

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-800 text-white">
      <ul className="flex justify-around items-center py-3">
        {menu.map((item, index) =>
          item.nom === 'Home' ? (
            <li key={index}>
              <Link
                to={`${item.lien}`}
                className={`flex items-center space-x-1 ${
                  location.pathname.includes(item.lien) ? 'text-blue-400' : ''
                }`}>
                {item.icon1}
              </Link>
            </li>
          ) : (
            <li key={index}>
              <Link
                to={`/e/${eId}${item.lien}`}
                className={`flex items-center space-x-1 ${
                  location.pathname.includes(item.lien) ? 'text-blue-400' : ''
                }`}>
                {item.icon1}{' '}
                {location.pathname.includes(item.lien) && <p>{item.nom}</p>}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
