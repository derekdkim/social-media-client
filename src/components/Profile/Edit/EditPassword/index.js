import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const EditPassword = (props) => {
  const { editUser } = props;

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });
  
  const editPassword = (data, e) => {
    e.preventDefault();

    editUser({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    }, 'edit-pw');
  }

  return (
    <div className='card-item'>
      <form onSubmit={ handleSubmit(editPassword) } >
        <div className='input-container'>
          <label htmlFor='current-pw-input'>Current Password</label>
          <input
            {...register('currentPassword', {
              minLength: { value: 8, message: 'Passwords must be at least 8 characters.'}, 
              maxLength: { value: 22, message: 'Passwords cannot be longer than 22 characters.'}
            })}
            type='password'
            id='current-pw-input' 
            className='input-field'
          ></input>
          <ErrorMessage errors={errors} name="currentPassword">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            }
          </ErrorMessage>
        </div>
        <div className='input-container'>
          <label htmlFor='new-pw-input'>New Password</label>
          <input
            {...register('newPassword', {
              minLength: { value: 8, message: 'Passwords must be at least 8 characters.'}, 
              maxLength: { value: 22, message: 'Passwords cannot be longer than 22 characters.'}
            })}
            type='password' 
            id='new-pw-input' 
            className='input-field'
          ></input>
          <ErrorMessage errors={errors} name="newPassword">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            }
          </ErrorMessage>
        </div>
        <button className='button'>Save Password</button>
      </form>
    </div>
  );
}

export default EditPassword;