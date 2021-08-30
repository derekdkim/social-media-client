import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAuthContext } from '../../context/AuthContextProvider';
import { useStatusContext } from '../../context/StatusContextProvider';

const LoginPage = () => {
  const [JWTErrMsg, setJWTErrMsg] = useState('');
  
  const auth = useAuthContext();
  const status = useStatusContext();
  
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: 'onChange'
  });

  const attemptLogin = async (data, event) => {
    // Prevent page refresh
    event.preventDefault();

    if (isValid) {
      // Start Loading
      status.setIsLoading(true);

      axios.post('https://journey-social-media-server.herokuapp.com/users/log-in', {
          username: data.username,
          password: data.password
        })
        .then(res => {
          if (res.data.token) {
            // Save JWT to localStorage
            localStorage.setItem('token', res.data.token);
            // Save JWT to auth Context
            auth.setJWT(res.data.token);
            // Save current user UUID to auth Context -- Important for recognizing if user is a participant or author
            auth.setUUID(res.data.user.uuid);
            // [CHANGE LATER]: Placeholder indicator for being logged in
            auth.setLoggedIn(true);
          } else {
            setJWTErrMsg('Login failed. Please try again.');
            auth.setLoggedIn(false);
            status.setIsLoading(false);
          }

          // Finish Loading
          status.setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setJWTErrMsg('Login failed. Please try again.');

          // Finish Loading
          status.setIsLoading(false);
        })
    }
  }

  return (
    <div className='page-container'>
      { auth.loggedIn && <Redirect to='/' /> }
      <div className='one-tab-container content-panel form-container only-tab'>
        <form 
          className='auth-form'
          onSubmit={ handleSubmit(attemptLogin) }
          noValidate
        >
          <h1 className='tab-heading text-center'>Welcome Back</h1>

          <span className='text-input-error'>{ JWTErrMsg }</span>
          
          <div className='input-container'>
            <label htmlFor='login-username-input'>Username</label>
            <input
              {...register('username', {
                required: 'Username cannot be blank'
              })}
              type='text'
              className='text-input'
              id='login-username-input'
            ></input>
          </div>

          <div className='input-container'>
            <label htmlFor='login-password-input'>Password</label>
            <input
              {...register('password', {
                required: 'Password cannot be blank'
              })}
              type='password'
              className='text-input'
              id='login-password-input'
            ></input>
          </div>

          <div className='btn-container'>
            <button className={ isValid ? 'button' : 'button disabled-btn' }>Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;