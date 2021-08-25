import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';
import ConfirmModal from '../../Modal/ConfirmModal';
import { set } from 'date-fns';

const ProfileEditPage = () => {
  const [intro, setIntro] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());

  const [userInfo, setUserInfo] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [redirectToIndex, setRedirectToIndex] = useState(false);
  const [redirectToProfile, setRedirectToProfile] = useState(false);

  const auth = useAuthContext();
  const status = useStatusContext();

  const editUser = (input) => {
    // Start Loading
    status.setIsLoading(true);
    
    // Fetch Data
    axios.put('https://journey-social-media-server.herokuapp.com/users/edit', 
      input,
      {
        headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
      })
      .then(() => {
        // Finish Loading
        status.setIsLoading(false);

        // Redirect to Updated Profile
        setRedirectToProfile(true);
      })
      .catch(err => {
        // Finish Loading
        status.setIsLoading(false);

        console.log(err);
      })
  }

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

  const deleteAccount = () => {
    // TODO: CREATE DELETEUSER ENDPOINT IN API
    // Clear auth
    auth.setJWT(null);
    auth.setUUID(null);
    auth.setLoggedIn(false);

    // Redirect to index
    setRedirectToIndex(true);
  }

  // Load User Info from API
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
        
        // Loading Complete
        status.setIsLoading(false);
      })
      .catch(err => {
        console.log(err);

        // Loading Complete
        status.setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Only render once API has loaded */
        userInfo !== null &&
        <div className='page-container profile-page one-tab-container'>
          {/* Intro Edit Tab */}
          <div className='card-item'>
            <form>
              <div className='input-container'>
                <label htmlFor='intro-input'>About Me</label>
                <TextareaAutosize className='input-field' id='intro-input' />
              </div>
              <button className='button'>Save Intro</button>
            </form>
          </div>
          <hr></hr>
          {/* Password Edit Tab */}
          <div className='card-item'>
            <form>
              <div className='input-container'>
                <label htmlFor='current-pw-input'>Current Password</label>
                <input type='password' id='current-pw-input' className='input-field'></input>
              </div>
              <div className='input-container'>
                <label htmlFor='new-pw-input'>New Password</label>
                <input type='password' id='new-pw-input' className='input-field'></input>
              </div>
              <button className='button'>Save Password</button>
            </form>
          </div>
          <hr></hr>
          {/* Personal Info Edit Tab */}
          <div className='card-item'>
            <form>
              <div className='input-container'>
                <label htmlFor='first-name-input'>First Name</label>
                <input type='text' id='first-name-input' className='input-field'></input>
              </div>
              <div className='input-container'>
                <label htmlFor='last-name-input'>Last Name</label>
                <input type='text' id='last-name-input' className='input-field'></input>
              </div>
              <div className='input-container'>
                <label htmlFor='birth-date-input'>Birthday</label>
                <input type='date' id='birth-date-input' className='input-field'></input>
              </div>
              <button className='button'>Save</button>
            </form>
          </div>
          <hr></hr>
          {/* Delete Account */}
          <div className='card-item'>
            <button onClick={ openDeleteConfirm } className='button decline-btn'>Delete Account</button>
          </div>
        </div>
      }
      {/* Account Deletion Confirm Modal */
        deleteMode &&
        <ConfirmModal 
          cancelEvent={ closeDeleteConfirm }
          callbackEvent={ deleteAccount }
          dialogText='Are you sure you want to delete your account? This process is irreversible.'
        />
      }
      {/* Redirect to Index */
        redirectToIndex &&
        <Redirect to='/' />
      }
      {/* Redirect to Profile */
        redirectToProfile &&
        <Redirect to='/profile' />
      }
    </div>
  );
}

export default ProfileEditPage;