import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';

const Routes = () => {
  return (
    <Switch>
      <Route path='/signup' component={SignupPage} />
      <Route path='/login' component={LoginPage} />
    </Switch>
  );
}

export default Routes;