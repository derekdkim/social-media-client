import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import { useAuthContext } from '../../context/AuthContextProvider';
import { useDetectOutsideClick } from './useDetectOutsideClick';
import { LogoIcon, MapIcon, SearchIcon, FriendIcon, UserIcon } from '../../images';

const Header = () => {
  const menuRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(menuRef, false);
  const auth = useAuthContext();

  const handleClick = () => {
    setIsActive(!isActive);
  }

  const handleLogout = () => {
    auth.setLoggedIn(false);
  }

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
        { auth.loggedIn && <nav className='header-nav'>
          <Link className='nav-link' to='/my-journeys'>
            <img className='nav-icon' src={MapIcon} alt='my-journeys-icon'/>
            <p className='nav-link-text'>My Journeys</p>
          </Link>
          <Link className='nav-link' to='/explore'>
            <img className='nav-icon' src={SearchIcon} alt='explore-icon'/>
            <p className='nav-link-text'>Explore</p>
          </Link>
          <Link className='nav-link' to='/my-friends'>
            <img className='nav-icon' src={FriendIcon} alt='friends-icon'/>
            <p className='nav-link-text'>Friends</p>
          </Link>
        </nav> }
      </div>
      { auth.loggedIn ? <div className='header-right'>
        <div className='search-bar'>
          <img className='search-bar-icon' src={SearchIcon} alt='search-icon'/>
          <input type='text' className='search-bar-input'/>
        </div>
        <div className='profile-container'>
          <div className='avatar-container'>
            <button onClick={handleClick}>
              <img src={UserIcon} className='avatar' alt='profile-pic'/>
            </button>
          </div>
          { isActive && <div ref={menuRef} className='settings-menu content-panel'>
              <Link to='/profile'>
                <button className='m-2'>View Profile</button>
              </Link>
              <hr></hr>
              <button className='m-2'>Dark Mode</button>
              <hr></hr>
              <button className='m-2' onClick={handleLogout}>Log Out</button>
            </div> }
        </div>
      </div> 
        : <div className='header-right'>
          <Link to='/sign-up'><button className='button'>Sign Up</button></Link>
          <Link to='/log-in'><button className='button'>Log In</button></Link>
        </div> }
    </div>
  );
};

export default Header;