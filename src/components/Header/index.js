import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import HamburgerMenu from '../Menu/HamburgerMenu';
import useDetectOutsideClick from '../util/useDetectOutsideClick';
import { LogoIcon, SearchIcon, UserIcon, HamburgerMenuIcon } from '../../images';
import SettingsMenu from '../Menu/SettingsMenu';
import { useAuthContext } from '../../context/AuthContextProvider';

const Header = () => {
  const settingsRef = useRef(null);
  const navRef = useRef(null);
  const [isSettingsActive, setIsSettingsActive] = useDetectOutsideClick(settingsRef, false);
  const [isNavActive, setIsNavActive] = useDetectOutsideClick(navRef, false);
  const authContext = useAuthContext();

  const toggleSettings = () => {
    setIsSettingsActive(!isSettingsActive);
  }

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  }

  return (
    <div className='header'>
      { isNavActive && <HamburgerMenu navRef={ navRef } toggleNav={ toggleNav } /> }
      <div className='header-left'>
        { authContext.loggedIn &&
            <div className='hamburger-menu-container'>
              <button onClick={ toggleNav } className='hamburger-btn' >
                <img className={ isNavActive ? 'menu-icon animate-hamburger' : 'menu-icon' } src={ HamburgerMenuIcon } alt='hamburger-menu' />
              </button>
            </div> 
        }
        <div className={authContext.loggedIn ? 'hidden md:flex' : 'flex'}>
          <Link className='flex justify-center content-center' to='/'>
            <div className='logo-container'>
              <img className='logo-icon' src={ LogoIcon } alt='tent-logo'/>
              <h1>Journey Together</h1>
            </div>      
          </Link>
        </div>
      </div>
      { /* Placeholder for authentication -- Currently have unstyled sign-up & log-in buttons as placeholders */
        authContext.loggedIn 
        ? 
        <div className='header-right'>
          <div className='search-bar'>
            <i className='fas fa-search search-bar-icon' alt='search-icon'/>
            <input type='text' className='search-bar-input'/>
          </div>
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