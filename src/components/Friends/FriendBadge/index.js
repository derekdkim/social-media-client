import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import { UserIcon } from '../../../images';

const FriendBadge = (props) => {
  const { user } = props;

  return (
    <div className='friend-badge'>
      <Link to={`/profile/${user._id}`}>
        <div className='friend-icon-container'>
          <img src={ UserIcon } className='avatar' alt='friend'/>
        </div>
        <div>
          <p className='text-xs'>{ user.username || 'User' }</p>
        </div>
      </Link>
    </div>
  );
}

export default FriendBadge;