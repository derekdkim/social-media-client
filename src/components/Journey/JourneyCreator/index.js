import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import './index.css';

import { useAuthContext } from '../../../context/AuthContextProvider';

const JourneyCreator = () => {
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [dueDateExists, setDueDateExists] = useState(false);
  const [publicStatus, setPublicStatus] = useState(0);
  const [formComplete, setFormComplete] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const auth = useAuthContext();

  /* Input Value Updaters */
  const updateTitle = (e) => {
    setTitle(e.target.value);
  }

  const updateDesc = (e) => {
    setDesc(e.target.value);
  }

  const updateDueDate = (e) => {
    setDueDate(e.target.value);
  }

  const updatePrivacy = (e) => {
    // Prevent update if the value is already the same
    if (parseInt(e.target.value) !== publicStatus) {
      // Update privacy status to selected dropdown value
      setPublicStatus(parseInt(e.target.value));
    }
  }

  const switchDueDateOption = (e) => {
    // Update privacy checked state for the Public/Private Slider Text
    e.target.checked === true ? setDueDateExists(true) : setDueDateExists(false);
  }

  useEffect(() => {
    // Check for form completion
    if (![title, desc, publicStatus].includes(null)) {
      // Check if dueDate option was selected
      if (!dueDateExists) {
        setFormComplete(true);
      } else {
        // If dueDate option was selected, the user must enter a valid due date
        if (dueDate !== null) {
          setFormComplete(true);
        } else {
          setFormComplete(false);
        }
      }
    } else {
      setFormComplete(false);
    }
  }, [title, desc, dueDate, publicStatus, dueDateExists]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formComplete) {
      // Enter content except dueDate
      const formContent = {
          title: title,
          desc: desc,
          privacy: publicStatus
      };

      // Add dueDate if it was selected
      if (dueDateExists) {
        formContent.dueDate = dueDate;
      }

      axios.post('https://journey-social-media-server.herokuapp.com/journeys/new', {
          ...formContent
        },
        { headers: {
          'Authorization': `Bearer ${auth.JWT}`
        }
        })
        .then(res => {
          if (res.data.message === 'success') {
            setFormSubmitted(true);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  return (
    <div className='page-container'>
      { formSubmitted && <Redirect to='/my-journeys' /> }
      <div className='right-btn-container-outer'>
        <Link className='right-btn-container-inner' to='/my-journeys'>
          <button className='button'>Back</button>
        </Link>
      </div>

      <div className='one-tab-container form-container content-panel'>
        <form onSubmit={ handleSubmit }>
          <h3 className='tab-heading text-center'>New Journey</h3>
          <div className='input-container'>
            <label htmlFor='journey-title-input'>Title</label>
            <input id='journey-title-input' className='input-field' type='text' onChange={ updateTitle } placeholder="Enter Your Journey's name"></input>
          </div>
          <div className='input-container'>
            <label htmlFor='journey-desc-input'>Description</label>
            <TextareaAutosize id='journey-desc-input' className='input-field' type='text' onChange={ updateDesc } placeholder="Share what your journey is about!" />
          </div>
          <div className='input-container'>
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
                <input id='journey-date-input' className='input-field' onChange={ updateDueDate } value={ dueDate } type='date'></input>
              </div>
            }
          </div>
          <div className='input-container'>
            <label htmlFor='journey-privacy-input'>Choose who can see your journey</label>
            <select onChange={ updatePrivacy } name='privacy' id='privacy-select' className='input-field'>
              <option value='0' selected>Public</option>
              <option value='1'>Friends Only</option>
              <option value='2'>Private</option>
            </select>
          </div>
          <div className='btn-container'>
            <button className={ formComplete ? 'button accept-btn' : 'button disabled-btn' }>Embark on a New Journey!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JourneyCreator;