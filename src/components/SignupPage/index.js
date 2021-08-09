import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';

import { useStatusContext } from '../../context/StatusContextProvider';

const SignupPage = () => {
  const [username, setUsername] = useState({errMsg: ''});
  const [password, setPassword] = useState({errMsg: ''});
  const [firstName, setFirstName] = useState({errMsg: ''});
  const [lastName, setLastName] = useState({errMsg: ''});
  const [birthday, setBirthday] = useState({errMsg: ''});
  const [formCompleted, setFormCompleted] = useState(false);
  const [formAccepted, setFormAccepted] = useState(false);
  const [formErrMsg, setFormErrMsg] = useState('');

  const status = useStatusContext();
  
  const updateUsername = (event) => {
    // Validation check
    let currValidity = true;
    let currErrMsg = '';
    const currValue = event.target.value;

    // Length check
    if (currValue.length < 6 || currValue.length > 20) {
      currErrMsg = 'Username must be between 6 and 20 characters';
      currValidity = false;
    }

    // Alphanumeric check
    if (!(/^[0-9a-z]+$/i.test(currValue))) {
      currErrMsg = 'Username must consist of alphanumeric (A-Z and 0-9) characters.';
      currValidity = false;
    }

    setUsername({
        value: currValue,
        valid: currValidity,
        errMsg: currErrMsg
    });
  }

  const updatePassword = (event) => {
    // Validation check
    let currValidity = true;
    let currErrMsg = '';
    const currValue = event.target.value;

    // Length check
    if (currValue.length < 8 || currValue.length > 22) {
      currErrMsg = 'Password must be between 8 and 22 characters';
      currValidity = false;
    }

    setPassword({
        value: currValue,
        valid: currValidity,
        errMsg: currErrMsg
    });
  }

  const updateFirstName = (event) => {
    // Validation check
    let currValidity = true;
    let currErrMsg = '';
    const currValue = event.target.value;

    // Length check
    if (currValue.length < 1) {
      currErrMsg = 'Name must not be blank';
      currValidity = false;
    }

    // Character check
    if (!(/^[a-z]+$/i.test(currValue))) {
      currErrMsg = 'Name must consist of alphabetical letters.';
      currValidity = false;
    }

    setFirstName({
        value: currValue,
        valid: currValidity,
        errMsg: currErrMsg
    });
  }

  const updateLastName = (event) => {
    // Validation check
    let currValidity = true;
    let currErrMsg = '';
    const currValue = event.target.value;

    // Length check
    if (currValue.length < 1) {
      currErrMsg = 'Name must not be blank';
      currValidity = false;
    }

    // Character check
    if (!(/^[a-z]+$/i.test(currValue))) {
      currErrMsg = 'Name must consist of alphabetical letters.';
      currValidity = false;
    }

    setLastName({
        value: currValue,
        valid: currValidity,
        errMsg: currErrMsg
    });
  }

  const updateBirthday = (event) => {
    // Validation check
    let currValidity = true;
    let currErrMsg = '';
    const currValue = event.target.value;

    // // Length check
    // if (currValue.length < 1) {
    //   currErrMsg = 'Name must not be blank';
    //   currValidity = false;
    // }

    // // Character check
    // if (!(/^[a-z]+$/i.test(currValue))) {
    //   currErrMsg = 'Name must consist of alphabetical letters.';
    //   currValidity = false;
    // }

    setBirthday({
        value: currValue,
        valid: currValidity,
        errMsg: currErrMsg
    });
  }

  const handleSubmit = async (event) => {
    //Prevent page refresh after form submit
    event.preventDefault();

    // Start Loading
    status.setIsLoading(true);

    // Post to API
    await axios.post('https://journey-social-media-server.herokuapp.com/users/sign-up', {
        username: username.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        birthDate: birthday.value
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

        // Loading Complete
        status.setIsLoading(false);
      });
  }

  useEffect(() => {
    // Check for form validation every time it gets updated
    if (username.valid && password.valid && firstName.valid && lastName.valid && birthday.valid) {
      setFormCompleted(true);
    } else {
      setFormCompleted(false);
    }
  }, [username, password, firstName, lastName, birthday]);

  return (
    <div className='page-container'>
      { formAccepted ? <Redirect to='/log-in'/> : <div></div> }
      <div className='one-tab-container form-container content-panel only-tab'>
        <form 
          className='auth-form'
          onSubmit={handleSubmit}
          noValidate
        >
          <h1 className='tab-heading text-center'>Create a New Account</h1>

          <span className='text-input-error'>{formErrMsg}</span>

          <div className='input-container'>
            <label htmlFor='signup-username-input'>Username</label>
            <input
              type='text'
              className='text-input'
              id='signup-username-input'
              onChange={updateUsername}
              required
            ></input>
            <span className='text-input-error'>{username.errMsg}</span>
          </div>

          <div className='input-container'>
            <label htmlFor='signup-password-input'>Password</label>
            <input
              type='text'
              className='text-input'
              id='signup-password-input'
              onChange={updatePassword}
              required
            ></input>
            <span className='text-input-error'>{password.errMsg}</span>
          </div>

          <div className='input-container'>
            <label htmlFor='signup-firstname-input'>First Name</label>
            <input
              type='text'
              className='text-input'
              id='signup-firstname-input'
              onChange={updateFirstName}
              required
            ></input>
            <span className='text-input-error'>{firstName.errMsg}</span>
          </div>

          <div className='input-container'>
            <label htmlFor='signup-lastname-input'>Last Name</label>
            <input
              type='text'
              className='text-input'
              id='signup-lastname-input'
              onChange={updateLastName}
              required
            ></input>
            <span className='text-input-error'>{lastName.errMsg}</span>
          </div>
          
          <div className='input-container'>
            <label htmlFor='signup-username-input'>Birth Date</label>
            <input
              type='date'
              className='date-input'
              id='signup-birthday-input'
              onChange={updateBirthday}
              required
            ></input>
          </div>
          <div className='btn-container'>
            <button
              className={formCompleted ? 'button': 'button disabled-btn'}
              disabled={!formCompleted}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;