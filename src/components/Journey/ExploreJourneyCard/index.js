import React from 'react';
import './index.css';

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const ExploreJourneyCard = () => {
  return (
    <div className='panel-black card-item explore-journey-container'>
      <h4 className='tab-heading text-center'>Journey Name</h4>
      <p className='my-2'>by User</p>
      <div>
        <p className='my-2'>{loremIpsum}</p>
      </div>
      <div  className='mt-4 flex flex-row justify-between text-xs'>
        <div>
          <p>Last Activity</p>
          <p>{new Date().toDateString()}</p>
        </div>
        <button className='button hidden md:block explore-journey-btn'>See details</button>
        <div className='mt-auto'>
          <span>23</span>
          <span className='ml-2'>Entries</span>
        </div>
      </div>
    </div>
  );
}

export default ExploreJourneyCard;