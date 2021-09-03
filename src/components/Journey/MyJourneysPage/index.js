import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';
import JourneyLink from '../JourneyLink';

const MyJourneyPage = () => {
  const [journeyList, setJourneyList] = useState([]);
  const [partipList, setPartipList] = useState([]);

  const auth = useAuthContext();
  const status = useStatusContext();

  const getMyJourneys = async () => {
    axios.get('https://journey-social-media-server.herokuapp.com/journeys/private', {
      headers: {
        'Authorization': `Bearer ${auth.JWT}`
      }
      })
      .then(res => {
        // Set journey output to state
        setJourneyList(res.data.journeys);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const getPartipJourneys = async () => {
    axios.get('https://journey-social-media-server.herokuapp.com/journeys/participating', {
      headers: {
        'Authorization': `Bearer ${auth.JWT}`
      }
      })
      .then(res => {
        // Set journey output to state
        setPartipList(res.data.journeys);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const getAllJourneys = async () => {
    await getMyJourneys();
    await getPartipJourneys();
    // Finish Loading
    status.setIsLoading(false);
  }

  // Fetch journey data from API on initial render
  useEffect(() => {
    let isMounted = true;

    // Prevent state updates when component is unmounted
    if (isMounted) {
      // Start Loading
      status.setIsLoading(true);
      getAllJourneys();
    }

    return () => { isMounted = false };
  }, []);

  return (
    <div className='page-container'>
      <div className='right-btn-container-outer'>
        <Link className='right-btn-container-inner' to='/journeys/new'>
          <button className='button'> + Start A New Journey</button>
        </Link>
      </div>
      <div className='one-tab-container'>
        <h1 className='tab-heading dbrown-text'>My Journeys</h1>
        <div className='journey-list grid lg:grid-cols-2 my-4'>
          { journeyList.length > 0
              ? journeyList.map((journey, index) => <JourneyLink journey={journey} key={index} />)
              : <div className='m-4'>You are not currently on any journeys yet.</div>
          }
        </div>
        <h1 className='tab-heading dbrown-text'>Participating Journeys</h1>
        { /* Participating Journeys */
          partipList.length > 0
          ? partipList.map((journey, index) => <JourneyLink journey={journey} key={index} />)
          : <div className='m-4'>You are not currently participating in other users' journeys yet.</div>
        }
      </div>
    </div>
  );
}

export default MyJourneyPage;