import React, { useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './index.css';

import HamburgerMenu from '../Menu/HamburgerMenu';
import useDetectOutsideClick from '../util/useDetectOutsideClick';
import { LogoIcon, UserIcon, HamburgerMenuIcon } from '../../images';
import SettingsMenu from '../Menu/SettingsMenu';
import { useAuthContext } from '../../context/AuthContextProvider';
import { useStatusContext } from '../../context/StatusContextProvider';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const settingsRef = useRef(null);
  const navRef = useRef(null);
  const [isSettingsActive, setIsSettingsActive] = useDetectOutsideClick(settingsRef, false);
  const [isNavActive, setIsNavActive] = useDetectOutsideClick(navRef, false);
  const auth = useAuthContext();
  const status = useStatusContext();

  // Search Bar
  const updateSearchQuery = (event) => {
    if (event.target.value !== searchQuery) {
      setSearchQuery(event.target.value);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      enterSearch();
    }
  }

  const enterSearch = () => {
    // Save query to context
    status.setSearchQuery(searchQuery);

    // Trigger flag to Redirect
    status.setRedirectToSearch(true);
  }

  // Settings Menu (Right-hand corner)
  const toggleSettings = () => {
    setIsSettingsActive(!isSettingsActive);
  }

  // Hamburger Menu (Left-hand corner)
  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  }

  return (
    <div className='header'>
      { isNavActive && <HamburgerMenu navRef={ navRef } toggleNav={ toggleNav } /> }
      <div className='header-left'>
        { auth.loggedIn &&
            <div className='hamburger-menu-container'>
              <button onClick={ toggleNav } className='hamburger-btn' >
                <img className={ isNavActive ? 'menu-icon animate-hamburger' : 'menu-icon' } src={ HamburgerMenuIcon } alt='hamburger-menu' />
              </button>
            </div> 
        }
        <div className={auth.loggedIn ? 'hidden md:flex' : 'flex'}>
          <Link className='flex justify-center content-center' to='/'>
            <div className='logo-container'>
              <img className='logo-icon' src={ LogoIcon } alt='tent-logo'/>
              <h1>Journey Together</h1>
            </div>      
          </Link>
        </div>
      </div>
      { /* Placeholder for authentication -- Currently have unstyled sign-up & log-in buttons as placeholders */
        auth.loggedIn 
        ? 
        <div className='header-right'>
          <div className='search-bar'>
            {/* Click to Search */}
            <button onChange={ enterSearch } className='flex items-center'>
              <i className='fas fa-search search-bar-icon' alt='search-icon'/>
            </button>
            {/* Press Enter to Search */}
            <input
              onChange= { updateSearchQuery }
              value={ searchQuery }
              onKeyUp={ handleKeyPress }
              type='text' 
              className='search-bar-input' 
              placeholder='Look for friends here'
            />
          </div>
          {/* Redirect to Search Results on Enter */
            status.redirectToSearch &&
            <Redirect to='/friend-search'/>
          }
          <div className='profile-container'>
            <div className='avatar-container'>
              <button onClick={ toggleSettings }>
                <img src={ UserIcon } className='avatar' alt='profile-pic'/>
              </button>
            </div>
            { isSettingsActive && <SettingsMenu settingsRef={ settingsRef } toggleSettings={ toggleSettings } /> }
          </div>
        </div> 
        : 
        <div className='header-right card-item'>
          <Link to='/sign-up'><button type='button' className='button mx-4'>Sign Up</button></Link>
          <Link to='/log-in'><button type='button' className='button'>Log In</button></Link>
        </div> 
      }
    </div>
  );
};

export default Header;