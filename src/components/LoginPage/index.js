import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContextProvider';

const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const auth = useAuthContext();

  const updateUsername = (event) => {
    setUsername({
      value: event.target.value
    });
  }

  const updatePassword = (event) => {
    setPassword({
      value: event.target.value
    });
  }

  const handleSubmit = () => {
    if (username.value && password.value) {
      console.log('Login submitted');
      auth.setLoggedIn(true);
    }
  }

  return (
    <div className='page-container'>
      <div className='one-tab-container content-panel form-container only-tab'>
        <form 
          className='auth-form'
          onSubmit={handleSubmit}
          noValidate
        >
          <div className='input-container'>
            <label htmlFor='login-username-input'>Username</label>
            <input
              type='text'
              className='text-input'
              id='login-username-input'
              onChange={updateUsername}
              required
            ></input>
          </div>

          <div className='input-container'>
            <label htmlFor='login-password-input'>Password</label>
            <input
              type='text'
              className='text-input'
              id='login-password-input'
              onChange={updatePassword}
              required
            ></input>
          </div>
          <div className='btn-container'>
            <button className='button'>Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;