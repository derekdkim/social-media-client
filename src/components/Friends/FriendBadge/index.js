import React from 'react';
import { Link } from 'react-router-dom';

import { UserIcon } from '../../../images';

const FriendBadge = (props) => {
  const { user } = props;

  return (
    <div className='inline-flex flex-col text-center'>
      <Link to={`/profile/${user._id}`}>
        <div className='flex justify-center'>
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