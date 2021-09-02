import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

import FriendReqCard from '../FriendReqCard';

const FriendRequestPage = () => {
  const [pendingFriends, setPendingFriends] = useState([]);

  const auth = useAuthContext();
  const status = useStatusContext();

  const fetchPendingFriends = () => {
    // Start Loading
    status.setIsLoading(true);

    axios.get('https://journey-social-media-server.herokuapp.com/friends/pending',
      {
        headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
      })
      .then(res => {
        setPendingFriends(res.data.pendingFriends);

        // Finish Loading
        status.setIsLoading(false);
      })
      .catch(err => {
        console.log(err);

        // Finish Loading
        status.setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchPendingFriends();
  }, []);

  return (
    <div className='page-container'>
      <div className='one-tab-container only-tab narrow-page'>
        <h3 className='tab-heading'>Pending Requests</h3>
        <div>
          {pendingFriends.map((user, i) => <FriendReqCard user={ user } key={ i } />)}
          {/* No Results Placeholder Text */
            pendingFriends.length === 0 &&
            <p className='content-panel card-item'>No potential friends to accept as of this moment.</p>
          }
        </div>
      </div>
    </div>
  );
}

export default FriendRequestPage;