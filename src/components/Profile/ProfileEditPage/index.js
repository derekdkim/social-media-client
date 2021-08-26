import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';
import ConfirmModal from '../../Modal/ConfirmModal';

const ProfileEditPage = () => {
  const [intro, setIntro] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState();
  const [birthDate, setBirthDate] = useState('1999-01-01');

  const [userInfo, setUserInfo] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [redirectToIndex, setRedirectToIndex] = useState(false);
  const [redirectToProfile, setRedirectToProfile] = useState(false);

  // Account Deletion States
  const [verificationPassword, setVerificationPassword] = useState(null);
  const [verifyMode, setVerifyMode] = useState(false);

  const auth = useAuthContext();
  const status = useStatusContext();

  // Input updaters
  const updateIntro = (event) => {
    if (event.target.value !== intro) {
      setIntro(event.target.value);
    }
  }

    const updateCurrentPassword = (event) => {
    if (event.target.value !== currentPassword) {
      setCurrentPassword(event.target.value);
    }
  }

  const updateNewPassword = (event) => {
    if (event.target.value !== newPassword) {
      setNewPassword(event.target.value);
    }
  }

  const updateFirstName = (event) => {
    if (event.target.value !== firstName) {
      setFirstName(event.target.value);
    }
  }

  const updateLastName = (event) => {
    if (event.target.value !== lastName) {
      setLastName(event.target.value);
    }
  }

  const updateBirthDate = (event) => {
    if (event.target.value !== birthDate) {
      setBirthDate(event.target.value);
    }
  }

  const updateVerificationPassword = (event) => {
    if (event.target.value !== verificationPassword) {
      setVerificationPassword(event.target.value);
    }
  }

  const openVerifyMode = () => {
    if (!verifyMode) {
      setVerifyMode(true);
    }
  }

  const editIntro = (event) => {
    event.preventDefault();

    editUser({ intro: intro });
  }

  const editNameBirthday = (event) => {
    event.preventDefault();

    // Fix error where JS causes the date to be off by one day if no time is added
    const formattedBirthDate = birthDate + 'T00:00:00'; 

    editUser({
      firstName: firstName,
      lastName: lastName,
      birthDate : new Date(formattedBirthDate)
    });
  }

  const editPassword = (event) => {
    event.preventDefault();

    editUser({
      currentPassword: currentPassword,
      newPassword: newPassword
    });
  }

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
    // Start Loading
    status.setIsLoading(true);

    axios.delete('https://journey-social-media-server.herokuapp.com/users/delete-account',
      {
        data: {
          currentPassword: verificationPassword
        },
        headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
      })
      .then(() => {
        // Clear auth
        auth.setJWT(null);
        auth.setUUID(null);
        auth.setLoggedIn(false);

        // Finish Loading
        status.setIsLoading(false);
      })
      .catch(err => {
        console.log(err);

        // Finish Loading
        status.setIsLoading(true);
      });
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

  useEffect(() => {
    // Populate input fields on mount
    if (userInfo !== null) {
      setIntro(userInfo.intro);
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);

      // Format the birthdate to be compatible with date picker
      setBirthDate(new Date(userInfo.birthDate).toISOString().substr(0, 10));
    }
  },[userInfo])

  return (
    <div>
      {/* Only render once API has loaded */
        userInfo !== null &&
        <div className='page-container profile-page one-tab-container'>
          {/* Intro Edit Tab */}
          <div className='card-item'>
            <form onSubmit={ editIntro } >
              <div className='input-container'>
                <label htmlFor='intro-input'>About Me</label>
                <TextareaAutosize onChange={ updateIntro } value={ intro } className='input-field' id='intro-input' />
              </div>
              <button className='button'>Save Intro</button>
            </form>
          </div>
          <hr></hr>
          {/* Password Edit Tab */}
          <div className='card-item'>
            <form onSubmit={ editPassword } >
              <div className='input-container'>
                <label htmlFor='current-pw-input'>Current Password</label>
                <input onChange={ updateCurrentPassword } value={ currentPassword } type='password' id='current-pw-input' className='input-field'></input>
              </div>
              <div className='input-container'>
                <label htmlFor='new-pw-input'>New Password</label>
                <input onChange={ updateNewPassword } value={ newPassword } type='password' id='new-pw-input' className='input-field'></input>
              </div>
              <button className='button'>Save Password</button>
            </form>
          </div>
          <hr></hr>
          {/* Personal Info Edit Tab */}
          <div className='card-item'>
            <form onSubmit={ editNameBirthday } >
              <div className='input-container'>
                <label htmlFor='first-name-input'>First Name</label>
                <input onChange={ updateFirstName } value={ firstName } type='text' id='first-name-input' className='input-field'></input>
              </div>
              <div className='input-container'>
                <label htmlFor='last-name-input'>Last Name</label>
                <input onChange={ updateLastName } value={ lastName } type='text' id='last-name-input' className='input-field'></input>
              </div>
              <div className='input-container'>
                <label htmlFor='birth-date-input'>Birthday</label>
                <input onChange={ updateBirthDate } value={ birthDate } type='date' id='birth-date-input' className='input-field'></input>
              </div>
              <button className='button'>Save</button>
            </form>
          </div>
          <hr></hr>
          {/* Delete Account */}
          <div className='card-item'>
            {/* Verify Password for Account Deletion*/
              verifyMode
              ? /* Expose input field for password and button to open confirm modal */
              <div>
                <div className='input-container'>
                  <label htmlFor='current-pw-input'>Please enter your password to delete your account</label>
                  <input onChange={ updateVerificationPassword } value={ verificationPassword } type='password' id='current-pw-input' className='input-field'></input>
                </div>
                <button onClick={ openDeleteConfirm } className={ verificationPassword !== null ? 'button decline-btn' : 'button decline-btn disabled-btn' }>Delete Account</button>
              </div>
              : /* 'First line defence' button to open verification mode */
              <button onClick={ openVerifyMode } className='button decline-btn'>Delete Account</button>
            }
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