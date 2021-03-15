import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header-container'>
      <div className='logo-container'>
        <p>Logo</p>
      </div>
      <div className='search-bar'></div>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/login'>Log In</Link>
        <Link to='/my-journeys'>My Journeys</Link>
      </div>

    </div>
  );
};

export default Header;