import React from 'react';
import './index.css';
import { useAuthContext } from '../../context/AuthContextProvider';

import JourneyLink from '../Journey/JourneyLink';

const IndexPage = () => {
  const auth = useAuthContext();

  return (
    <div className='page-container index-page'>
      <div className='tab-left'>
        <div className='welcome-panel'>
          <h1 className='dbrown-text'>Welcome back, User!</h1>
        </div>
        <div className='journey-container'>
          <h3 className='tab-heading dbrown-text'>Your current journeys:</h3>
          <JourneyLink />
          <JourneyLink />
          <JourneyLink />
        </div>
      </div>
      <div className='tab-right'>
        <div className='progress-panel content-panel'>
          <h3 className='progress-panel-header tab-heading'>Your progress in 2021</h3>
          <p>Journeys completed this year: 0</p>
          <p>Total journeys completed: 15</p>
          <p>Last journey completed:</p>
          <JourneyLink />
          <p>{auth.JWT}</p>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;