import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';

import JourneyLink from '../../Journey/JourneyLink';
import { UserIcon } from '../../../images';
import FriendBadge from '../../Friends/FriendBadge';
import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [journeyList, setJourneyList] = useState(null);

  const [isThisMe, setIsThisMe] = useState(false);
  
  const auth = useAuthContext();
  const status = useStatusContext();

  // Fetch user's journeys
  const loadJourneyList = () => {
    // Prevent pointless request if profile doesn't load to begin with
    if (userInfo !== null) {
      // Activate loading modal
      status.setIsLoading(true);

      axios.get('https://journey-social-media-server.herokuapp.com/journeys/private', {
          headers: {
            'Authorization': `Bearer ${auth.JWT}`
          }
        })
        .then(res => {
          if (res.data.journeys !== undefined) {
            setJourneyList(res.data.journeys);
            // Loading Complete
            status.setIsLoading(false);
          }
        })
        .catch(err => {
          console.log(err);

          // Loading Complete
          status.setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    // Start Loading
    status.setIsLoading(true);

    // Fetch user info
    axios.get('https://journey-social-media-server.herokuapp.com/users/get-myself', {
        headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
      })
      .then(res => {
        setUserInfo(res.data.user);

        if (res.data.user.uuid === auth.UUID) {
          setIsThisMe(true);
        }
        
        // Loading Complete
        status.setIsLoading(false);
      })
      .catch(err => {
        console.log(err);

        // Loading Complete
        status.setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadJourneyList();
  }, [userInfo])

  return (
    <div>
      { userInfo !== null &&
        <div className='page-container profile-page one-tab-container'>
          <div className='user-info-tab'>
            <div className='profile-pic-container'>
              <img className='profile-pic-main' src={UserIcon} alt='profile'></img>
            </div>
            <div className='username-container'>
              <h3 className='text-3xl'>{userInfo.username}</h3>
              <h4 className='tab-heading'>{userInfo.firstName} {userInfo.lastName}</h4>
            </div>
          </div>
          <div>
            <h3 className='tab-heading'>A bit about me</h3>
            <div className='content-panel card-item'>
              <p>{userInfo.intro}</p>
            </div>
          </div>
          <div className='btn-container my-6'>
            {/* Edit Profile instead of Send Friend Req if its the user's own profile */
              isThisMe
              ? <Link to='/profile-setting'><button className='button'>Edit Profile</button></Link>
              : <button className='button'>Send Friend Request</button>
            }
          </div>
          <div>
            <h4 className='tab-heading'>Current Journeys <span className='text-gray-600 text-base'>{ journeyList !== null ? journeyList.length : 0 }</span></h4>
            <div>
              { journeyList !== null &&
                journeyList.map((journey, index) => <JourneyLink journey={journey} key={index} />)
              }
            </div>
            <h5 className='card-item'>View past journeys</h5>
          </div>
          <div>
            <h3 className='tab-heading'>Friends <span className='text-gray-600 text-base'>524</span></h3>
            <div className='friend-grid card-item'>
              {[...Array(24)].map((e, i) => <FriendBadge key={i} />)}
            </div>
            <p className='card-item'>View all</p>
          </div>
        </div>
      }
    </div>
  );
}

export default ProfilePage;
