import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

import { UserIcon } from '../../../images';
import { AreTheyFriends } from '../../util/evaluator';
import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const FriendReqCard = (props) => {
  const [friendAccepted, setFriendAccepted] = useState(false);
  const [friendDeclined, setFriendDeclined] = useState(false);

  const { user } = props;

  const auth = useAuthContext();
  const status = useStatusContext();

  const acceptFriend = () => {
    let friendList = [...user.currentFriends];

    if (!AreTheyFriends(friendList, auth.UUID)) {
      // Start Loading
      status.setIsLoading(true);

      axios.put(`https://journey-social-media-server.herokuapp.com/friends/${user._id}/accept`, {}, {
          headers: {
            'Authorization': `Bearer ${auth.JWT}`
          }
        })
        .then(res => {
          if (res.data.message === 'success') {
            setFriendAccepted(true);
          }

          // Finished Loading
          status.setIsLoading(false);
        })
    }
  }

  const declineFriend = () => {
      let friendList = [...user.currentFriends];

      if (!AreTheyFriends(friendList, auth.UUID)) {
        // Start Loading
        status.setIsLoading(true);

        axios.put(`https://journey-social-media-server.herokuapp.com/friends/${user._id}/decline`, {}, {
            headers: {
              'Authorization': `Bearer ${auth.JWT}`
            }
          })
          .then(res => {
            if (res.data.message === 'success') {
              setFriendDeclined(true);
            }

            // Finished Loading
            status.setIsLoading(false);
          })
          .catch(err => {
            console.log(err);

            // Finished Loading
            status.setIsLoading(false);
          });
      }
  }

  return (
    <div className='content-panel card-item flex flex-row'>
      <div className='card-left'>
        <div className='avatar-container ml-2'>
          <img src={ UserIcon } alt='user' className='avatar' />
        </div>
        <div className='self-center'>
          <p className='card-primary-text'>{ user.username }</p>
          <p className='card-secondary-text'>{ user.firstName + ' ' + user.lastName }</p>
        </div>
      </div>
      <div className='card-right'>
        <button onClick={ acceptFriend } className='button card-btn accept-btn'>Accept</button>
        <button onClick={ declineFriend } className='button card-btn decline-btn'>Decline</button>
      </div>
    </div>
  );
}

export default FriendReqCard;