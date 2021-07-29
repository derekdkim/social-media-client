import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContextProvider';

const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [JWTErrMsg, setJWTErrMsg] = useState('');
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

  const handleSubmit = async (event) => {
    // Prevent page refresh
    event.preventDefault();

    axios.post('https://journey-social-media-server.herokuapp.com/users/log-in', {
        username: username.value,
        password: password.value
      })
      .then(res => {
        if (res.data.token) {
          // Save JWT to localStorage
          localStorage.setItem('token', res.data.token);
          // Save JWT to auth Context
          auth.setJWT(res.data.token);
          // [CHANGE LATER]: Placeholder indicator for being logged in
          auth.setLoggedIn(true);
        } else {
          setJWTErrMsg('Web Token not found.');
          auth.setLoggedIn(false);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className='page-container'>
      { auth.loggedIn ? <Redirect to='/' /> : <div></div> }
      <div className='one-tab-container content-panel form-container only-tab'>
        <form 
          className='auth-form'
          onSubmit={handleSubmit}
          noValidate
        >
          <h1 className='tab-heading text-center'>Welcome Back</h1>

          <span className='text-input-error'>{JWTErrMsg}</span>
          
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