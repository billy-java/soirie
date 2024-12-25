import React from 'react';
import { Link } from 'react-router-dom';
import { menuParametre } from '../../lib/menu';

const Menu: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100">
      <ul className="py-6 px-32 h-full flex flex-col flex-grow items-center justify-center gap-4">
        {menuParametre.map((menu) => (
          <Link
            key={menu.nom}
            to={menu.lien}
            className="w-full bg-white text-xl shadow-lg p-4 rounded-lg flex flex-nowrap items-center space-x-4">
            {menu.icon1} <p>{menu.nom}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
