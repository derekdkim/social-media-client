import React from 'react';
import './index.css';

import { UserIcon, UnfriendIcon } from '../../../images/';

const FriendCard = () => {
  return (
    <div className='content-panel card-item friend-card-container'>
      <img src={ UserIcon } className='profile-pic' alt='profile-pic'/>
      <div>
        <p className='text-xl font-bold'>Username</p>
        <p className='text-base'>Firstname Lastname</p>
      </div>
      <div className='flex content-center justify-center'>
        <button className='unfriend-btn'><img src={ UnfriendIcon } alt='unfriend'></img></button>
      </div>
    </div>
  );
}

export default FriendCard;