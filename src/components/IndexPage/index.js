import React from 'react';
import './index.css';

import JourneyLink from '../Journey/JourneyLink';

const IndexPage = () => {
  return (
    <div className='page-container index-page'>
      <div className='tab-left'>
        <div className='welcome-panel'>
          <h1 className='tab-title'>Welcome back, User!</h1>
        </div>
        <div className='journey-container'>
          <h3 className='tab-heading tab-title'>Your current journeys:</h3>
          <JourneyLink />
          <JourneyLink />
          <JourneyLink />
        </div>
      </div>
      <div className='tab-right'>
        <div className='progress-panel panel-black'>
          <h3 className='progress-panel-header tab-heading'>Your progress in 2021</h3>
          <p>Journeys completed this year: 0</p>
          <p>Total journeys completed: 15</p>
          <p>Last journey completed:</p>
          <JourneyLink />
        </div>
      </div>
    </div>
  );
}

export default IndexPage;