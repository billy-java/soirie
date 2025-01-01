import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { menu, menuParametre } from '../lib/menu';
import { useSelector } from 'react-redux';
import { RootState_DB } from '../redux/store';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isEventPage = location.pathname.includes('/e/');
  const displayNavbarPages2 = ['/parametres', '/contact', '/aide', '/home'];
  const isMenu2Page = displayNavbarPages2.includes(location.pathname);
  const idEvenement = useSelector((state: RootState_DB) => state.auth.idEv);
  const hideNavbarRoutes = ['/', '/inscription', '/restaurer'];

  if (isMenu2Page) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-gray-800 text-white z-50">
  <ul className="flex justify-around items-center py-3">
    {menuParametre.map((item, index) => (
      <li key={index}>
        <Link
          to={item.lien}
          className={`flex items-center space-x-1 ${
            location.pathname.includes(item.lien) ? 'text-blue-400' : ''
          }`}>
          {item.icon1}
          <span className="text-sm">{item.nom}</span>
        </Link>
      </li>
    ))}
  </ul>
</nav>

    );
  }

  if (location.pathname.includes('/invitation')) {
    return null;
  }

  if (!isEventPage && hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-gray-800 text-white z-50">
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
            to={`/e/${idEvenement}${item.lien}`}
            className={`flex items-center space-x-1 ${
              location.pathname.includes(item.lien) ? 'text-blue-400' : ''
            }`}>
            {item.icon1}
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
