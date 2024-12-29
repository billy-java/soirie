import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState_DB } from './redux/store';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const RoutesProtegeeAuth: React.FC<ProtectedRouteProps> = ({ element }) => {
  
  const estEnLigne = useSelector(
    (state: RootState_DB) => state.auth.userActuel
  );



  return estEnLigne ? element : <Navigate to="/" />;
};

export default RoutesProtegeeAuth;
