import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { LogoIcon, MapIcon, SearchIcon, FriendIcon } from '../../images';
import './index.css';

const Header = () => {

  console.log(LogoIcon, MapIcon);
  return (
    <div className='header'>
      <div className='header-left'>
        <div className='home-container'>
          <Link to='/'>
            <div className='logo-container'>
              <img className='logo-icon' src={LogoIcon} alt='tent-logo'/>
              <h1>Adventure Together</h1>
            </div>      
          </Link>
        </div>
        <nav className='header-nav'>
          <Link className='nav-link' to='/my-journeys'>
            <img className='nav-icon' src={MapIcon} alt='my-journeys-icon'/>
            <p>My Journeys</p>
          </Link>
          <Link className='nav-link' to='/explore'>
            <img className='nav-icon' src={SearchIcon} alt='explore-icon'/>
            <p>Explore</p>
          </Link>
          <Link className='nav-link' to='/my-friends'>
            <img className='nav-icon' src={FriendIcon} alt='friends-icon'/>
            <p>Friends</p>
          </Link>
        </nav>
      </div>
      <div className='header-right'>
        <div className='search-bar'></div>
        <div className='profile-container'>
          <div className='avatar-container'></div>
        </div>
      </div>
    </div>
  );
};

export default Header;