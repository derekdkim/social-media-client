import React, { useState } from 'react';
import axios from 'axios';

import { useAuthContext } from '../../../../context/AuthContextProvider';
import { useStatusContext } from '../../../../context/StatusContextProvider';
import ConfirmModal from '../../../Modal/ConfirmModal';

const DeleteAccount = () => {
  const [verificationPassword, setVerificationPassword] = useState('');
  const [verifyMode, setVerifyMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const auth = useAuthContext();
  const status = useStatusContext();

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

  return (
    <div>
      <div className='card-item'>
        {/* Verify Password for Account Deletion*/
          verifyMode
          ? /* Expose input field for password and button to open confirm modal */
          <div>
            <form>
              <div className='input-container'>
                <label htmlFor='current-pw-input'>Please enter your password to delete your account</label>
                <input onChange={ updateVerificationPassword } value={ verificationPassword } type='password' id='current-pw-input' className='input-field'></input>
              </div>
              <button type='button' onClick={ openDeleteConfirm } className={ verificationPassword !== null ? 'button decline-btn' : 'button decline-btn disabled-btn' }>Delete Account</button>
            </form>
          </div>
          : /* 'First line defence' button to open verification mode */
          <button onClick={ openVerifyMode } className='button decline-btn'>Delete Account</button>
        }
      </div>
      {/* Account Deletion Confirm Modal */
        deleteMode &&
        <ConfirmModal 
          cancelEvent={ closeDeleteConfirm }
          callbackEvent={ deleteAccount }
          dialogText='Are you sure you want to delete your account? This process is irreversible.'
        />
      }
    </div>
  );
}

export default DeleteAccount;