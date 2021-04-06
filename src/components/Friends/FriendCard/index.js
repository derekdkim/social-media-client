import React from 'react';
import './index.css';

import { UserIcon } from '../../../images/';

const FriendCard = () => {
  return (
    <div className='panel-black card-item friend-card-container'>
      <img src={UserIcon} className='profile-pic' alt='profile-pic'/>
      <div>
        <p className='text-xl font-bold'>Username</p>
        <p className='text-base'>Firstname Lastname</p>
      </div>

      <button className='unfriend-btn'>X</button>
    </div>
  );
}

export default FriendCard;