import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const EditDetails = (props) => {
  const { firstName, lastName, birthDate, editUser } = props;

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    mode: 'onChange'
  });
  
  const editNameBirthday = (data, e) => {
    e.preventDefault();

    // Fix error where JS causes the date to be off by one day if no time is added
    const formattedBirthDate = data.birthDate + 'T00:00:00'; 

    editUser({
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate : new Date(formattedBirthDate)
    });
  }

  // Set initial field value to props data on mount
  useEffect(() => {
    setValue('firstName', firstName);
    setValue('lastName', lastName);
    setValue('birthDate', new Date(birthDate).toISOString().substr(0, 10));
  }, []);

  return (
    <div className='card-item'>
      <form onSubmit={ handleSubmit(editNameBirthday) } >
        <div className='input-container'>
          <label htmlFor='first-name-input'>First Name</label>
          <input
            {...register('firstName', {
              required: "This is required.",
              pattern: { value: /^[a-z]+$/i, message: 'Names must consist of alphabetical letters.' } 
            })} 
            type='text' 
            id='first-name-input' 
            className='input-field'
          ></input>
          <ErrorMessage errors={errors} name="firstName">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            }
          </ErrorMessage>
        </div>
        <div className='input-container'>
          <label htmlFor='last-name-input'>Last Name</label>
          <input
            {...register('lastName', {
              required: "This is required.",
              pattern: { value: /^[a-z]+$/i, message: 'Names must consist of alphabetical letters.' }
            })} 
            type='text' 
            id='last-name-input' 
            className='input-field'
          ></input>
          <ErrorMessage errors={errors} name="lastName">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            }
          </ErrorMessage>
        </div>
        <div className='input-container'>
          <label htmlFor='birth-date-input'>Birthday</label>
          <input
            {...register('birthDate', {
              required: "This is required" })} 
            type='date' 
            id='birth-date-input' 
            className='input-field'
          ></input>
          <ErrorMessage errors={errors} name="birthDate">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            }
          </ErrorMessage>
        </div>
        <button className='button'>Save</button>
      </form>
    </div>
  );
}

export default EditDetails;