import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import axios from 'axios';

import { useAuthContext } from '../../context/AuthContextProvider';
import JourneyLink from '../Journey/JourneyLink';

const IndexPage = () => {
  const [journeyList, setJourneyList] = useState([]);

  const auth = useAuthContext();

  useEffect(() => {
    if (auth.loggedIn && auth.JWT) {
      // Fetch private journeys
      axios.get('https://journey-social-media-server.herokuapp.com/journeys/private', {
          headers: {
            'Authorization': `Bearer ${auth.JWT}`
          }
        })
        .then(res => {
          setJourneyList(res.data.journeys);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className='page-container index-page'>
      <div className='tab-left'>
        <div className='welcome-panel'>
          <h1 className='dbrown-text'>Welcome back, {auth.firstName}!</h1>
        </div>
        <div className='progress-panel'>
          <h3 className='progress-panel-header tab-heading'>Embark on a brand new journey!</h3>
          <i className='fas fa-hiking fa-8x flex justify-center'></i>
          <Link to='/explore' className='flex justify-center'>
            <button className='button my-6'>Explore challenges others are tackling</button>
          </Link>
        </div>
      </div>
      <div className='tab-right'>
        <div className='journey-container'>
          <h3 className='tab-heading dbrown-text'>Your current journeys:</h3>
          { journeyList.length > 0
            /* Limit to 5 most recent journeys -- slice() cuts to the entire length of array if it is smaller than the end argument */
            ? journeyList.slice(0, 5).map((journey, index) => <JourneyLink journey={journey} key={index} />)
            : 
            <div className='flex flex-col items-center lg:mt-40'>
              <p className='my-10 text-xl'>Looks like you're not on any journeys right now.</p>
              <Link to='/journeys/new'>
                <button className='button'>Create your first one!</button>
              </Link>
            </div>
          }
          { /* See more link*/
            journeyList.length > 5 &&
            <Link to='/my-journeys'><p>See more</p></Link>
          }
        </div>
      </div>
    </div>
  );
}

export default IndexPage;