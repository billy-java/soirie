import React from 'react';
import { Link } from 'react-router-dom';
import { menuParametre } from '../../lib/menu';

const Menu: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100">
      <ul className="py-6 px-32 h-full flex flex-col flex-grow items-center justify-center gap-4">
        {menuParametre.map((item) => (
          <Link
            key={item.nom}
            to={item.lien}
            className="w-full bg-white text-xl shadow-lg p-4 rounded-lg flex flex-nowrap items-center space-x-4">
            {item.icon1} <p>{item.nom}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
