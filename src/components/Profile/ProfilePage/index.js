import React from 'react';
import './index.css';

import JourneyLink from '../../Journey/JourneyLink';
import { UserIcon } from '../../../images';
import FriendBadge from '../../Friends/FriendBadge';

const ProfilePage = () => {

  return (
    <div className='page-container profile-page one-tab-container'>
      <div className='user-info-tab'>
        <div className='profile-pic-container'>
          <img className='profile-pic-main' src={UserIcon} alt='profile'></img>
        </div>
        <div className='username-container'>
          <h3 className='text-3xl'>User1</h3>
          <h4 classname='tab-heading'>John Doe</h4>
        </div>
      </div>
      <div>
        <h3 className='tab-heading'>A bit about me</h3>
        <div className='content-panel card-item'>
          <p>Not afraid of a bit of challenge! He/Him. Hit me up to do a challenge together!</p>
        </div>
      </div>
      <div className='btn-container my-6'>
        <button className='button'>Send Friend Request</button>
      </div>
      <div>
        <h4 className='tab-heading'>Current Journeys <span className='text-gray-600 text-base'>3</span></h4>
        <div>
          <JourneyLink />
          <JourneyLink />
          <JourneyLink />
        </div>
        <h5 className='card-item'>View past journeys</h5>
      </div>
      <div>
        <h3 className='tab-heading'>Friends <span className='text-gray-600 text-base'>524</span></h3>
        <div className='friend-grid card-item'>
          {[...Array(24)].map((e, i) => <FriendBadge />)}
        </div>
        <p className='card-item'>View all</p>
      </div>
    </div>
  );
}

export default ProfilePage;
