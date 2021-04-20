import React from 'react';
import './index.css';

import { UserIcon } from '../../../images';
const FriendReqCard = () => {
  return (
    <div className='content-panel card-item flex flex-row'>
      <div className='card-left'>
        <div className='avatar-container ml-2'>
          <img src={ UserIcon } alt='user' className='avatar' />
        </div>
        <div className='self-center'>
          <p className='card-primary-text'>Username</p>
          <p className='card-secondary-text'>Firstname Lastname</p>
        </div>
      </div>
      <div className='card-right'>
        <button className='button card-btn create-btn'>Accept</button>
        <button className='button card-btn bg-red-600'>Decline</button>
      </div>
    </div>
  );
}

export default FriendReqCard;