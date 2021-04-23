import React, { useState } from 'react';
import { formatDistance } from 'date-fns';
import './index.css';

import { UserIcon } from '../../../images';

const JourneyComment = (props) => {
  const { data } = props;
  const [entryLiked, updateEntryLiked] = useState(false);

  const handleLikes = () => {
    updateEntryLiked(!entryLiked);
  }

  return (
    <div className='comment-container'>
      <div className='flex-shrink-0'>
        <img src={ UserIcon } className='avatar mt-2' alt='commenter' />
      </div>
      <div className='flex flex-col ml-2'>
        <div className='flex flex-col lg:flex-row'>
          <p className='font-bold text-sm'>{ data.author }</p>
          <span className='text-gray-500 text-xs lg:self-center lg:ml-1'>{ formatDistance(data.timestamp, new Date()) }</span>
        </div>
        <div className='mt-1'>
          <p className='comment-content'>{ data.content }</p>
        </div>
        <div className='p-1'>
          <i onClick={ handleLikes } className={ entryLiked ? 'fas fa-heart red' : 'far fa-heart' }></i>
          <span className='ml-2'>{ data.likes }</span>
        </div>
      </div>
    </div>
  );
}

export default JourneyComment;