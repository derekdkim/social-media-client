import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContextProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuthContext();

  return (
    <Route { ...rest } render={(props) => (
      auth.loggedIn
        ? <Component { ...props } />
        : <Redirect to='/log-in' />
    )} />
  );
};

export default PrivateRoute;