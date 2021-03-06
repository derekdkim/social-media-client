import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

import FriendReqCard from '../FriendReqCard';

const FriendRequestPage = () => {
  const [pendingFriends, setPendingFriends] = useState([]);
  const [updateList, setUpdateList] = useState(false);

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
  }, [])

  useEffect(() => {
    if (updateList) {
      fetchPendingFriends();
      setUpdateList(false);
    }
  }, [updateList]);

  return (
    <div className='page-container'>
      <div className='mx-4 mt-6 mb-4'>
        <Link to='/my-friends'><button className='button'>Back</button></Link>
      </div>
      <div className='one-tab-container only-tab lg:w-1/2 lg:mx-auto'>
        <h3 className='tab-heading'>Pending Requests</h3>
        <div>
          { pendingFriends.length > 0
            ?
            pendingFriends.map((user, i) => <FriendReqCard user={ user } key={ i } setUpdateList = { setUpdateList } />)
            : /* No Results Placeholder Text */
            <p className='content-panel card-item'>No potential friends to accept as of this moment.</p>
          }
        </div>
      </div>
    </div>
  );
}

export default FriendRequestPage;