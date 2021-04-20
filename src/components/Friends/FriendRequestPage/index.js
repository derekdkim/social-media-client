import React from 'react';

import FriendReqCard from '../FriendReqCard';

const FriendRequestPage = () => {
  return (
    <div className='page-container'>
      <div className='one-tab-container only-tab narrow-page'>
        <h3 className='tab-heading'>Pending Requests</h3>
        <div>
          {[...Array(5)].map((e, i) => <FriendReqCard key={i} />)}
        </div>
      </div>
    </div>
  );
}

export default FriendRequestPage;