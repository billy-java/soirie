import React from 'react';
import { Link } from 'react-router-dom';
import { menuParametre } from '../../lib/menu';

const Menu: React.FC = () => {
  return (
    <div>
      <h2>Menu supplementaire:</h2>
      <ul>
        {menuParametre.map((item) => (
          <li key={item.nom}>
            <Link to={item.lien}>{item.nom}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
