import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

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
    }
  }

  return (
    <div className='page-container'>
      <div className='auth-form-container'>
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

          <button className='login-btn'>Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;