import React from 'react';
import './index.css';

import { UserIcon } from '../../../images';

const FriendBadge = () => {
  return (
    <div className='friend-badge'>
      <div className='friend-icon-container'>
        <img src={ UserIcon } className='avatar' alt='friend'/>
      </div>
      <div>
        <p className='text-xs'>FriendUser</p>
      </div>
    </div>
  );
}

export default FriendBadge;