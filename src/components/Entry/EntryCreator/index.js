import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';
import './index.css';
import axios from 'axios';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const EntryCreator = (props) => {
  const auth = useAuthContext();
  const status = useStatusContext();
  const { parent, closeEntryCreator } = props;

  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: 'onChange'
  });

  const createEntry = (data, event) => {
    event.preventDefault();
    
    if (isValid) {
      // Start Loading
      status.setIsLoading(true);

      const url = `https://journey-social-media-server.herokuapp.com/entries/${parent._id}/new`;

      // TODO: Axios request
      axios.post(url, {
          text: data.text,
        }, 
        { headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
        })
        .then(res => {
          console.log(res);

          // Close Entry Creator
          closeEntryCreator();

          // Loading Complete
          status.setIsLoading(false);

          // Re-render entries
          status.setUpdateEntries(true);
        })
        .catch(err => {
          console.log(err);

          // Loading Complete
          status.setIsLoading(false);
        });
    }
  }
  
  return (
    <div className='content-panel card-item input-container'>
      <form onSubmit={ handleSubmit(createEntry) }>
        <div className='entry-creator-container'>
          <TextareaAutosize 
            {...register('text', {
              required: 'Entry cannot be blank.',
              maxLength: {
                value: 5000,
                message: 'Entry must be within 5000 characters'
              }
            })}
            minRows={ 4 }
            maxLength={ 5000 } 
            className='input-field entry-creator-field' 
            placeholder="Share what's on your mind!"
          />
          <button className={ isValid ? 'button ml-auto mt-4' : 'button ml-auto mt-4 disabled-btn' }>Post Entry</button>
        </div>
      </form>
    </div>
  );
}

export default EntryCreator;