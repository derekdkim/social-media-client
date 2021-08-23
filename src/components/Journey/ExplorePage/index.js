import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';
import ExploreJourneyCard from '../ExploreJourneyCard';

const ExplorePage = () => {
  const [viewFriendsOnly, updateViewFriends] = useState(false);
  const [journeysList, setJourneysList] = useState(null);

  const auth = useAuthContext();
  const status = useStatusContext();
  
  const switchViewFilter = (event) => {
    // Update privacy checked state for the Public/Private Slider Text
    event.target.checked === true ? updateViewFriends(true) : updateViewFriends(false);
  }

  useEffect(() => {
    // Start Loading
    status.setIsLoading(true);

    if (viewFriendsOnly) {
      // Fetch Friends' Journeys
      axios.get('https://journey-social-media-server.herokuapp.com/journeys/friends',
        {
          headers: {
            'Authorization': `Bearer ${auth.JWT}`
          }
        })
        .then(res => {
          setJourneysList(res.data.journeys);

          // Finish Loading
          status.setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        }); 
    } else {
      // Fetch All Public Journeys
      axios.get('https://journey-social-media-server.herokuapp.com/journeys/all',
        {
          headers: {
            'Authorization': `Bearer ${auth.JWT}`
          }
        })
        .then(res => {
          setJourneysList(res.data.journeys);

          // Finish Loading
          status.setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        }); 
    }
  }, [viewFriendsOnly]);

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
          { journeysList !== null
            && // Prevent loading ExploreJourneyCards before data is fetched
            journeysList.map((journey, index) => <ExploreJourneyCard journey={journey} key={index} />)
          }
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;