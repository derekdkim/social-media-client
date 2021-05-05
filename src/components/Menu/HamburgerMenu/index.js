import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import { MapIcon, CompassIcon, FriendIcon } from '../../../images';

const HamburgerMenu = (props) => {
  const { navRef } = props;

  return (
    <div className='left-hbmenu-tab content-panel' ref={ navRef }>
      <nav className='header-nav'>
        <Link className='nav-link card-item' to='/my-journeys'>
          <img className='nav-icon' src={ MapIcon } alt='my-journeys-icon'/>
          <p className='nav-link-text'>My Journeys</p>
        </Link>
        <hr></hr>
        <Link className='nav-link card-item' to='/explore'>
          <img className='nav-icon' src={ CompassIcon } alt='explore-icon'/>
          <p className='nav-link-text'>Explore</p>
        </Link>
        <hr></hr>
        <Link className='nav-link card-item' to='/my-friends'>
          <img className='nav-icon' src={ FriendIcon } alt='friends-icon'/>
          <p className='nav-link-text'>Friends</p>
        </Link>
      </nav>
    </div> 
  );
}

export default HamburgerMenu;