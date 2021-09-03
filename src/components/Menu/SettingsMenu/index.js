import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../../../context/AuthContextProvider';

const SettingsMenu = (props) => {
  const { settingsRef, toggleSettings } = props;
  const auth = useAuthContext();

  const handleLogout = () => {
    // Close the settings menu
    toggleSettings();

    // Remove auth info
    auth.setJWT(null);
    auth.setUUID(null);
    auth.setLoggedIn(false);
    auth.setId(null);
    auth.setFirstName('');
  }

  return (
    <div ref={ settingsRef } className='settings-menu menu-panel'>
      <Link to={`/profile/${auth.id}`} onClick={ toggleSettings } >
        <button className='m-2 card-item'>View Profile</button>
      </Link>
      <hr></hr>
      <Link to='/profile-setting' onClick={ toggleSettings } >
        <button className='m-2 card-item'>Profile Settings</button>
      </Link>
      <hr></hr>
      <button className='m-2 card-item' onClick={ handleLogout } >Log Out</button>
    </div>
  );
}

export default SettingsMenu;