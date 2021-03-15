import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JourneyLink from '../JourneyLink';

const MyJourneyPage = () => {

  return (
    <div class='page-container'>
      <Link to='/journeys/new'><button>Start A New Journey</button></Link>
      <div>
        <h1>My Journeys</h1>
        <div class='journey-list'>
          <JourneyLink />
        </div>
      </div>
    </div>
  );
}

export default MyJourneyPage;