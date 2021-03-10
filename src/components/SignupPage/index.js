import React, { useState, useEffect } from 'react';

const SignupPage = () => {
  const [username, setUsername] = useState({errMsg: ''});
  const [password, setPassword] = useState({errMsg: ''});
  const [firstName, setFirstName] = useState({errMsg: ''});
  const [lastName, setLastName] = useState({errMsg: ''});
  const [birthday, setBirthday] = useState({errMsg: ''});
  const [formCompleted, setFormCompleted] = useState(false);
  
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

  const handleSubmit = () => {
    // PLACEHOLDER -- POST TO DB
    console.log('Form submitted');
    console.log(username.value, password.value, firstName.value, lastName.value, birthday.value);
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
      <div className='auth-form-container'>

        <h1>Create a New Account</h1>
        <form 
          className='auth-form'
          onSubmit={handleSubmit}
          noValidate
        >

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

          <button
            className={formCompleted ? 'signup-btn': 'signup-btn disabled-btn'}
            disabled={!formCompleted}
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
};

export default SignupPage;