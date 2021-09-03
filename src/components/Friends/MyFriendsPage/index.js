import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import FriendCard from '../FriendCard';
import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const MyFriendsPage = () => {
  const [friendList, setFriendList] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  const auth = useAuthContext();
  const status = useStatusContext();

  const fetchFriends = () => {
    // Start Loading
    status.setIsLoading(true);

    axios.get('https://journey-social-media-server.herokuapp.com/friends/all', {
        headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
      })
      .then(res => {
        setFriendList(res.data.currentFriends);

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
    fetchFriends();
  }, []);

  useEffect(() => {
    if (updateList) {
      fetchFriends();
      setUpdateList(false);
    }
  }, [updateList]);

  return (
    <div className='page-container'>
      <div className='right-btn-container-outer'>
        <div className='right-btn-container-inner'>
          <Link to='/friend-requests'>
            <button className='button'>View Friend Requests</button>
          </Link>
        </div>
      </div>
      <div className='one-tab-container'>
        <h3 className='tab-heading dbrown-text'>My Friends</h3>
        <div className='friend-list grid lg:grid-cols-2'>
          { friendList.map((friend, index) => <FriendCard user={ friend } setUpdateList={ setUpdateList } key={ index } />) }
          { /* No Friends Placeholder */
            friendList.length === 0 &&
            <p className='content-panel card-item'>
              It looks like you haven't added any friends yet! Let's try exploring journeys by other users.
            </p>
          }
        </div>
      </div>
    </div>
  );
}

export default MyFriendsPage;