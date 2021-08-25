import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './privateRoute';

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
import ProfileEditPage from '../Profile/ProfileEditPage';

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path='/' component={IndexPage} />
      <Route path='/sign-up' component={SignupPage} />
      <Route path='/log-in' component={LoginPage} />
      <PrivateRoute path='/my-journeys' component={MyJourneyPage} />
      <PrivateRoute path='/journeys/new' component={JourneyCreator} />
      <PrivateRoute path='/explore' component={ExplorePage} />
      <PrivateRoute path='/my-friends' component={MyFriendsPage} />
      <PrivateRoute path='/journey-details/:id' component={JourneyDetailPage} />
      <PrivateRoute path='/profile' component={ProfilePage} />
      <PrivateRoute path='/profile-setting' component={ProfileEditPage} />
      <PrivateRoute path='/friend-requests' component={FriendRequestPage} />
    </Switch>
  );
}

export default Routes;