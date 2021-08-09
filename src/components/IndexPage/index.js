import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';

import { useAuthContext } from '../../context/AuthContextProvider';
import { useStatusContext } from '../../context/StatusContextProvider';
import JourneyLink from '../Journey/JourneyLink';

const IndexPage = () => {
  const [journeyList, setJourneyList] = useState(null);

  const auth = useAuthContext();
  const status = useStatusContext();

  useEffect(() => {
    if (auth.loggedIn && auth.JWT) {
      // Start Loading
      status.setIsLoading(true);

      // Fetch private journeys
      axios.get('https://journey-social-media-server.herokuapp.com/journeys/private', {
          headers: {
            'Authorization': `Bearer ${auth.JWT}`
          }
        })
        .then(res => {
          setJourneyList(res.data.journeys);

          // Loading Complete
          status.setIsLoading(false);
        })
        .catch(err => {
          console.log(err);

          // Loading Complete
          status.setIsLoading(false);
        });
    }
  }, []);

  return (
    <div className='page-container index-page'>
      <div className='tab-left'>
        <div className='welcome-panel'>
          <h1 className='dbrown-text'>Welcome back, User!</h1>
        </div>
        <div className='journey-container'>
          <h3 className='tab-heading dbrown-text'>Your current journeys:</h3>
            { journeyList != null
              ? journeyList.map((journey, index) => <JourneyLink journey={journey} key={index} />)
              : <p>Looks like you're not on any journeys right now.</p>
            }
        </div>
      </div>
      <div className='tab-right'>
        <div className='progress-panel content-panel'>
          <h3 className='progress-panel-header tab-heading'>Your progress in 2021</h3>
          <p>Journeys completed this year: 0</p>
          <p>Total journeys completed: 15</p>
          <p>Last journey completed:</p>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;