import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const ExploreJourneyCard = (props) => {
  const [dueDateExists, setDueDateExists] = useState(false);

  const { journey } = props;

  useEffect(() => {
    if (journey.dueDate) {
      setDueDateExists(true);
    }
  }, []);


  return (
    <div className='content-panel card-item explore-journey-container'>
      <Link to='/journey-details'><h4 className='tab-heading text-center'>{journey.title}</h4></Link>
      <p className='my-2'>by {journey.author.username}</p>
      <div>
        <p className='my-2'>{journey.desc}</p>
      </div>
      <div  className='mt-4 flex flex-row justify-between text-xs'>
        <div>
          <p>Goal Date</p>
          <p>{
            dueDateExists 
              ? // Use Due Date
              new Date(journey.dueDate).toDateString()
              : // No Due Date; Endless Journey
              'Endless Journey'
            }</p>
        </div>
        <Link to='/journey-details'><button className='button hidden md:block explore-journey-btn'>See details</button></Link>
        <div className='mt-auto'>
          <span>{journey.participants.length}</span>
          <span className='ml-2'>Participants</span>
        </div>
      </div>
    </div>
  );
}

export default ExploreJourneyCard;