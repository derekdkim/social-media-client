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
import ProfilePage from '../Profile/ProfilePage';
import FriendRequestPage from '../Friends/FriendRequestPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={IndexPage} />
      <Route path='/sign-up' component={SignupPage} />
      <Route path='/log-in' component={LoginPage} />
      <Route path='/my-journeys' component={MyJourneyPage} />
      <Route path='/journeys/new' component={JourneyCreator} />
      <Route path='/explore' component={ExplorePage} />
      <Route path='/my-friends' component={MyFriendsPage} />
      <Route path='/journey-details' component={JourneyDetailPage} />
      <Route path='/profile' component={ProfilePage} />
      <Route path='/friend-requests' component={FriendRequestPage} />
    </Switch>
  );
}

export default Routes;