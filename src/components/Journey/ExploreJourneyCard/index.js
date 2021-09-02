import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ExploreJourneyCard = (props) => {
  const [dueDateExists, setDueDateExists] = useState(false);

  const { journey } = props;

  useEffect(() => {
    if (journey.dueDate) {
      setDueDateExists(true);
    }
  }, []);


  return (
    <div className='content-panel m-4 p-4'>
      <Link to={ `/journey-details/${journey._id}` }><h4 className='tab-heading text-center'>{journey.title}</h4></Link>
      <p className='my-2 text-sm md:text-base'>by {journey.author.username}</p>
      <div>
        <p className='my-2 text-sm md:text-base'>{journey.desc}</p>
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
        <Link to={ `/journey-details/${journey._id}` }><button className='button hidden md:block'>See details</button></Link>
        <div className='mt-auto'>
          <span>{journey.participants.length}</span>
          <span className='ml-2'>Participants</span>
        </div>
      </div>
    </div>
  );
}

export default ExploreJourneyCard;