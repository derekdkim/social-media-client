import React from 'react';

import FriendCard from '../FriendCard';

const MyFriendsPage = () => {
  return (
    <div class='page-container'>
      <div className='one-tab-container only-tab'>
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