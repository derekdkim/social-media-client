import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const JourneyCreator = () => {
  return (
    <div class='page-container'>
      <div className='right-btn-container-outer'>
        <Link className='right-btn-container-inner' to='/my-journeys'>
          <button className='button'>Back</button>
        </Link>
      </div>

      <div class='form-container panel-black'>
        <form>
          <h3 className='tab-heading text-center'>New Journey</h3>
          <div class='input-container'>
            <label htmlFor='journey-title-input'>Title</label>
            <input id='journey-title-input' type='text' placeholder="Enter Your Journey's name"></input>
          </div>
          <div class='input-container'>
            <label htmlFor='journey-goal-input'>Goal</label>
            <input id='journey-goal-input' type='text' placeholder="Enter a tangible goal"></input>
          </div>
          <div class='input-container'>
            <label htmlFor='journey-date-input'>Due Date</label>
            <input id='journey-date-input' type='date'></input>
          </div>
          <div class='input-container'>
            <label htmlFor='journey-des-input'>Due Date</label>
            <input id='journey-desc-input' type='text' placeholder="Additional notes"></input>
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