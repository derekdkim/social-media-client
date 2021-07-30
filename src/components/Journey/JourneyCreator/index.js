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
  const [publicStatus, setPublicStatus] = useState(2);
  const [formComplete, setFormComplete] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const auth = useAuthContext();

  const updateTitle = (e) => {
    setTitle(e.target.value);
  }

  const updateDesc = (e) => {
    setDesc(e.target.value);
  }

  const updateDueDate = (e) => {
    setDueDate(e.target.value);
  }
  
  const switchPrivacy = (e) => {
    // Update privacy checked state for the Public/Private Slider Text
    e.target.checked === true ? setPublicStatus(0) : setPublicStatus(2);
  }

  useEffect(() => {
    // Check for form completion
    if (![title, desc, dueDate, publicStatus].includes(null)) {
      setFormComplete(true);
    }
  }, [title, desc, dueDate, publicStatus]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formComplete) {
      axios.post('https://journey-social-media-server.herokuapp.com/journeys/new', {
          title: title,
          desc: desc,
          dueDate: dueDate,
          publicStatus: publicStatus
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
            <label htmlFor='journey-date-input'>Due Date</label>
            <input id='journey-date-input' className='input-field' onChange={ updateDueDate } type='date'></input>
          </div>
          <div className='input-container'>
            <label htmlFor='journey-privacy-input'>Do you want this journey to be public?</label>
            <div className='switch-container'>
              <label className='switch'>
                <input onChange={switchPrivacy} id='journey-privacy-input' type='checkbox'></input>
                <span className='slider'></span>
              </label>
              <span className='switch-text'>{ publicStatus === 0 ? 'Public' : 'Private' }</span>
            </div>
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