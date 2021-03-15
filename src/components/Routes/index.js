import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import IndexPage from '../IndexPage';
import MyJourneyPage from '../Journey/MyJourneysPage';
import JourneyCreator from '../Journey/JourneyCreator';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={IndexPage} />
      <Route path='/signup' component={SignupPage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/my-journeys' component={MyJourneyPage} />
      <Route path='/journeys/new' component={JourneyCreator} />
    </Switch>
  );
}

export default Routes;