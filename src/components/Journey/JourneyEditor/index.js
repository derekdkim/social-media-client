import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { useAuthContext } from '../../../context/AuthContextProvider';
import { useStatusContext } from '../../../context/StatusContextProvider';

const JourneyEditor = (props) => {
  // Editor settings
  const [editMode, setEditMode] = useState(false);
  const [editDate, setEditDate] = useState(false);

  const { journey } = props;
  const auth = useAuthContext();
  const status = useStatusContext();

  const { register, setValue, handleSubmit, formState: { errors, isValid }} = useForm({
    mode: 'all'
  });

  /* Open/close Editors */
  const enableEditor = () => {
    if (!editMode) {
      setEditMode(true);
    }
  }

  const enableDateEditor = () => {
    if (!editDate) {
      setEditDate(true);
    }
  }

  const disableDateEditor = () => {
    if (editDate) {
      // Stop rendering the editor panel
      setEditDate(false);
    }
  }
  
  const submitEdit = (data, event) => {
    event.preventDefault();

    if (isValid) {
      let input = {
        title: data.title,
        desc: data.desc,
        privacy: data.privacy
      };

      // Add/update due date if the user chose to edit the date
      if (editDate) {
        input.dueDate = data.dueDate
      }

      // Start Loading
      status.setIsLoading(true);

      // Axios PUT request
      axios.put(`https://journey-social-media-server.herokuapp.com/journeys/${journey._id}`, {
          ...input
        },
        {
          headers: {
            'Authorization': `Bearer ${auth.JWT}`
          }
        })
        .then(() => {
          // Go back to View Mode
          setEditMode(false);

          // Set journey to update and re-render
          status.setUpdateJourney(true);

          // Loading Complete
          status.setIsLoading(false);    
        })
    }
  }

  // Initialize states with props journey data
  useEffect(() => {
    if (journey) {
      setValue('title', journey.title);
      setValue('desc', journey.desc);
      setValue('privacy', journey.privacy);

      // Add due date if it exists
      if (journey.dueDate) {
        setValue(new Date(journey.dueDate).toISOString().substr(0, 10));
      }
    }
  }, []);

  return (
    <div>
      {/* Conditional rendering depending on button click */}
      { editMode
          ? /* Editor */
          <div className='content-panel p-2 mb-4'>
            <form onSubmit={ handleSubmit(submitEdit) }>
              {/* Title */}
              <div className='input-container'>
                <label htmlFor='journey-title-edit'>Title</label>
                <TextareaAutosize
                  {...register('title', {
                    required: 'Title must not be blank',
                    maxLength: { value: 50, message: 'Title cannot exceed 50 characters.' }
                  })} 
                  type='text' 
                  maxLength={50} 
                  className='input-field' 
                  id='journey-title-edit'
                />
                <ErrorMessage errors={ errors } name="title">
                  {({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p key={ type }>{ message }</p>
                    ))
                  }
                </ErrorMessage>
              </div>
              {/* Description */}
              <div className='input-container'>
                <label htmlFor='journey-desc-edit'>Description</label>
                <TextareaAutosize
                  {...register('desc', {
                    required: 'Description must not be blank',
                    maxLength: {
                      value: 500,
                      message: 'Description cannot exceed 500 characters.'
                    }
                  })}
                  className='input-field' 
                  id='journey-desc-edit' 
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
              {/* Privacy */}
              <div className='input-container'>
                <label htmlFor='journey-privacy-edit'>Choose who can see your journey</label>
                <select 
                  {...register('privacy', {
                    pattern: {
                      value: /[0-2]{1}/,
                      message: 'Invalid privacy setting'
                    }
                  })}
                  name='privacy' 
                  className='input-field' 
                  id='journey-privacy-edit'
                >
                  <option value='0'>Public</option>
                  <option value='1'>Friends Only</option>
                  <option value='2'>Private</option>
                </select>
              </div>
              {/* Date Editor */}
              <div className='input-container card-item-y'>
                <p>Do you want to add/change the due date?</p>
                { editDate
                    ? /* Date Input */
                    <div className='input-container card-item-y'>
                      <label htmlFor='journey-date-edit'>New Due Date</label>
                      <input 
                        {...register('dueDate', {
                          validate: {
                            required: value => {
                              if (editDate && !value) {
                                return 'You must select a valid due date if you choose to add one.';
                              }
                              return true;
                            }
                          }
                        })}
                        type='date' 
                        className='input-field' 
                        id='journey-date-edit'
                      ></input>
                      <button type='button' onClick={ disableDateEditor } className='button w-full my-4'>I don't want to change the date</button>
                    </div>

                    : /* Button to bring up Date Editor */
                    <button type='button' onClick={ enableDateEditor } className='button w-full my-4'>Add/Change Due Date</button>
                }
              </div>
              <button type='submit' className={ isValid ? 'button w-full mb-4' : 'button w-full mb-4 disabled-btn' }>Save Journey Details</button>
            </form>
          </div>

          : /* Viewer */
          <div>
            <div className='content-panel p-2 my-4'>
              <p className='whitespace-pre-wrap'>{ journey.desc }</p>
            </div>
            <button type='button' onClick={ enableEditor } className='button w-full mb-4'>Edit Journey Details</button>
          </div>
      }
    </div>
  );
}

export default JourneyEditor;