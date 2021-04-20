import React, { useState, useEffect } from 'react';
import './index.css';

import { UserIcon } from '../../../images';
import lorem from '../../../placeholders/lorem';

const JourneyEntry = () => {
  const [entryLiked, updateEntryLiked] = useState(false);

  const handleLikes = () => {
    updateEntryLiked(!entryLiked);
  }

  return (
    <div className='content-panel card-item'>
      <div className='author-container'>
        <img src={UserIcon} className='profile-pic 'alt='profile-pic'/>
        <div className='author-info'>
          <p className='text-lg font-bold'>User</p>
          <p>April 8, 2021</p>
        </div>
      </div>
      <div className='p-2'>
        <p>{lorem}</p>
      </div>
      <div className='icon-footer'>
        <i onClick={handleLikes} className={entryLiked ? 'fas fa-heart red' : 'far fa-heart'}></i>
        <i className='far fa-comment'></i>
      </div>
    </div>
  );
}

export default JourneyEntry;