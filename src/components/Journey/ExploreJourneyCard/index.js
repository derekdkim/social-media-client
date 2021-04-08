import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import lorem from '../../../placeholders/lorem';

const ExploreJourneyCard = () => {
  return (
    <div className='content-panel card-item explore-journey-container'>
      <Link to='/journey-details'><h4 className='tab-heading text-center'>Journey Name</h4></Link>
      <p className='my-2'>by User</p>
      <div>
        <p className='my-2'>{lorem}</p>
      </div>
      <div  className='mt-4 flex flex-row justify-between text-xs'>
        <div>
          <p>Last Activity</p>
          <p>{new Date().toDateString()}</p>
        </div>
        <Link to='/journey-details'><button className='button hidden md:block explore-journey-btn'>See details</button></Link>
        <div className='mt-auto'>
          <span>23</span>
          <span className='ml-2'>Entries</span>
        </div>
      </div>
    </div>
  );
}

export default ExploreJourneyCard;