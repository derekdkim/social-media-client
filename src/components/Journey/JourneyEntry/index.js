import React from 'react';
import './index.css';

import { UserIcon } from '../../../images';
import lorem from '../../../placeholders/lorem';

const JourneyEntry = () => {
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
    </div>
  );
}

export default JourneyEntry;