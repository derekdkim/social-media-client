import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

import { UserIcon } from '../../../images/';
import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';
import ConfirmModal from '../../Modal/ConfirmModal';

const FriendCard = (props) => {
  // Friend status - 0: Strangers, 1: pendingFriend, 2: currentFriend
  const [friendStatus, setFriendStatus] = useState(0);
  const [deleteMode, setDeleteMode] = useState(false);

  const { user } = props;
  const auth = useAuthContext();
  const status = useStatusContext();

  const openDeleteConfirm = () => {
    if (!deleteMode) {
      setDeleteMode(true);
    }
  }

  const closeDeleteConfirm = () => {
    if (deleteMode) {
      setDeleteMode(false);
    }
  }

  const sendFriendRequest = () => {
    if (friendStatus === 0) {
      // Start Loading
      status.setIsLoading(true);

      axios.post(`https://journey-social-media-server.herokuapp.com/friends/${user._id}/request`, {},
      {
        headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }  
      })
      .then(res => {
        if (res.data.message === 'success') {
          setFriendStatus(1);
        }

        // Finish Loading
        status.setIsLoading(false);
      })
      .catch(err => {
        console.log(err);

        // Finish Loading
        status.setIsLoading(false);
      });
    }
  }

  const removeFriend = () => {
    if (friendStatus === 2) {
      // Start Loading
      status.setIsLoading(true);

      axios.put(`https://journey-social-media-server.herokuapp.com/friends/${user._id}/remove`, {},
      {
        headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }  
      })
      .then(res => {
        if (res.data.message === 'success') {
          setFriendStatus(0);
        }

        // Finish Loading
        status.setIsLoading(false);
      })
      .catch(err => {
        console.log(err);

        // Finish Loading
        status.setIsLoading(false);
      });
    }
  }

  // Determine the card subject's relationship with the user
  useEffect(() => {
    if (user.currentFriends.includes(auth.id)) {
      // Friend
      setFriendStatus(2);
    } else if (user.pendingFriends.includes(auth.id)) {
      // Pending Friend
      setFriendStatus(1);
    } else {
      // Stranger
      setFriendStatus(0);
    }
  }, [user]);

  return (
    <div className='content-panel card-item friend-card-container'>
      <img src={ UserIcon } className='avatar ml-2' alt='profile-pic'/>
      <div>
        <p className='text-xl font-bold'>{ user.username }</p>
        <p className='text-base'>{ user.firstName + ' ' + user.lastName }</p>
      </div>
      <div className='flex content-center justify-center'>
        { /* Friend - Show Remove Friend Button */
          friendStatus === 2 &&
          <button onClick={ openDeleteConfirm } className='friend-btn'><i className='fas fa-user-minus'></i></button>
        }
        { /* Pending Friend - Placeholder */
          friendStatus === 1 &&
          <p>Pending Friend</p>
        }
        { /* Stranger - Show Add as Friend Buton */
          friendStatus === 0 &&
          <button onClick={ sendFriendRequest } className='friend-btn'><i className='fas fa-user-plus'></i></button>
        }
      </div>
      { /* Delete - Confirm Modal */
        deleteMode &&
        <ConfirmModal 
          cancelEvent={ closeDeleteConfirm }
          callbackEvent={ removeFriend }
          dialogText='Are you sure you want to remove this friend?'
        />
      }
    </div>
  );
}

export default FriendCard;