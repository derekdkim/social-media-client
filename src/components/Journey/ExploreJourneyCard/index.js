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
    <div className='flex flex-col justify-between content-panel m-4 p-4'>
      <Link to={ `/journey-details/${journey._id}` }><h4 className='tab-heading text-center'>{journey.title}</h4></Link>
      <Link to={ `/profile/${journey.author._id}` }>
        <p className='my-2 text-sm md:text-base'>by {journey.author.username}</p>
      </Link>
      <div>
        <p className='my-2 text-sm md:text-base whitespace-pre-wrap'>{journey.desc}</p>
      </div>
      <div  className='mt-2 flex flex-row justify-between text-xs'>
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