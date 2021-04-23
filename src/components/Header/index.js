import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import HamburgerMenu from '../Menu/HamburgerMenu';
import { useAuthContext } from '../../context/AuthContextProvider';
import { useDetectOutsideClick } from './useDetectOutsideClick';
import { LogoIcon, SearchIcon, UserIcon, HamburgerMenuIcon } from '../../images';

const Header = () => {
  const settingsRef = useRef(null);
  const navRef = useRef(null);
  const [isSettingsActive, setIsSettingsActive] = useDetectOutsideClick(settingsRef, false);
  const [isNavActive, setIsNavActive] = useDetectOutsideClick(navRef, false);
  const auth = useAuthContext();

  const toggleSettings = () => {
    setIsSettingsActive(!isSettingsActive);
  }

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  }

  const handleLogout = () => {
    auth.setLoggedIn(false);
  }

  return (
    <div className='header'>
      <HamburgerMenu ref={ navRef } isNavActive= { isNavActive } />
      <div className='header-left'>
        <div className='hamburger-menu-container'>
          <button onClick={ toggleNav } >
            <img className='menu-icon' src={ HamburgerMenuIcon } alt='hamburger-menu' />
          </button>
        </div>
        <div className='home-container'>
          <Link className='flex justify-center content-center' to='/'>
            <div className='logo-container'>
              <img className='logo-icon' src={ LogoIcon } alt='tent-logo'/>
              <h1>Adventure Together</h1>
            </div>      
          </Link>
        </div>
      </div>
      { auth.loggedIn ? <div className='header-right'>
        <div className='search-bar'>
          <img className='search-bar-icon' src={ SearchIcon } alt='search-icon'/>
          <input type='text' className='search-bar-input'/>
        </div>
        <div className='profile-container'>
          <div className='avatar-container'>
            <button onClick={ toggleSettings }>
              <img src={ UserIcon } className='avatar' alt='profile-pic'/>
            </button>
          </div>
          { isSettingsActive && <div ref={ settingsRef } className='settings-menu content-panel'>
              <Link to='/profile'>
                <button className='m-2 card-item'>View Profile</button>
              </Link>
              <hr></hr>
              <button className='m-2 card-item'>Dark Mode</button>
              <hr></hr>
              <button className='m-2 card-item' onClick={ handleLogout }>Log Out</button>
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