import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../../../context/AuthContextProvider';

const SettingsMenu = (props) => {
  const { settingsRef } = props;
  const auth = useAuthContext();

  const handleLogout = () => {
    auth.setJWT(null);
    auth.setUUID(null);
    auth.setLoggedIn(false);
  }

  return (
    <div ref={ settingsRef } className='settings-menu menu-panel'>
      <Link to='/profile'>
        <button className='m-2 card-item'>View Profile</button>
      </Link>
      <hr></hr>
      <button className='m-2 card-item'>Dark Mode</button>
      <hr></hr>
      <button className='m-2 card-item' onClick={ handleLogout } >Log Out</button>
    </div>
  );
}

export default SettingsMenu;