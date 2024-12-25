import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState_DB } from './redux/store';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const RoutesProtegee: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { eId } = useParams();
  const initialEvenements = useSelector(
    (state: RootState_DB) => state.evenement.evenementsAttr
  );

  const eventExists = initialEvenements.some((event) => event.id === eId);

  return eventExists ? element : <Navigate to="/connexion" />;
};

export default RoutesProtegee;
