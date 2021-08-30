import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import './index.css';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const JourneyCreator = () => {
  const [dueDateExists, setDueDateExists] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const auth = useAuthContext();
  const status = useStatusContext();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'all',
    defaultValues: {
      privacy: '0'
    }
  });

  const switchDueDateOption = (e) => {
    // Update privacy checked state for the Public/Private Slider Text
    e.target.checked === true ? setDueDateExists(true) : setDueDateExists(false);
  }

  const createJourney = (data, event) => {
    event.preventDefault();

    if (isValid) {
      // Start Loading
      status.setIsLoading(true);

      // Enter content except dueDate
      const formContent = {
          title: data.title,
          desc: data.desc,
          privacy: data.privacy
      };

      // Add dueDate if it was selected
      if (dueDateExists) {
        formContent.dueDate = data.dueDate;
      }

      axios.post('https://journey-social-media-server.herokuapp.com/journeys/new', {
          ...formContent
        },
        { headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
        })
        .then(res => {
          // Finish Loading
          status.setIsLoading(false);

          if (res.data.message === 'success') {
            setFormSubmitted(true);
          }
        })
        .catch(err => {
          // Finish Loading
          status.setIsLoading(false);

          console.log(err);
        })
    }
  }

  return (
    <div className='page-container'>
      { // Redirect to My Journeys page after submission
        formSubmitted && 
        <Redirect to='/my-journeys' /> 
      }
      <div className='right-btn-container-outer'>
        <Link className='right-btn-container-inner' to='/my-journeys'>
          <button className='button'>Back</button>
        </Link>
      </div>

      <div className='one-tab-container form-container content-panel'>
        <form onSubmit={ handleSubmit(createJourney) }>
          <h3 className='tab-heading text-center'>New Journey</h3>
          <div className='input-container'>
            <label htmlFor='journey-title-input'>Title</label>
            <input
              {...register('title', {
                required: 'Title cannot be blank',
                minLength: 1,
                maxLength: { value: 50, message: 'Title cannot exceed 50 characters.' }
              })} 
              id='journey-title-input' 
              className='input-field' 
              type='text' 
              placeholder="Enter Your Journey's name"
            ></input>
            <ErrorMessage errors={ errors } name="title">
              {({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={ type }>{ message }</p>
                ))
              }
            </ErrorMessage>
          </div>
          <div className='input-container'>
            <label htmlFor='journey-desc-input'>Description</label>
            <TextareaAutosize 
              {...register('desc', {
                required: 'Description cannot be blank',
                minLength: 1,
                maxLength: { value: 500, message: 'Description cannot exceed 500 characters.' }
              })} 
              id='journey-desc-input' 
              className='input-field' 
              type='text' 
              placeholder="Share what your journey is about!" 
            />
            <ErrorMessage errors={ errors } name="desc">
              {({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={ type }>{ message }</p>
                ))
              }
            </ErrorMessage>
          </div>
          <div className='input-container'>
            {/* Optional Input Field - Only required when the slider is toggled on */}
            <label htmlFor='journey-due-date-selection'>Does this journey have an end date?</label>
            <div className='switch-container'>
              <label className='switch'>
                <input onChange={ switchDueDateOption } id='journey-privacy-input' type='checkbox'></input>
                <span className='slider'></span>
              </label>
              <span className='switch-text'>{ dueDateExists ? 'Yes' : 'No' }</span>
            </div>
            { dueDateExists &&
              <div className='input-container'>
                <label htmlFor='journey-date-input'>Due Date</label>
                <input 
                  {...register('dueDate', {
                    validate: {
                      required: value => {
                        if (dueDateExists && !value) {
                          return 'You must select a valid due date if you choose to add one.';
                        }
                        return true;
                      }
                    }
                  })}
                  id='journey-date-input' 
                  className='input-field'
                  type='date'
                ></input>
              </div>
            }
          </div>
          <div className='input-container'>
            <label htmlFor='journey-privacy-input'>Choose who can see your journey</label>
            <select
              {...register('privacy', {
                pattern: {
                  value: /[0-2]{1}/,
                  message: 'Invalid privacy setting'
                }
              })}
              name='privacy' 
              id='privacy-select' 
              className='input-field'
            >
              <option value='0'>Public</option>
              <option value='1'>Friends Only</option>
              <option value='2'>Private</option>
            </select>
          </div>
          <div className='btn-container'>
            <button className={ isValid ? 'button accept-btn' : 'button disabled-btn' }>Embark on a New Journey!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JourneyCreator;