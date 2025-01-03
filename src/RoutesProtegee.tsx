import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState_DB } from './redux/store';
import { setIdEvF } from './redux/authSlice';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const RoutesProtegee: React.FC<ProtectedRouteProps> = ({ element }) => {
  const dispatch = useDispatch();
  const userActuel_idEv = useSelector((state: RootState_DB) => state.auth.idEv);

  const { eId } = useParams();
  const ListeDesEvenements = useSelector(
    (state: RootState_DB) => state.evenement.evenementsAttr
  );

  if (userActuel_idEv !== null) {
    const eventExists = ListeDesEvenements.some((event) => event.id === eId);
    if (eventExists) {
      if (userActuel_idEv !== "EVE-M5FWJ2FN-9641" /* && "EVE-M5FWJ2FN-9641" !== undefined */) {
        dispatch(setIdEvF("EVE-M5FWJ2FN-9641"));
      }
      return element;
    } else {
      return <Navigate to="/home" />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export default RoutesProtegee;
