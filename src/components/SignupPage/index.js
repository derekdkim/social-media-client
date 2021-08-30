import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import './index.css';

import { useStatusContext } from '../../context/StatusContextProvider';

const SignupPage = () => {
  const [formAccepted, setFormAccepted] = useState(false);
  const [formErrMsg, setFormErrMsg] = useState('');

  const status = useStatusContext();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
  })

  const attemptSignup = async (data, event) => {
    //Prevent page refresh after form submit
    event.preventDefault();

    if (isValid) {
      // Start Loading
      status.setIsLoading(true);

      // Fix error where JS causes the date to be off by one day if no time is added
      const formattedBirthDate = data.birthDate + 'T00:00:00'; 

      // Post to API
      await axios.post('https://journey-social-media-server.herokuapp.com/users/sign-up', {
          username: data.username,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          birthDate: new Date(formattedBirthDate)
        })
        .then(res => {
          if (res.data.message === 'Sign-up successful') {
            // Set state for redirect following submission if sign-up was successful
            setFormAccepted(true);
          } else {
            // Add something to show error
            setFormErrMsg('Sign-up failed. Please try again.');
          }

          // Loading Complete
          status.setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setFormErrMsg('Sign-up failed. Please try again.');

          // Loading Complete
          status.setIsLoading(false);
        });
    }
  }

  return (
    <div className='page-container'>
      { /* Redirect if form was submitted successfully */ 
        formAccepted && 
        <Redirect to='/log-in'/> 
      }
      <div className='one-tab-container form-container content-panel only-tab'>
        <form 
          className='auth-form'
          onSubmit={ handleSubmit(attemptSignup) }
          noValidate
        >
          <h1 className='tab-heading text-center'>Create a New Account</h1>

          <span className='text-input-error'>{formErrMsg}</span>

          <div className='input-container'>
            <label htmlFor='signup-username-input'>Username</label>
            <input
              {...register('username', {
                required: 'Username cannot be blank',
                minLength: {
                  value: 6,
                  message: 'Username cannot be smaller than 6 characters.'
                },
                maxLength : {
                  value: 20,
                  message: 'Username cannot be larger than 20 characters.'
                },
                pattern: {
                  value: /[0-9a-z]/,
                  message: 'Username must consist of alphanumeric (A-Z and 0-9) characters.'
                }
              })}
              type='text'
              className='text-input'
              id='signup-username-input'
            ></input>
            <ErrorMessage errors={ errors } name="username">
              {({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className='text-input-error'>{message}</p>
                ))
              }
            </ErrorMessage>
          </div>

          <div className='input-container'>
            <label htmlFor='signup-password-input'>Password</label>
            <input
              {...register('password', {
                required: 'Password cannot be blank',
                minLength: {
                  value: 8,
                  message: 'Password cannot be smaller than 8 characters.'
                },
                maxLength : {
                  value: 22,
                  message: 'Password cannot be larger than 22 characters.'
                }
              })}
              type='password'
              className='text-input'
              id='signup-password-input'
            ></input>
            <ErrorMessage errors={ errors } name="password">
              {({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className='text-input-error'>{message}</p>
                ))
              }
            </ErrorMessage>
          </div>

          <div className='input-container'>
            <label htmlFor='signup-firstname-input'>First Name</label>
            <input
              {...register('firstName', {
                required: 'First name cannot be blank',
                maxLength : {
                  value: 30,
                  message: 'First name cannot be larger than 30 characters.'
                },
                pattern: {
                  value: /[0-9a-z]/,
                  message: 'First name must consist of alphanumeric (A-Z and 0-9) characters.'
                }
              })}
              type='text'
              className='text-input'
              id='signup-firstname-input'
            ></input>
            <ErrorMessage errors={ errors } name="firstName">
              {({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className='text-input-error'>{message}</p>
                ))
              }
            </ErrorMessage>
          </div>

          <div className='input-container'>
            <label htmlFor='signup-lastname-input'>Last Name</label>
            <input
              {...register('lastName', {
                required: 'Last name cannot be blank',
                maxLength : {
                  value: 30,
                  message: 'Last name cannot be larger than 30 characters.'
                },
                pattern: {
                  value: /[0-9a-z]/,
                  message: 'Last name must consist of alphanumeric (A-Z and 0-9) characters.'
                }
              })}
              type='text'
              className='text-input'
              id='signup-lastname-input'
            ></input>
            <ErrorMessage errors={ errors } name="lastName">
              {({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className='text-input-error'>{message}</p>
                ))
              }
            </ErrorMessage>
          </div>
          
          <div className='input-container'>
            <label htmlFor='signup-username-input'>Birth Date</label>
            <input
              {...register('birthDate', {
                required: 'A valid birthday must be selected',
                maxLength : {
                  value: 10,
                  message: 'Birthday format is invalid (wrong length)'
                },
                pattern: {
                  value: /[\d-]/,
                  message: 'Birthday format is invalid (wrong characters).'
                }
              })}
              type='date'
              className='date-input'
              id='signup-birthday-input'
            ></input>
            <ErrorMessage errors={ errors } name="birthDate">
              {({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className='text-input-error'>{message}</p>
                ))
              }
            </ErrorMessage>
          </div>
          <div className='btn-container'>
            <button className={ isValid ? 'button': 'button disabled-btn' }> Sign Up </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;