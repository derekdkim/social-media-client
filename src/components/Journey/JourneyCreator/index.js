import React from 'react';
import { Link } from 'react-router-dom';

const JourneyCreator = () => {
  return (
    <div class='modal-container'>
      <Link to='/'><button>Back</button></Link>
      <div class='form-container'>
        <form>
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
          <button>Embark on a New Journey!</button>
        </form>
      </div>
    </div>
  );
}

export default JourneyCreator;