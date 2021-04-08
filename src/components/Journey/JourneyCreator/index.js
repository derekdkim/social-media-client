import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const JourneyCreator = () => {
  const [publicStatus, updatePublicStatus] = useState(false);
  
  const switchPrivacy = (event) => {
    // Update privacy checked state for the Public/Private Slider Text
    event.target.checked === true ? updatePublicStatus(true) : updatePublicStatus(false);
  }

  return (
    <div className='page-container'>
      <div className='right-btn-container-outer'>
        <Link className='right-btn-container-inner' to='/my-journeys'>
          <button className='button'>Back</button>
        </Link>
      </div>

      <div className='one-tab-container form-container content-panel'>
        <form>
          <h3 className='tab-heading text-center'>New Journey</h3>
          <div className='input-container'>
            <label htmlFor='journey-title-input'>Title</label>
            <input id='journey-title-input' type='text' placeholder="Enter Your Journey's name"></input>
          </div>
          <div className='input-container'>
            <label htmlFor='journey-goal-input'>Goal</label>
            <input id='journey-goal-input' type='text' placeholder="Enter a tangible goal"></input>
          </div>
          <div className='input-container'>
            <label htmlFor='journey-date-input'>Due Date</label>
            <input id='journey-date-input' type='date'></input>
          </div>
          <div className='input-container'>
            <label htmlFor='journey-desc-input'>Due Date</label>
            <input id='journey-desc-input' type='text' placeholder="Additional notes"></input>
          </div>
          <div className='input-container'>
            <label htmlFor='journey-privacy-input'>Do you want this journey to be public?</label>
            <div className='switch-container'>
              <label className='switch'>
                <input onChange={switchPrivacy} id='journey-privacy-input' type='checkbox'></input>
                <span className='slider'></span>
              </label>
              <span className='switch-text'>{publicStatus ? 'Public' : 'Private'}</span>
            </div>
          </div>
          <div className='btn-container'>
            <button className='button create-btn'>Embark on a New Journey!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JourneyCreator;