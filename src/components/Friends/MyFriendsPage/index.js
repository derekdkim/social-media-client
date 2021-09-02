import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import FriendCard from '../FriendCard';
import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const MyFriendsPage = () => {
  const [friendList, setFriendList] = useState([]);

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
  }, [])

  return (
    <div className='page-container'>
      <div className='right-btn-container-outer'>
        <div className='right-btn-container-inner'>
          <Link to='/friend-search'>
            <button className='button mr-2 mb-4 md:mb-0'>Search for Friends</button>
          </Link>
          <Link to='/friend-requests'>
            <button className='button'>View Friend Requests</button>
          </Link>
        </div>
      </div>
      <div className='one-tab-container'>
        <h3 className='tab-heading dbrown-text'>My Friends</h3>
        <div className='friend-list grid lg:grid-cols-2'>
          { friendList.map((friend, index) => <FriendCard user={ friend } key={ index } />) }
        </div>
      </div>
    </div>
  );
}

export default MyFriendsPage;