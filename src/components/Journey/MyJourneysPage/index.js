import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';

import { useAuthContext } from '../../../context/AuthContextProvider';
import JourneyLink from '../JourneyLink';

const MyJourneyPage = () => {
  const [journeyList, setJourneyList] = useState(null);
  const [renderJourneys, setRenderJourneys] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuthContext();

  // Fetch journey data from API on initial render
  useEffect(() => {
    let isMounted = true;

    // Prevent state updates when component is unmounted
    if (isMounted) {
      setIsLoading(true);
      axios.get('https://journey-social-media-server.herokuapp.com/journeys/private', {
          headers: {
            'Authorization': `Bearer ${auth.JWT}`
          }
        })
        .then(res => {
          if (res.data.journeys) {
            // Set imported journeys list to state
            setJourneyList(res.data.journeys);
            setIsLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }

    return () => { isMounted = false };
  }, []);

  useEffect(() => {
    if (journeyList != null && journeyList.length > 0) {
      // Prevent redundant state changes
      if (!renderJourneys) {
        setRenderJourneys(true);
      }
    } else {
      // Prevent redundant state changes
      if (renderJourneys) {
        setRenderJourneys(false);
      }
    }
  }, [journeyList]);

  return (
    <div className='page-container'>
      <div className='right-btn-container-outer'>
        { isLoading && <div className='loading-msg-container'>Loading your journeys...</div> }
        <Link className='right-btn-container-inner' to='/journeys/new'>
          <button className='button'> + Start A New Journey</button>
        </Link>
      </div>
      <div className='one-tab-container'>
        <h1 className='tab-heading dbrown-text'>My Journeys</h1>
        <div className='journey-list grid lg:grid-cols-2'>
          { renderJourneys 
              ? journeyList.map((journey, index) => <JourneyLink journey={journey} key={index} />)
              : <div>You are not currently on any journeys yet. My JWT is {auth.JWT}</div>
          }
        </div>
      </div>
    </div>
  );
}

export default MyJourneyPage;