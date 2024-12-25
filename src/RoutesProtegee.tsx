import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState_DB } from './redux/store';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const RoutesProtegee: React.FC<ProtectedRouteProps> = ({ element }) => {
  const userActuel_idEv = useSelector((state: RootState_DB) => state.auth.idEv);

  const { eId } = useParams();
  const ListeDesEvenements = useSelector(
    (state: RootState_DB) => state.evenement.evenementsAttr
  );

  if (userActuel_idEv !== null) {
    const eventExists = ListeDesEvenements.some((event) => event.id === eId);
    if (eventExists) {
      return element;
    } else {
      return <Navigate to="/home" />;
    }
  } else {
    return <Navigate to="/connexion" />;
  }
};

export default RoutesProtegee;
