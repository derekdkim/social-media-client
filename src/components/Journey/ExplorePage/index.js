import React, { useState, useEffect } from 'react';

import ExploreJourneyCard from '../ExploreJourneyCard';

const ExplorePage = () => {
  const [viewFriendsOnly, updateViewFriends] = useState(false);
  
  const switchViewFilter = (event) => {
    // Update privacy checked state for the Public/Private Slider Text
    event.target.checked === true ? updateViewFriends(true) : updateViewFriends(false);
  }

  return (
    <div className='page-container'>
      <div className='right-btn-container-outer'>
        <div className='right-btn-container-inner'>
            <div className='switch-container'>
              <span className='switch-text dbrown-text'>{ viewFriendsOnly ? 'Friends Only' : 'Everyone' }</span>
              <label className='switch'>
                <input id='explore-view-input' onChange={ switchViewFilter } type='checkbox'></input>
                <span className='slider'></span>
              </label>
            </div>
        </div>
      </div>
      <div className='one-tab-container'>
        <h3 className='tab-heading dbrown-text'>Check out what journeys others are on!</h3>
        <div className='grid lg:grid-cols-2'>
          <ExploreJourneyCard />
          <ExploreJourneyCard />
          <ExploreJourneyCard />
          <ExploreJourneyCard />
          <ExploreJourneyCard />
          <ExploreJourneyCard />
          <ExploreJourneyCard />
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;