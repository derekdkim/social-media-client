import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import JourneyLink from '../JourneyLink';

const MyJourneyPage = () => {

  return (
    <div class='page-container'>
      <div className='right-btn-container-outer'>
        <Link className='right-btn-container-inner' to='/journeys/new'>
          <button className='button'> + Start A New Journey</button>
        </Link>
      </div>
      <div className='one-tab-container'>
        <h1 className='tab-heading tab-title'>My Journeys</h1>
        <div class='journey-list grid lg:grid-cols-2'>
          <JourneyLink />
          <JourneyLink />
          <JourneyLink />
          <JourneyLink />
          <JourneyLink />
          <JourneyLink />
        </div>
      </div>
    </div>
  );
}

export default MyJourneyPage;