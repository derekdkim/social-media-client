import React from 'react';

import FriendCard from '../FriendCard';

const MyFriendsPage = () => {
  return (
    <div class='page-container'>
      <div className='one-tab-container only-tab'>
        <h3 className='tab-heading'>My Friends</h3>
        <div className='friend-list'>
          <FriendCard />
          <FriendCard />
          <FriendCard />
        </div>
      </div>
    </div>
  );
}

export default MyFriendsPage;