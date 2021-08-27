import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { useAuthContext } from '../../../../context/AuthContextProvider';
import { useStatusContext } from '../../../../context/StatusContextProvider';

// Form Components
import EditIntro from '../EditIntro';
import EditDetails from '../EditDetails';
import EditPassword from '../EditPassword';
import DeleteAccount from '../../Delete/DeleteAccount';

const ProfileEditPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [redirectToProfile, setRedirectToProfile] = useState(false);

  const auth = useAuthContext();
  const status = useStatusContext();

  const editUser = (input, option = 'edit') => {
    // Start Loading
    status.setIsLoading(true);
    
    // Fetch Data
    axios.put(`https://journey-social-media-server.herokuapp.com/users/${option}`, 
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
          <EditIntro editUser={ editUser } intro={ userInfo.intro } />
          <hr></hr>
          {/* Password Edit Tab */}
          <EditPassword editUser={ editUser } />
          <hr></hr>
          {/* Personal Info Edit Tab */}
          <EditDetails 
            firstName={ userInfo.firstName }
            lastName={ userInfo.lastName }
            birthDate={ userInfo.birthDate }
            editUser={ editUser }
          />
          <hr></hr>
          {/* Delete Account */}
          <DeleteAccount />
        </div>
      }
      {/* Redirect to Profile */
        redirectToProfile &&
        <Redirect to='/profile' />
      }
    </div>
  );
}

export default ProfileEditPage;