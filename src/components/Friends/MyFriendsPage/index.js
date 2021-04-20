import React from 'react';
import { Link } from 'react-router-dom';

import FriendCard from '../FriendCard';

const MyFriendsPage = () => {
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
          <FriendCard />
          <FriendCard />
          <FriendCard />
        </div>
      </div>
    </div>
  );
}

export default MyFriendsPage;