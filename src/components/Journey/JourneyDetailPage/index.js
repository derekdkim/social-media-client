import React from 'react';
import './index.css';

import JourneyEntry from '../JourneyEntry';
import lorem from '../../../placeholders/lorem';

const JourneyDetailPage = () => {
  return (
    <div className='page-container journey-det-container'>
      <div>
        <h1 className='text-3xl text-center card-item dbrown-text'>Journey Title</h1>
      </div>
      <div className='journey-info-container'>
        <div className='content-panel card-item'>
          <ul>
            <li>Created by User</li>
            <li>Started on 04-23-2021</li>
            <li><a href=''>78</a> Participants</li>
          </ul>
        </div>
        <div className='content-panel card-item'>
          <p>{lorem}</p>
        </div>
        <div className='card-item'>
          <button className='button w-full'>Join this journey</button>
        </div>
      </div>
      <div className='card-item'>
        <JourneyEntry />
        <JourneyEntry />
        <JourneyEntry />
        <JourneyEntry />
        <JourneyEntry />
      </div>
    </div>
  );
}

export default JourneyDetailPage;