import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';

import JourneyLink from '../../Journey/JourneyLink';
import { UserIcon } from '../../../images';
import FriendBadge from '../../Friends/FriendBadge';
import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [journeyList, setJourneyList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  // 0 - Strangers, 1 - Pending, 2 - Friends
  const [friendCode, setFriendCode] = useState(2);

  const [isThisMe, setIsThisMe] = useState(false);
  
  const { id } = useParams();
  const auth = useAuthContext();
  const status = useStatusContext();

  // Fetch user's journeys
  const loadJourneyList = async () => {
    // Prevent pointless request if profile doesn't load to begin with
    if (userInfo !== null) {
      // Activate loading modal
      status.setIsLoading(true);
      let url = `https://journey-social-media-server.herokuapp.com/journeys/user-journeys/${id}`;

      if (isThisMe) {
        url = 'https://journey-social-media-server.herokuapp.com/journeys/private';
      }

      axios.get(url, {
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
    axios.get(`https://journey-social-media-server.herokuapp.com/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
      })
      .then(res => {
        // Determine if this is me
        if (res.data.user.uuid === auth.UUID) {
          setIsThisMe(true);
        } else {
          // This isn't me
          setIsThisMe(false);
          
          // Determine friend status
          if (res.data.user.currentFriends.some(friend => friend.uuid === auth.UUID)) {
            setFriendCode(2);
          } else {
            // If they aren't friends, are they pending friends
            if (res.data.user.pendingFriends.some(friend => friend.uuid === auth.UUID)) {
              setFriendCode(1);
            } else {
              setFriendCode(0);
            }
          }
        }

        // Set user info, which will load journeys
        // NOTE: Do not place setUserInfo above setIsThisMe validation
        setUserInfo(res.data.user);
        setFriendList(res.data.user.currentFriends);
        
        // Loading Complete
        status.setIsLoading(false);
      })
      .catch(err => {
        console.log(err);

        // Loading Complete
        status.setIsLoading(false);
      });
  }, [id]);

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
              <p className='whitespace-pre-wrap'>{userInfo.intro}</p>
            </div>
          </div>
          <div className='btn-container my-6'>
            {/* Edit Profile instead of Send Friend Req if its the user's own profile */
              isThisMe
              ? /* Own profile */
              <Link to='/profile-setting'><button className='button'>Edit Profile</button></Link>
                /* Pending Friend */
              : friendCode === 1
              ? <button className='button disabled-btn'>Pending Friends</button>
                /* Stranger */
              : friendCode === 0
              ? <button className='button'>Send Friend Request</button>
              : <div></div>
            }
          </div>
          <div>
            <h4 className='tab-heading'>{userInfo.firstName}'s Journeys <span className='text-gray-600 text-base'>{ journeyList !== null ? journeyList.length : 0 }</span></h4>
            <div>
              { journeyList.length > 0 &&
                journeyList.map((journey, index) => <JourneyLink journey={journey} key={index} />)
              }
            </div>
          </div>
          <div>
            <h3 className='tab-heading'>Friends <span className='text-gray-600 text-base'>{friendList.length}</span></h3>
            <div className='friend-grid card-item'>
              { /* Friend List*/
                friendList.length > 0 &&
                friendList.map((user, i) => <FriendBadge user={ user } key={i} />)
              }
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default ProfilePage;
