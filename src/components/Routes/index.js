import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import IndexPage from '../IndexPage';
import MyJourneyPage from '../Journey/MyJourneysPage';
import JourneyCreator from '../Journey/JourneyCreator';
import ExplorePage from '../Journey/ExplorePage';
import MyFriendsPage from '../Friends/MyFriendsPage';
import JourneyDetailPage from '../Journey/JourneyDetailPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={IndexPage} />
      <Route path='/sign-up' component={SignupPage} />
      <Route path='/log-in' component={LoginPage} />
      <Route path='/my-journeys' component={MyJourneyPage} />
      <Route path='/journeys/new' component={JourneyCreator} />
      <Route path='/explore' component={ExplorePage} />
      <Route path='/my-friends' component={MyFriendsPage}/>
      <Route path='/journey-details' component={JourneyDetailPage}/>
    </Switch>
  );
}

export default Routes;